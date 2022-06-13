import * as React from 'react';
import { Query, Mutation, MutationResult, compose } from 'react-apollo';

import ListingForm from 'containers/listings/_CreateListingForm';
import withFlashMessage from 'components/flash/withFlashMessage';

import LISTING_WITH_DEFAULT_VALUE from 'graphql/listings/listingWithDefaultValueQuery.graphql';
import CREATE_LISTING from 'graphql/listings/createListingMutation.graphql';
import LISTINGS from 'graphql/listings/listingsQuery.graphql';

// typings
import { DataProxy } from 'apollo-cache';
import {
  FlashMessageVariables,
  CreateListingData,
  CreateListingVariables,
  ListingsData,
  ListingWithDefaultValueData
} from 'types';
import { CircularProgress } from '@mui/material';
class ListingWithDefaultValueQuery extends Query<ListingWithDefaultValueData> { }
class CreateListingMutation extends Mutation<CreateListingData, CreateListingVariables> { }

interface IProps {
  keywords: string;
  redirect: (path: string, message?: FlashMessageVariables) => void;
}

class NewListing extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.action = this.action.bind(this);
    this.updateCache = this.updateCache.bind(this);
  }

  private action(createListing: Function): (values: any) => Promise<any> {
    return async (values: CreateListingVariables) => {
      return new Promise(async (_, reject) => {
        const response: MutationResult<CreateListingData> = await createListing({ variables: values });
        const {
          createListing: { errors }
        } = response.data!;
        if (!errors) {
          this.props.redirect('/', { notice: 'Your listing has been created.' });
        } else {
          reject(errors);
        }
      });
    };
  }

  private updateCache(cache: DataProxy, { data: { createListing } }: any) {
    const newListing = createListing.newListing;
    if (!newListing) return;
    const data = cache.readQuery({ query: LISTINGS, variables: { limit: 24, offset: 0, keywords: this.props.keywords } }) as ListingsData;
    if (!data.listings) return;
    data.listings.unshift(newListing);
    cache.writeQuery({ query: LISTINGS, variables: { limit: 24, offset: 0, keywords: this.props.keywords }, data });
  }

  public render() {
    return (
      <ListingWithDefaultValueQuery query={LISTING_WITH_DEFAULT_VALUE}>
        {({ data, loading }) => {
          if (!data || !data.listingWithDefaultValue) return null;
          if (loading) return <div className="uk-flex uk-flex-center">
            <CircularProgress color="error" />
          </div>;
          const listingWithDefaultValue = data.listingWithDefaultValue;
          return (
            <CreateListingMutation mutation={CREATE_LISTING} update={this.updateCache}>
              {(createListing, { loading }) => (
                <div className="uk-container uk-container-xsmall uk-grid-top-large">
                  <div className="uk-text-center">
                    <div className="uk-text-lead">Create a new listing</div>
                    <div className="uk-text-meta">Enter as much information as possible to get many buyers</div>
                  </div>

                  <ListingForm
                    action={this.action(createListing)}
                    initialValues={listingWithDefaultValue}
                    loading={loading}
                  />
                </div>
              )}
            </CreateListingMutation>
          );
        }}
      </ListingWithDefaultValueQuery>
    );
  }
}

export default compose(withFlashMessage)(NewListing);
