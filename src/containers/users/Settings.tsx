import * as React from 'react';
import EditUserProfile from './EditUserProfile';
import { compose } from 'react-apollo';
import withCurrentUser from 'queries/currentUserQuery';
import { User } from 'types';


export interface IAppProps {
    currentUser: User;
}

class Settings extends React.Component<IAppProps> {
    public render() {
        const { currentUser } = this.props;
        return (
            <div>
                <section className="uk-section uk-section-small">
                    <div className="uk-container">
                        <div className="uk-grid-medium" data-uk-grid>
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

                                                <div className="uk-h4 uk-margin-remove"></div>
                                                <div className="uk-text-meta">{currentUser.id}</div>
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
                            <EditUserProfile />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default compose(withCurrentUser)(Settings);;
