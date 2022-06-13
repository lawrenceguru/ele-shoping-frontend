import * as React from 'react';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import withCurrentUser from 'queries/currentUserQuery';

// typings
import { FavoritePreviewFragment, User } from 'types';
import RemoveFavorite from './RemoveFavorite';

interface IProps {
  favorite: FavoritePreviewFragment;
  currentUser: User;
}

class FavoritePreview extends React.Component<IProps, {}> {
  public render() {
    const { favorite, currentUser } = this.props;
    return (
      <>
        <article className="tm-product-card">
          <div className="tm-product-card-media">
            <div className="tm-ratio tm-ratio-4-3">
              <Link className="tm-media-box" to={`/listing/${favorite.listing.id}`}>
                <figure className="tm-media-box-wrap"><img src={`${favorite.listing.photoUrls[0]}`}
                  data-src={`${favorite.listing.photoUrls[0]}`} alt={favorite.listing.title} />
                </figure>
              </Link>
            </div>
          </div>
          <div className="tm-product-card-body">
            <div className="tm-product-card-info">
              <div className="uk-text-small uk-label uk-margin-xsmall-bottom">{favorite.listing.category}</div>
              <h3 className="tm-product-card-title">
                <Link to={`/listing/${favorite.listing.id}`} className="uk-link-heading">
                  {favorite.listing.title}
                </Link></h3>
            </div>
            <div className="tm-product-card-shop">
              <div className="tm-product-card-prices">
                <div className="tm-product-card-price">${favorite.listing.pricePerUnit}</div>
              </div>
              <div className="tm-product-card-add">
                <div className="uk-text-meta tm-product-card-actions uk-text-bold">
                  {favorite.listing.location}
                </div>
                <div className="uk-text-meta tm-product-card-actions uk-text-bold">
                  {currentUser && currentUser.id === favorite.user.id ? <RemoveFavorite submitLocation="favorite" listing={favorite.listing} /> : null}                
                </div>
              </div>
            </div>
          </div>
        </article>
      </>
    );
  }
}

export default compose(withCurrentUser)(FavoritePreview);
