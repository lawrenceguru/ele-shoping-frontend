import * as React from 'react';
import { Query } from 'react-apollo';

import ListingPreview from 'containers/listings/_ListingPreview';
import LISTINGS from 'graphql/listings/listingsQuery.graphql';

// typings
import { ListingsData, ListingsVariables } from 'types';
import { CircularProgress } from '@mui/material';
import { number } from 'prop-types';
class ListingsQuery extends Query<ListingsData, ListingsVariables> { }

interface IProps {
  keywords: string;
}

export default class ListListings extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }
  state = {
    hasMoreItems: true,
    offset: number
  };
  public render() {
    return (
      <>
        <ListingsQuery query={LISTINGS} variables={{ limit: 24, offset: 0, keywords: this.props.keywords }}>
          {({ data, loading, fetchMore }) => {

            if (loading) return <div className="uk-flex uk-flex-center">
              <CircularProgress value={100} color="primary" />
            </div>;
            if (!data || !data.listings) return null;

            if (data.listings.length === 0) return (
              <>
                <div className="uk-flex uk-flex-center">
                  <h4 className="uk-margin-small-top uk-text-danger uk-h3"> Whoops! No listings found.</h4>
                </div>
              </>
            );

            return (
              <>
                <section className="uk-section uk-section-default uk-section-small">
                  <div className="uk-container uk-container-xlarge">
                    <div className="uk-grid-small uk-child-width-1-3 uk-child-width-1-3@s uk-child-width-1-6@m" data-uk-grid>
                      {data.listings.map(listing => (
                        <ListingPreview key={listing.id} listing={listing} />
                      ))}
                    </div>
                  </div>
                </section>
                <br />
                {(data.listings.length < 24) ?
                  null :                  
                  <div className="uk-text-center">
                    <button
                      className="sc-button sc-button-small sc-button-primary"
                      disabled={!this.state.hasMoreItems}
                      onClick={() =>
                        fetchMore({
                          variables: {
                            offset: data.listings.length
                          },
                          updateQuery: (previousResult, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return previousResult;

                            if (fetchMoreResult.listings.length < 18) {
                              this.setState({ hasMoreItems: false });
                            }

                            return {
                              listings: [
                                ...previousResult.listings,
                                ...fetchMoreResult.listings
                              ]
                            };
                          }
                        })
                      }>load more items
                    </button>
                  </div>}
                <br />
              </>
            );
          }
          }
        </ListingsQuery >
      </>
    );
  }
}
