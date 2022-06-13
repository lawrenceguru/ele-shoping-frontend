import React, { Component } from 'react'
import { compose } from 'react-apollo';
import { User, UserDetails } from 'types';
import formatDate from 'utils/dateUtils';
import withCurrentUser from 'queries/currentUserQuery';

interface IProps {
    user: UserDetails;
    currentUser: User;
}

class SideBar extends Component<IProps, {}> {
    render() {
        const { user } = this.props;        
        return (
            <div>
                <div className="uk-card-header">
                    <div className="uk-grid-small uk-child-width-1-1" data-uk-grid>
                        <section>
                            <div className="uk-width-1-3 uk-width-1-4@s uk-width-1-2@m uk-margin-auto uk-visible-toggle uk-position-relative uk-border-circle uk-overflow-hidden uk-light">
                              <img className="uk-width-1-1" src="https://plchldr.co/i/250x250" />
                                <a className="uk-link-reset uk-overlay-primary uk-position-cover uk-hidden-hover" href="#">
                                    <div className="uk-position-center"><span uk-icon="icon: camera; ratio: 1.25;"></span>
                                    </div>
                                </a>
                            </div>
                        </section>
                        <div className="uk-text-center">
                            <div className="uk-h4 uk-margin-remove">{user.userDetails.firstName} {user.userDetails.lastName}</div>
                            <div className="uk-text-meta">Joined {formatDate(user.userDetails.insertedAt, 'short')}</div>
                        </div>
                        {/* <div>
                            <div className="uk-grid-small uk-flex-center" data-uk-grid>
                                <div><a className="uk-button uk-button-default uk-button-small" href="/settings">
                                    <span className="uk-margin-xsmall-right" uk-icon="icon: cog; ratio: .75;">
                                    </span><span>Settings</span></a></div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div>
                    <nav>
                        <ul className="uk-nav uk-nav-default tm-nav">
                            <li><a href={`/user/listings/${user.userDetails.id}`}>Listings
                                </a></li>
                            <li><a href={`/favorites/${user.userDetails.id}`}>Favorites
                                </a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default compose(withCurrentUser)(SideBar)
