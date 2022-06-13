import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { RelatedListingsData, RelatedListingVariables } from 'types';

import RELATED_LISTING from 'graphql/listings/relatedListingsQuery.graphql';
import ListingPreview from './_ListingPreview';
import { CircularProgress } from '@mui/material';


class RelatedListingsQuery extends Query<RelatedListingsData, RelatedListingVariables> { }

interface IProps {
    listingId: string,
    category: string,
    location: string
}

class _RelatedListings extends Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }
    render() {
        return (
            <>
                <RelatedListingsQuery query={RELATED_LISTING} variables={{ listingId: this.props.listingId, category: this.props.category, location: this.props.location }}>
                    {({ data, loading }) => {
                        if (!data || !data.relatedListings) return null;
                        if (loading) return <div className="uk-flex uk-flex-center">
                            <CircularProgress color="error" />
                        </div>;
                        return (
                            <>
                                <section>
                                    <div uk-slider="finite: true">
                                        <div className="uk-grid-small uk-flex-middle uk-margin-bottom" data-uk-grid>
                                            <h2 className="uk-width-expand uk-text-center">Related Listings</h2>
                                            <div className="uk-visible@s"><a className="tm-slidenav"
                                                href="#" uk-slider-item="previous" data-uk-slidenav-previous></a>
                                                <a className="tm-slidenav" href="#" uk-slider-item="next" data-uk-slidenav-next>
                                                </a></div>
                                        </div>
                                        <div>
                                            <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
                                                <div className="uk-position-relative">
                                                    <div className="uk-slider-container">
                                                        <div className="uk-slider-items uk-grid-collapse uk-child-width-1-3 uk-child-width-1-6@m tm-products-grid">

                                                            {data.relatedListings!.map(listing => (
                                                                <ListingPreview key={listing.id} listing={listing} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin-top uk-hidden@s"></ul>
                                        </div>
                                    </div>
                                </section>


                            </>
                        )

                    }}
                </RelatedListingsQuery>
            </>
        )
    }
}

export default _RelatedListings