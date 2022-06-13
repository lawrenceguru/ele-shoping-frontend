import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { UserDetails, UserVariables, UserListingsData, UserListingVariables } from 'types';

import USER_LISTING from 'graphql/listings/userListingsQuery.graphql';
import USER_DATA from 'graphql/users/getUserDetailsQuery.graphql';

import ListingPreview from './_ListingPreview';
import SideBar from 'containers/layouts/SideBar';
import { CircularProgress } from '@mui/material';


class UserListingsQuery extends Query<UserListingsData, UserListingVariables> { }
class UserDetailsQuery extends Query<UserDetails, UserVariables> { }

interface IProps {
    match: any
}

class UserListings extends Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }
    state = {
        hasMoreItems: true
    };
    render() {
        return (
            <>
                <section className="uk-section uk-section-small">
                    <div className="uk-container">
                        <div className="uk-grid-medium" data-uk-grid>
                            <UserDetailsQuery query={USER_DATA} variables={{ id: this.props.match.params.id }}>
                                {({ data, loading }) => {

                                    if (!data || !data.userDetails) return null;
                                    if (loading) return <div className="uk-flex uk-flex-center">
                                        <CircularProgress color="error" />
                                    </div>;

                                    return (
                                        <div className="uk-width-1-1 uk-width-1-4@m tm-aside-column">
                                            <div className="uk-card uk-card-default uk-card-small tm-ignore-container" data-uk-sticky="offset: 90; bottom: true; media: @m;">
                                                <SideBar user={data} />
                                            </div>
                                        </div>

                                    )

                                }}
                            </UserDetailsQuery>
                            <UserListingsQuery query={USER_LISTING} variables={{ limit: 12, offset: 0, userId: this.props.match.params.id }}>
                                {({ data, loading, fetchMore }) => {
                                    if (!data || !data.userListings) return null;
                                    if (loading) return <div className="uk-flex uk-flex-center">
                                        <CircularProgress color="error" />
                                    </div>;
                                    return (
                                        <div className="uk-width-1-1 uk-width-expand">
                                            <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
                                                <header className="uk-card-header">
                                                    <h1 className="uk-h2">Listings</h1>
                                                </header>
                                                <div className="uk-grid-small uk-child-width-1-3 uk-child-width-1-3@s uk-child-width-1-4@m" data-uk-grid>
                                                    {data.userListings!.map(listing => (
                                                        <ListingPreview key={listing.id} listing={listing} />
                                                    ))}

                                                </div>
                                            </div>
                                            <br />
                                            <div className="uk-text-center">
                                                <button
                                                    className="sc-button sc-button-primary"
                                                    disabled={!this.state.hasMoreItems}
                                                    onClick={() =>
                                                        fetchMore({
                                                            variables: {
                                                                offset: data.userListings.length
                                                            },
                                                            updateQuery: (previousResult, { fetchMoreResult }) => {
                                                                if (!fetchMoreResult) return previousResult;

                                                                if (fetchMoreResult.userListings.length < 10) {
                                                                    this.setState({ hasMoreItems: false });
                                                                }

                                                                return {
                                                                    userListings: [
                                                                        ...previousResult.userListings,
                                                                        ...fetchMoreResult.userListings
                                                                    ]
                                                                };
                                                            }
                                                        })
                                                    }>
                                                    See More
                                                </button>
                                            </div>
                                        </div>
                                    )

                                }}
                            </UserListingsQuery>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default UserListings