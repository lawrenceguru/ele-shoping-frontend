import * as React from 'react';
import { Query, compose } from 'react-apollo';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import withCurrentUser from 'queries/currentUserQuery';

import LISTING from 'graphql/listings/listingQuery.graphql';

// typings
import { ListingData, ListingVariables, User } from 'types';
// import capitalize from 'utils/stringUtils';
import _RelatedListings from './_RelatedListings';
import formatDate from 'utils/dateUtils';
import { Link } from 'react-router-dom';
import FavoriteActions from 'containers/favorites/FavoriteActions';
import ListReviews from 'containers/reviews/ListReviews';
import ListingActions from './_ListingActions'
import { CircularProgress } from '@mui/material';
import CreateMessage from 'containers/messages/CreateMessage';

class ListingQuery extends Query<ListingData, ListingVariables> { }

let statusColor: string;

interface IProps {
  currentUser: User;
  match: any;
}

class Listing extends React.Component<IProps, {}> {
  public render() {

    const { currentUser } = this.props;

    return (
      <ListingQuery query={LISTING} variables={{ id: this.props.match.params.id }}>

        {({ data, loading }) => {
          if (!data || !data.listing) return null;
          if (loading) return <div className="uk-flex uk-flex-center">
            <CircularProgress color="error" />
          </div>;

          const listing = data.listing;

          if (listing.status === "pending") {
            statusColor = "uk-label uk-label-warning uk-margin-xsmall-bottom";
          } else if (listing.status === "sold") {
            statusColor = "uk-label uk-label-danger uk-margin-xsmall-bottom";
          } else {
            statusColor = "uk-label uk-label-success uk-margin-xsmall-bottom";
          }

          return (
            <>
              <section key={listing.id} className="uk-section uk-section-small">
                <div className="uk-container uk-container-xlarge">
                  <div className="uk-grid-medium uk-child-width-1-1" data-uk-grid>
                    <div className="uk-text-center">
                      <ul className="uk-breadcrumb uk-flex-center uk-margin-remove">
                        <li><a href="/">Home</a></li>
                        <li><a href={`/listings/search/${listing.category}`}>{listing.categoryDescription}</a></li>
                        <li><span>{listing.title}</span></li>
                      </ul>
                      <h2 className="uk-margin-small-top uk-margin-remove-bottom">{listing.title}</h2>
                    </div>
                    <div>
                      <div className="uk-grid-medium uk-child-width-1-1" data-uk-grid>
                        <div>
                          <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
                            <div className="uk-grid-small uk-grid-collapse uk-grid-match" data-uk-grid>
                              <div className="uk-width-1-1 uk-width-expand@m">
                                <div className="uk-grid-collapse uk-child-width-1-1" data-uk-slideshow="finite: true; ratio: 2:1;" data-uk-grid>
                                  <div>
                                    <ul className="uk-slideshow-items" data-uk-lightbox>
                                      <li className="uk-margin-top">
                                        <figure className="tm-media-box-wrap"><img data-src={listing.photoUrls[0]} alt={listing.title} uk-img="loading: lazy" /></figure>
                                      </li>
                                      {(listing.photoUrls.slice(1).length) ?
                                        <>
                                          {listing.photoUrls.slice(1).map((_x, y) =>
                                            <li key={y}>
                                              <figure key={y} className="tm-media-box-wrap"><img key={y + 1} data-src={listing.photoUrls[y + 1]}
                                                uk-img="loading: lazy" alt={listing.title} /></figure>
                                            </li>
                                          )}
                                        </>
                                        : null}
                                    </ul>
                                  </div>
                                  <div>
                                    <div className="uk-card-body uk-flex uk-flex-center">
                                      <div className="uk-width-1-2 uk-visible@s">
                                        <div data-uk-slider="finite: true">
                                          <div className="uk-position-relative">
                                            <div className="uk-slider-container">
                                              <ul className="tm-slider-items uk-slider-items uk-child-width-1-4 uk-grid uk-grid-small">
                                                {(listing.photoUrls.length) ?
                                                  <>
                                                    {listing.photoUrls.map((_x, y) =>
                                                      <li key={y} data-uk-slideshow-item={y}>
                                                        <div className="tm-ratio tm-ratio-1-1"><a className="tm-media-box tm-media-box-frame" href="#">
                                                          <figure className="tm-media-box-wrap"><img data-src={listing.photoUrls[y]} alt={listing.title} uk-img="loading: lazy" /></figure></a></div>
                                                      </li>
                                                    )}
                                                  </>
                                                  : null}
                                              </ul>
                                              <div><a className="uk-position-center-left-out uk-position-small" href="#" data-uk-slider-item="previous" data-uk-slidenav-previous></a><a className="uk-position-center-right-out uk-position-small" href="#" data-uk-slider-item="next" data-uk-slidenav-next></a></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <ul className="uk-slideshow-nav uk-dotnav uk-hidden@s"></ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="uk-width-1-1 uk-width-1-3@m tm-product-info">
                                <div className="uk-card-body">
                                  <div className="uk-flex uk-flex-between">
                                    <div>Listed by :
                                      <Link to={`/user/listings/${listing.owner.id}`}>
                                        {listing.owner.firstName} {listing.owner.lastName}
                                      </Link>
                                    </div>
                                    <div>
                                      {
                                        (currentUser && (currentUser.id != listing.owner.id)) ?
                                          <>
                                            <FavoriteActions userId={currentUser.id} listing={listing} />
                                          </>
                                          :
                                          <div>
                                            {(!currentUser) ?
                                              <>
                                                <button data-uk-tooltip="title: Please login in to add favorite">
                                                  <FavoriteBorderIcon />
                                                </button>
                                              </>
                                              : 
                                              <ListingActions listing={listing} />
                                            }
                                          </div>
                                      }
                                    </div>
                                  </div>
                                  <div>Member since:
                                    <span className="uk-text-meta">{formatDate(listing.owner.insertedAt, 'long')}</span>
                                  </div>
                                  <div>
                                    <span className={statusColor}>{listing.status}</span>
                                  </div>
                                  {/* <div className="uk-margin">
                                    <div className="uk-grid-small" data-uk-grid>
                                      <div className="uk-flex uk-flex-middle">
                                        <ul className="uk-iconnav uk-margin-xsmall-bottom tm-rating">
                                          <Rating name="read-only" value={averageRating} readOnly />({listing.owner.reviews!.length})
                                        </ul>
                                      </div>
                                    </div>
                                  </div> */}
                                  <div className="uk-margin">
                                    <div className="uk-padding-small uk-background-primary-lighten uk-border-rounded">
                                      <div className="uk-grid-small uk-child-width-1-1" data-uk-grid>
                                        <div>
                                          <div className="tm-product-price">${listing.pricePerUnit}</div>
                                        </div>
                                        {(listing.status === "open" || listing.status === "pending") ?
                                          <div className="uk-grid-small" data-uk-grid>
                                            {

                                              (currentUser && (currentUser.id != listing.owner.id)) ?
                                                <>
                                                  <CreateMessage receiverId={listing.owner.id}
                                                    listingId={listing.id} />
                                                </>
                                                :
                                                <div>
                                                  {(!currentUser) ?
                                                    <>
                                                      <button className="sc-button sc-button-small sc-button-primary uk-margin-xsmall-right" data-uk-tooltip="title: Please login in to send a message;">Send a message</button>
                                                    </>
                                                    : null}
                                                </div>
                                            }
                                          </div> : null}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="uk-margin">
                                    <div className="uk-padding-small uk-background-muted uk-border-rounded">
                                      <div className="uk-grid-small uk-child-width-1-1 uk-text-small uk-grid uk-grid-stack" uk-grid="">
                                        <div className="uk-first-column">
                                          <div className="uk-grid-collapse uk-grid" uk-grid="">
                                            <span className="uk-margin-xsmall-right uk-icon uk-first-column" uk-icon="list">
                                            </span>
                                            <div>
                                              <div className="uk-text-bolder uk-text-large">{listing.categoryDescription}</div>
                                              {/* <div className="uk-text-xsmall uk-text-muted">In stock, free, tomorrow</div> */}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="uk-first-column">
                                          <div className="uk-grid-collapse uk-grid" uk-grid="">
                                            <span className="uk-margin-xsmall-right uk-icon uk-first-column" uk-icon="cart">
                                            </span>
                                            <div>
                                              <div className="uk-text-bolder uk-text-large">{listing.conditionDescription}</div>
                                              {/* <div className="uk-text-xsmall uk-text-muted">In stock, free, tomorrow</div> */}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="uk-grid-margin uk-first-column">
                                          <div className="uk-grid-collapse uk-grid" uk-grid="">
                                            <span className="uk-margin-xsmall-right uk-icon uk-first-column" uk-icon="location"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="location"><path fill="none" stroke="#000" strokeWidth="1.01" d="M10,0.5 C6.41,0.5 3.5,3.39 3.5,6.98 C3.5,11.83 10,19 10,19 C10,19 16.5,11.83 16.5,6.98 C16.5,3.39 13.59,0.5 10,0.5 L10,0.5 Z"></path><circle fill="none" stroke="#000" cx="10" cy="6.8" r="2.3"></circle></svg></span>
                                            <div>
                                              <div className="uk-text-bolder uk-text-large">{listing.locationDetails.placeName},{listing.locationDetails.stateCode}</div>
                                              {/* <div className="uk-text-xsmall uk-text-muted">In stock, free, tomorrow</div> */}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="uk-margin">
                                    <span className="uk-text-large">Safety</span>
                                    <div className="uk-padding-small uk-background-muted uk-border-rounded">
                                      <div className="uk-grid-large uk-child-width-1-1 uk-text-small" data-uk-grid>
                                        <div className="uk-text-medium display-linebreak">
                                          <ul className="uk-list uk-list-bullet">
                                            <li>Remember, never send payments to anyone </li>
                                            <li>Always meet the seller at a safe public place</li>
                                            <li>Check for the items to make sure they meet your needs</li>
                                            <li>Pay only after your are satisfied and have the item in your possession.</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>
                              <div className="uk-width-1-1 tm-product-description" id="description">
                                <header>
                                  <nav className="tm-product-nav" data-uk-sticky="offset: 60; bottom: #description; cls-active: tm-product-nav-fixed;">
                                    <ul className="uk-subnav uk-subnav-pill js-product-switcher" data-uk-switcher="connect: .js-tabs">
                                      <li><a className="js-scroll-to-description" href="#description">Description</a></li>
                                      <li><a className="js-scroll-to-description" href="#description">
                                        Reviews
                                        {/* <span>({listing.owner.reviews!.length})</span> */}
                                      </a></li>
                                      {/* <li><a className="js-scroll-to-description" href="#description">Safety</a></li> */}
                                    </ul>
                                  </nav>
                                </header>
                                <div className="uk-card-body">
                                  <div className="uk-switcher js-product-switcher js-tabs">
                                    <div className="uk-container uk-container-small">
                                      <section>
                                        <article className="uk-article">
                                          <div className="uk-article-body">
                                            {listing.description}
                                            {/* <table className="uk-table uk-table-medium uk-table-middle uk-table-divider uk-table-justify uk-table-responsive">
                                              <thead>
                                                <tr>
                                                  <th></th>
                                                  <th className="uk-width-1-2 uk-text-left">{ }</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <th>Condition:</th>
                                                  <td>{listing.conditionDescription}</td>
                                                </tr>
                                                <tr>
                                                  <th>Category:</th>
                                                  <td>{listing.categoryDescription}</td>
                                                </tr>
                                                <tr>
                                                  <th>Listing Posted </th>
                                                  <td>{formatDate(listing.insertedAt, 'short')}</td>
                                                </tr>
                                                <tr>
                                                  <th>No of Units</th>
                                                  <td>{listing.noOfUnits}</td>
                                                </tr>
                                                <tr>
                                                  <th>Price Per Unit</th>
                                                  <td>{listing.pricePerUnit}</td>
                                                </tr>
                                                <tr>
                                                  <th>Description</th>
                                                  <td>{listing.description}</td>
                                                </tr>
                                              </tbody>
                                            </table> */}
                                          </div>
                                        </article>
                                      </section>
                                    </div>
                                    <section>
                                      <ListReviews userId={listing.owner.id} />
                                    </section>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <_RelatedListings listingId={listing.id} category={listing.category} location={listing.location} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {
                (!currentUser) ?
                  <div id="message" data-uk-modal>
                    <div className="uk-modal-dialog uk-modal-body">
                      <p>
                        You must first Login or register  before continuing
                      </p>
                      <button className="uk-button uk-button-default" type="button">Close</button>
                    </div>
                  </div>
                  :
                  <div id="message" data-uk-modal>
                    <div className="uk-modal-dialog uk-modal-body">
                      <button className="uk-modal-close-outside" type="button" data-uk-close></button>
                      <h2 className="uk-modal-title uk-text-center">Send a message</h2>
                      <form className="uk-form-stacked">
                        <div className="uk-grid-small uk-child-width-1-1" data-uk-grid>
                          <div>
                            <label>
                              <div className="uk-form-label uk-form-label-required">Message</div>
                              <textarea className="uk-textarea" rows={2} required></textarea>
                            </label>
                          </div>
                          <div className="uk-text-center">
                            <button className="uk-button uk-button-primary">Send</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
              }
            </>
          );
        }}
      </ListingQuery>
    );
  }
}

export default compose(withCurrentUser)(Listing);
