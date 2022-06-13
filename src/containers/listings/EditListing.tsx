import * as React from 'react';
import { Query, Mutation, MutationResult, compose } from 'react-apollo';

import ListingForm from 'containers/listings/_CreateListingForm';
import withFlashMessage from 'components/flash/withFlashMessage';

import RECIPE_FOR_EDITING from 'graphql/listings/listingForEditingQuery.graphql';
import UPDATE_RECIPE from 'graphql/listings/updateListingMutation.graphql';

// typings
import {
  FlashMessageVariables,
  UpdateListingData,
  UpdateListingVariables,
  ListingForEditingVariables,
  ListingForEditingData
} from 'types';
import { CircularProgress } from '@mui/material';
class ListingForEditingQuery extends Query<ListingForEditingData, ListingForEditingVariables> {}
class UpdateListingMutation extends Mutation<UpdateListingData, UpdateListingVariables> {}

interface IProps {
  redirect: (path: string, message?: FlashMessageVariables) => void;
  match: any;
}

class EditListing extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.action = this.action.bind(this);
  }

  private action(updateListing: Function): (values: any) => Promise<any> {
    return async (values: UpdateListingVariables) => {
      return new Promise(async (_, reject) => {
        const response: MutationResult<UpdateListingData> = await updateListing({ variables: values });
        const {
          updateListing: { errors }
        } = response.data!;
        if (!errors) {
          this.props.redirect('/', { notice: 'La recette a bien été éditée.' });
        } else {
          reject(errors);
        }
      });
    };
  }

  public render() {
    return (

      <>
      <ListingForEditingQuery
        query={RECIPE_FOR_EDITING}
        variables={{ id: this.props.match.params.id }}
        fetchPolicy="network-only"
      >
        {({ data, loading }) => {
          if (!data || !data.listing) return null;
          if (loading) return <div className="uk-flex uk-flex-center">
            <CircularProgress color="error" />
          </div>;
          const listing = data.listing;
          return (
            <UpdateListingMutation mutation={UPDATE_RECIPE}>
              {(updateListing, { loading }) => (
                <div className="uk-container uk-container-small uk-grid-top-large">
                  <div className="uk-text-center">
                    <div className="uk-text-lead">Edit your listing</div>
                  </div>
                  <ListingForm action={this.action(updateListing)} initialValues={listing} loading={loading} />
                </div>
              )}
            </UpdateListingMutation>
          );
        }}
      </ListingForEditingQuery>
      </>
    );
  }
}

export default compose(withFlashMessage)(EditListing);
