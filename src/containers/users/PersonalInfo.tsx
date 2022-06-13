import { compose } from 'react-apollo';
import React, { Component } from 'react'
import withCurrentUser from 'queries/currentUserQuery';
import { User } from 'types';

interface Props {
    currentUser: User;
}

class PersonalInfo extends Component<Props, {}> {

    render() {
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
                                                <div className="uk-text-meta">Joined June 6, 2018</div>
                                            </div>
                                            <div>
                                                <div className="uk-grid-small uk-flex-center" data-uk-grid>
                                                    <div><a className="uk-button uk-button-default uk-button-small" href="/settings">
                                                        <span className="uk-margin-xsmall-right" data-uk-icon="icon: cog; ratio: .75;"></span><span>Settings</span></a>
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

                            <div className="uk-width-1-1 uk-width-expand@m uk-grid-margin uk-first-column">
                                <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
                                    <header className="uk-card-header">
                                        <h1 className="uk-h2">Personal Info</h1>
                                    </header>
                                    <div className="uk-card-body">
                                        <form className="uk-form-stacked">
                                            <div className="uk-grid-medium uk-child-width-1-1 uk-grid uk-grid-stack" uk-grid="">
                                                <fieldset className="uk-fieldset uk-first-column">
                                                    <legend className="uk-h4">Contact</legend>
                                                    <div className="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s uk-grid" uk-grid="">
                                                        <div className="uk-first-column">
                                                            <label>
                                                                <div className="uk-form-label">First Name</div>
                                                                <input className="uk-input" type="text" value="Thomas" />
                                                            </label>
                                                        </div>
                                                        <div className="">
                                                            <label>
                                                                <div className="uk-form-label">Last Name</div>
                                                                <input className="uk-input" type="text" value="Bruns" />
                                                            </label>
                                                        </div>
                                                        <div className="uk-grid-margin uk-first-column">
                                                            <label>
                                                                <div className="uk-form-label">Phone Number</div>
                                                                <input className="uk-input" type="tel" value="8 (800) 555-35-35" />
                                                            </label>
                                                        </div>
                                                        <div className="uk-grid-margin">
                                                            <label>
                                                                <div className="uk-form-label">Date of Birth</div>
                                                                <input className="uk-input" type="date" value="1990-01-01" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <fieldset className="uk-fieldset uk-grid-margin uk-first-column">
                                                    <legend className="uk-h4">Address</legend>
                                                    <div className="uk-grid-small uk-grid uk-grid-stack" uk-grid="">
                                                        <div className="uk-width-1-1 uk-first-column">
                                                            <label>
                                                                <div className="uk-form-label">Country</div>
                                                                <select className="uk-select">
                                                                    <option>Choose the country</option>
                                                                    <option value="RU">Russia</option>
                                                                </select>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="uk-grid-small uk-grid" uk-grid="">
                                                        <div className="uk-width-expand uk-first-column">
                                                            <label>
                                                                <div className="uk-form-label">City</div>
                                                                <input className="uk-input" type="text" />
                                                            </label>
                                                        </div>
                                                        <div className="uk-width-1-3 uk-width-1-6@s">
                                                            <label>
                                                                <div className="uk-form-label">Post Code</div>
                                                                <input className="uk-input" type="text" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="uk-grid-small uk-grid" uk-grid="">
                                                        <div className="uk-width-expand uk-first-column">
                                                            <label>
                                                                <div className="uk-form-label">Street</div>
                                                                <input className="uk-input" type="text" />
                                                            </label>
                                                        </div>
                                                        <div className="uk-width-1-3 uk-width-1-6@s">
                                                            <label>
                                                                <div className="uk-form-label">House</div>
                                                                <input className="uk-input" type="text" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="uk-grid-small uk-child-width-1-3 uk-child-width-1-4@s uk-grid" uk-grid="">
                                                        <div className="uk-first-column">
                                                            <label>
                                                                <div className="uk-form-label">Building</div>
                                                                <input className="uk-input" type="text" />
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <label>
                                                                <div className="uk-form-label">Entrance</div>
                                                                <input className="uk-input" type="text" />
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <label>
                                                                <div className="uk-form-label">Floor</div>
                                                                <input className="uk-input" type="text" />
                                                            </label>
                                                        </div>
                                                        <div className="">
                                                            <label>
                                                                <div className="uk-form-label">Apartment</div>
                                                                <input className="uk-input" type="text" />
                                                            </label>
                                                        </div>
                                                        <div className="uk-width-1-1 uk-grid-margin uk-first-column">
                                                            <label>
                                                                <div className="uk-form-label">Comment</div>
                                                                <textarea className="uk-textarea" rows={5} placeholder="Additional information: phone numbers or doorphone code"></textarea>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="uk-card-footer uk-text-center">
                                        <button className="sc-button sc-button-primary">save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default compose(withCurrentUser)(PersonalInfo);