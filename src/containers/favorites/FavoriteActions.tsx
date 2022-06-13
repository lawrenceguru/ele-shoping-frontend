import * as React from 'react';
import { Query, Mutation, MutationResult, compose } from 'react-apollo';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import withFlashMessage from 'components/flash/withFlashMessage';

// graphql queries
import CREATE_FAVORITE from 'graphql/favorites/createFavoriteMutation.graphql';
import REMOVE_FAVORITE from 'graphql/favorites/removeFavoriteMutation.graphql';
import IS_FAVORITE from 'graphql/favorites/isFavoriteQuery.graphql';


// typings
import { DataProxy } from 'apollo-cache';
import {
  ListingPreviewFragment,
  CreateFavoriteData, CreateFavoriteVariables,
  RemoveFavoriteData, RemoveFavoriteVariables,
  IsFavoriteData, IsFavoriteVariables
} from 'types';

class CreateFavoriteMutation extends Mutation<CreateFavoriteData, CreateFavoriteVariables> { }
class RemoveFavoriteMutation extends Mutation<RemoveFavoriteData, RemoveFavoriteVariables> { }
class IsFavoriteQuery extends Query<IsFavoriteData, IsFavoriteVariables> { }

interface IProps {
  userId: string;
  listing: ListingPreviewFragment;
  notice: (text: string) => void;
}

class FavoriteActions extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
    this.updateCreationCache = this.updateCreationCache.bind(this);
    this.updateRemoveCache = this.updateRemoveCache.bind(this);
  }

  private onDestroy(removeFavorite: Function) {
    return async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      const favoriteID: string = this.props.listing.id;
      const response: MutationResult<RemoveFavoriteData> = await removeFavorite({ variables: { favoriteId: favoriteID } });
      if (!response.data!.removeFavorite.errors) {
        this.props.notice('The Listings has been removed from your favorites .');
      }
    };
  }

  private onCreate(createFavorite: Function) {
    return async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      const listingID: string = this.props.listing.id;
      const response: MutationResult<CreateFavoriteData> = await createFavorite({ variables: { listingId: listingID } });
      if (!response.data!.createFavorite.errors) {
        this.props.notice('The Listing has been added to your favorites.');
      }
    };
  }

  private updateCreationCache(cache: DataProxy, { data: { createFavorite } }: any) {
    const favoriteCreated = createFavorite.newFavorite;
    if (!favoriteCreated) return;
    const data = { isFavorite: favoriteCreated };
    cache.writeQuery({ query: IS_FAVORITE, variables: { userId: this.props.userId, listingId: this.props.listing.id }, data });
  }

  private updateRemoveCache(cache: DataProxy, { data: { removeFavorite } }: any) {
    const favoriteRemoved = removeFavorite.favorite;
    if (!favoriteRemoved) return;
    const data = cache.readQuery({ query: IS_FAVORITE, variables: { userId: this.props.userId, listingId: this.props.listing.id } }) as IsFavoriteData;
    data.isFavorite = null;
    cache.writeQuery({ query: IS_FAVORITE, variables: { userId: this.props.userId, listingId: this.props.listing.id }, data });
  }

  public render() {

    return (
      <>
        <div>
          <IsFavoriteQuery query={IS_FAVORITE} variables={{ userId: this.props.userId, listingId: this.props.listing.id }}>
            {({ data, loading }) => {

              if (loading) return <div data-uk-spinner />;

              if (!data && data.isFavorite === null) return (
                <CreateFavoriteMutation mutation={CREATE_FAVORITE} update={this.updateCreationCache}>
                  {createFavorite => (
                    <button onClick={this.onCreate(createFavorite)}>
                      <FavoriteBorderIcon />
                    </button>
                  )}
                </CreateFavoriteMutation>
              );

              if (data.isFavorite !== null) return (
                <RemoveFavoriteMutation mutation={REMOVE_FAVORITE} update={this.updateRemoveCache} >
                  {removeFavorite => (
                    <button onClick={this.onDestroy(removeFavorite)} className="sc-button sc-button-small sc-button-primary">
                      <FavoriteIcon />
                    </button>
                  )}
                </RemoveFavoriteMutation>
              )

              return (
                <CreateFavoriteMutation mutation={CREATE_FAVORITE} update={this.updateCreationCache}>
                  {createFavorite => (
                    <button onClick={this.onCreate(createFavorite)}>
                      <FavoriteBorderIcon />
                    </button>
                  )}
                </CreateFavoriteMutation>
              )

            }}




          </IsFavoriteQuery>



        </div>
      </>
    );
  }
}

export default compose(withFlashMessage)(FavoriteActions);