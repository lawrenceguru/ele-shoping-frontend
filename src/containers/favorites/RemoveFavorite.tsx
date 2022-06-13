import * as React from 'react';
import { Mutation, MutationResult, compose } from 'react-apollo';

import withFlashMessage from 'components/flash/withFlashMessage';
import FavoriteIcon from '@mui/icons-material/Favorite';

// graphql queries
import REMOVE_FAVORITE from 'graphql/favorites/removeFavoriteMutation.graphql';
import FAVORITES from 'graphql/favorites/favoritesQuery.graphql';

// typings
import { DataProxy } from 'apollo-cache';
import { ListingPreviewFragment, FavoritesData, RemoveFavoriteData, RemoveFavoriteVariables } from 'types';
class RemoveFavoriteMutation extends Mutation<RemoveFavoriteData, RemoveFavoriteVariables> { }

interface IProps {
  match: any;
  listing: ListingPreviewFragment;
  notice: (text: string) => void;
}

class RemoveFavorite extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.onDestroy = this.onDestroy.bind(this);
    this.updateCache = this.updateCache.bind(this);
  }


  private onDestroy(removeFavorite: Function) {
    return async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
        const favoriteID: string = this.props.listing.id;
        const response: MutationResult<RemoveFavoriteData> = await removeFavorite({ variables: { favoriteId: favoriteID } });
        if (!response.data!.removeFavorite.errors) {
          this.props.notice('The favorite has been removed .');
        }
    };
  }

  private updateCache(cache: DataProxy, { data: { removeFavorite } }: any) {
    const favoriteRemoved = removeFavorite.favorite;
    if (!favoriteRemoved) return;
      const data = cache.readQuery({ query: FAVORITES, variables: { limit: 6, offset: 0, userId: this.props.match.params.id  }   }) as FavoritesData;
      if (!data.userFavorites) return;
      data.userFavorites = data.userFavorites.filter(favorite => favorite.id !== favoriteRemoved.id);      
      cache.writeQuery({ query: FAVORITES, variables: { limit: 6, offset: 0, userId: this.props.match.params.id  } , data });
  }

  public render() {

    return (
      <div>
        <RemoveFavoriteMutation mutation={REMOVE_FAVORITE} update={this.updateCache}>
          {removeFavorite => (
            <button onClick={this.onDestroy(removeFavorite)} className="sc-button sc-button-small sc-button-primary">
              <FavoriteIcon />
            </button>
          )}
        </RemoveFavoriteMutation>
      </div>
    );
  }
}

export default compose(withFlashMessage)(RemoveFavorite);