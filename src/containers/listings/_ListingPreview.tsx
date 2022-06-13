import * as React from 'react';
import { compose } from 'react-apollo';

import ListingActions from 'containers/listings/_ListingActions';
import withCurrentUser from 'queries/currentUserQuery';

// typings
import { ListingPreviewFragment, User } from 'types';
import { Skeleton } from '@mui/material';

interface IProps {
  listing: ListingPreviewFragment;
  currentUser: User;
}

class ListingPreview extends React.Component<IProps, {}> {

  public render() {
    const { listing, currentUser } = this.props;

    let statusColor: string;

    if (listing.status === "pending") {
      statusColor = "uk-text-xsmall uk-label uk-label-warning uk-margin-xsmall-bottom";
    } else if (listing.status === "sold") {
      statusColor = "uk-text-xsmall uk-label uk-label-danger uk-margin-xsmall-bottom";
    } else {
      statusColor = "uk-text-xsmall uk-label uk-label-success uk-margin-xsmall-bottom";
    }

    return (
      <>
        {listing ? (
          <>                    
            <div>
              <a className="uk-link-text uk-text-center uk-display-block uk-padding-small uk-box-shadow-hover-large" href={`/listing/${listing.id}`}>
                <div className="tm-ratio tm-ratio-4-3">
                  <div className="tm-media-box">
                    <figure className="tm-media-box-wrap"><img className="item-brand"
                      data-src={`${listing.photoUrls[0]}`} uk-img="loading: eager" alt="Letzell" />
                    </figure>
                  </div>
                </div>
                <div className="uk-flex uk-flex-between">
                  <div className="uk-text-xsmall uk-label uk-margin-xsmall-bottom">{listing.category}</div>
                  <div className={statusColor}></div>
                </div>
                <div className="uk-text-truncate">{listing.title}</div>
                <div className="uk-margin-small-bottom">
                  <div className="uk-flex uk-flex-between">
                    <span className="uk-text-medium uk-text-bold uk-text-truncate">
                      {(!listing.locationDetails) ? listing.location : (listing.locationDetails.placeName + "," + listing.locationDetails.stateCode)}
                    </span>
                    <span className="tm-product-card-price">${listing.pricePerUnit}</span>
                  </div>
                </div>
                {currentUser && currentUser.id === listing.ownerId ? <ListingActions listing={listing} /> : null}
              </a>
            </div>
          </>

        ) : <Skeleton variant="rectangular" width={210} height={118} />}
      </>
    );
  }
}

export default compose(withCurrentUser)(ListingPreview);
