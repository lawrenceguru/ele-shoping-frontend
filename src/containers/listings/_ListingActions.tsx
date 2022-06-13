import * as React from 'react';
import { Mutation, MutationResult, compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import withFlashMessage from 'components/flash/withFlashMessage';

// graphql queries
import DELETE_LISTING from 'graphql/listings/deleteListingMutation.graphql';
import USER_LISTING from 'graphql/listings/userListingsQuery.graphql';

// typings
import { DataProxy } from 'apollo-cache';
import { ListingPreviewFragment, UserListingsData, DeleteListingData, DeleteListingVariables } from 'types';
class DeleteListingMutation extends Mutation<DeleteListingData, DeleteListingVariables> {}

interface IProps {
  match: any;
  listing: ListingPreviewFragment;
  notice: (text: string) => void;
}

class ListingActions extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.onDestroy = this.onDestroy.bind(this);
    this.updateCache = this.updateCache.bind(this);
  }

  private onDestroy(deleteListing: Function) {
    return async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (window.confirm('Are you sure to delete?. You can edit and make changes to sell?')) {
        const listingID: string = this.props.listing.id;
        const response: MutationResult<DeleteListingData> = await deleteListing({ variables: { id: listingID } });
        if (!response.data!.deleteListing.errors) {
          this.props.notice('The listing has been deleted .');
        }
      }
      return false;
    };
  }

  private updateCache(cache: DataProxy, { data: { deleteListing } }: any) {
    const listingDeleted = deleteListing.listing;
    if (!listingDeleted) return;
    const data = cache.readQuery({ query: USER_LISTING,  variables: { limit: 5, offset: 0, userId: this.props.match.params.id }  }) as UserListingsData;
    
    console.log(data)
 
    if (!data.userListings) return;
    data.userListings = data.userListings.filter(listing => listing.id !== listingDeleted.id);
    cache.writeQuery({ query: USER_LISTING,  variables: { limit: 5, offset: 0, userId: this.props.match.params.id } , data });
  }

  public render() {
    const { listing } = this.props;

    return (
      <div className="listing-actions uk-align-right">        
        <Link to={`/listings/${listing.id}/edit`} className="sc-button sc-button-small sc-button-primary uk-margin-small-right" data-uk-tooltip="Edit Listing">
          <span data-uk-icon="icon: file-edit; ratio: 1;"> </span>
        </Link>
        <DeleteListingMutation mutation={DELETE_LISTING} update={this.updateCache}>
          {deleteListing => (
            <a onClick={this.onDestroy(deleteListing)} className="sc-button sc-button-small sc-button-primary" data-uk-tooltip="Delete Listing">
              <span data-uk-icon="icon: trash; ratio: 1;"> </span>
            </a>
          )}
        </DeleteListingMutation>
      </div>
    );
  }
}

export default compose(withFlashMessage)(ListingActions);
