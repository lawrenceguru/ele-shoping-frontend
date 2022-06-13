import * as React from 'react';
import { Mutation, MutationResult, compose } from 'react-apollo';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import withFlashMessage from 'components/flash/withFlashMessage';

// graphql queries
import CREATE_FAVORITE from 'graphql/favorites/createFavoriteMutation.graphql';
import LISTING from 'graphql/listings/listingQuery.graphql';

// typings
import { DataProxy } from 'apollo-cache';
import { ListingData, CreateFavoriteData, CreateFavoriteVariables, ListingPreviewFragment } from 'types';
class CreateFavoriteMutation extends Mutation<CreateFavoriteData, CreateFavoriteVariables> { }

interface IProps {
  match: any;
  listing: ListingPreviewFragment;
  notice: (text: string) => void;
}

class CreateFavorite extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
    this.updateCache = this.updateCache.bind(this);
  }


  private onCreate(createFavorite: Function) {
    return async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
        const listingID: string = this.props.listing.id;
        const response: MutationResult<CreateFavoriteData> = await createFavorite({ variables: { listingId: listingID } });
        if (!response.data!.createFavorite.errors) {
          this.props.notice('The favorite has been added .');
        }
    };
  }

  private updateCache(cache: DataProxy, { data: { createFavorite } }: any) {
    const favoriteCreated = createFavorite.newFavorite;
    
    if (!favoriteCreated) return;
    const data = cache.readQuery({ query: LISTING, variables: { id: this.props.listing.id  }   }) as ListingData;
    if (!data.listing) return;
      // data.listing.owner.favorites.unshift(favoriteCreated);
    // data.userFavorites.length -= 1;
    cache.writeQuery({ query: LISTING, variables: { id: this.props.listing.id  } , data });
  }

  public render() {

    return (
      <>
      <div>
        <CreateFavoriteMutation mutation={CREATE_FAVORITE} update={this.updateCache}>
          {createFavorite => (
            <button onClick={this.onCreate(createFavorite)}>
              <FavoriteBorderIcon />
            </button>
          )}
        </CreateFavoriteMutation>
      </div>
      </>
    );
  }
}

export default compose(withFlashMessage)(CreateFavorite);