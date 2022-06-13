import * as React from 'react';
import { Query, compose } from 'react-apollo';
import withCurrentUser from 'queries/currentUserQuery';

import FAVORITES from 'graphql/favorites/favoritesQuery.graphql';

// typings
import { FavoritesData, FavoritesVariables, User } from 'types';
import Loading from 'components/Loading';
import FavoritePreview from './FavoritePreview';
class FavoritesQuery extends Query<FavoritesData, FavoritesVariables> { }

interface IProps {
    match: any;
    currentUser: User;
}

class ListFavorites extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }
    state = {
        hasMoreItems: true
    };

    public render() {

        const { currentUser } = this.props;
        return (

            <section className="uk-section uk-section-small">
                <div className="uk-container">
                    <div className="uk-grid-medium" data-uk-grid>
                        <div className="uk-width-1-1 uk-width-1-4@m tm-aside-column">
                            <div className="uk-width-1-1 uk-width-1-4@m tm-aside-column">
                                <div className="uk-card uk-card-default uk-card-small tm-ignore-container" data-uk-sticky="offset: 90; bottom: true; media: @m;">
                                    <div className="uk-card-header">
                                        <div className="uk-grid-small uk-child-width-1-1" data-uk-grid>
                                            <section>
                                                <div className="uk-width-1-3 uk-width-1-4@s uk-width-1-2@m uk-margin-auto uk-visible-toggle uk-position-relative uk-border-circle uk-overflow-hidden uk-light">
                                                    <img className="uk-width-1-1" src="https://plchldr.co/i/250x250" />
                                                    <a className="uk-link-reset uk-overlay-primary uk-position-cover uk-hidden-hover" href="#">
                                                        <div className="uk-position-center"><span uk-icon="icon: camera; ratio: 1.25;"></span>
                                                        </div></a></div>
                                            </section>
                                            <div className="uk-text-center">
                                                
                                                <div className="uk-h4 uk-margin-remove">{currentUser.firstName} {currentUser.lastName}</div>
                                                <div className="uk-text-meta">Joined June 6, 2018</div>
                                            </div>
                                            <div>
                                                <div className="uk-grid-small uk-flex-center" data-uk-grid>
                                                    <div><a className="uk-button uk-button-default uk-button-small" href="/settings">
                                                        <span className="uk-margin-xsmall-right" data-uk-icon="icon: cog; ratio: .75;"></span><span>Settings</span></a></div>
                                                    <div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <nav>
                                            <ul className="uk-nav uk-nav-default tm-nav">
                                                <li><a href={`/user/listings/${currentUser.id}`}>Listings
                                                    </a></li>
                                                <li><a href={`/favorites/${currentUser.id}`}>Favorites
                                                    </a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <FavoritesQuery query={FAVORITES} variables={{ limit: 6, offset: 0, userId: this.props.match.params.id }}>

                            {({ data, loading, fetchMore }) => {
                                if (!data || !data.userFavorites) return <Loading />;
                                if (loading) return <div data-uk-spinner />;

                                if (data.userFavorites.length === 0) return (
                                    <>
                                      <div className="uk-flex uk-flex-center">
                                          <h4 className="uk-margin-medium-top uk-text-danger uk-h3"> Whoops! You have no favorites.</h4>
                                      </div>
                                    </>
                                  );

                                return (
                                    <>
                                        <div className="uk-width-1-1 uk-width-expand@m">
                                            <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
                                                <header className="uk-card-header">
                                                    <h1 className="uk-h2">Favorites</h1>
                                                </header>
                                                <div className="uk-grid-collapse tm-products-list uk-grid uk-grid-stack" uk-grid="">
                                                    {data.userFavorites!.map(favorite => (
                                                        <FavoritePreview key={favorite.id} favorite={favorite} />
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
                                                                offset: data.userFavorites.length
                                                            },
                                                            updateQuery: (previousResult, { fetchMoreResult }) => {
                                                                if (!fetchMoreResult) return previousResult;

                                                                if (fetchMoreResult.userFavorites.length < 10) {
                                                                    this.setState({ hasMoreItems: false });
                                                                }

                                                                return {
                                                                    userFavorites: [
                                                                        ...previousResult.userFavorites,
                                                                        ...fetchMoreResult.userFavorites
                                                                    ]
                                                                };
                                                            }
                                                        })
                                                    }>
                                                    See More
                                                </button>
                                            </div>
                                        </div>

                                    </>
                                );
                            }}
                        </FavoritesQuery>
                    </div>
                </div>
            </section>
        );
    }
}
export default compose(withCurrentUser)(ListFavorites);
