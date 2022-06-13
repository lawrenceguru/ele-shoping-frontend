import * as React from 'react';
// import CSS from 'csstype';
import { Query } from 'react-apollo';
import { Mutation, MutationResult, compose } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { Link } from 'react-router-dom';
import Gravatar from "react-gravatar";

import withFlashMessage from 'components/flash/withFlashMessage';
import REVOKE_TOKEN from 'graphql/auth/revokeTokenMutation.graphql';

import logo from 'assets/images/letzell-2.png';
import './dashboard.css';

// typings
import { User, FlashMessageVariables, RevokeTokenData } from 'types';
import HeadListListings from 'containers/listings/_HeadListListings';
class RevokeTokenMutation extends Mutation<RevokeTokenData> { }

import LISTING_OPTIONS from 'graphql/listings/listingOptionsQuery.graphql';
// typings
import { ListingOptionsData } from 'types';
class ListingOptionsQuery extends Query<ListingOptionsData> { }

interface IProps {
  redirect: (path: string, message?: FlashMessageVariables) => void;
  currentUser: User;
  match: any;
  currentUserLoading: boolean;
}

class Header extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.logout = this.logout.bind(this);
  }


  private logout(revokeToken: Function, client: ApolloClient<any>) {
    return async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      const response: MutationResult<RevokeTokenData> = await revokeToken();
      const {
        revokeToken: { errors }
      } = response.data!;
      // const errors = response.data!.revokeToken.errors;
      if (!errors) {
        window.localStorage.removeItem('letzell:token');
        await client.resetStore();
        this.props.redirect('/', { notice: 'You are well disconnected' });
      }
    };
  }

  private renderCategoryLinks() {
    return (
      <ListingOptionsQuery query={LISTING_OPTIONS}>
        {({ data, loading }) => {
          if (loading) return null;
          if (!data) return null;
          const { categoryOptions } = data;
          const uniqueCategory = categoryOptions.map(item => item.group)
            .filter((value, index, self) => self.indexOf(value) === index)
          return (
            <>
              {uniqueCategory.map(category => (
                <li key={category}>
                  <a href="#0">{category}</a>
                  <div uk-dropdown="mode: click">
                    <ul className="uk-nav uk-navbar-dropdown-nav">
                      {categoryOptions.map(child => (
                        (child.group === category) ? <li className="uk-margin-small-left" key={child.value}>
                          <a href={`/listings/search/${child.value}`}>{child.label}</a>
                        </li> : null
                      ))}
                    </ul>

                  </div>

                </li>
              ))}
            </>
          )
        }}
      </ListingOptionsQuery>
    )
  }

  private renderSignInLinks() {
    const { currentUser, currentUserLoading } = this.props;
    if (currentUserLoading) {
      return null;
    }

    if (currentUser) {
      return (
        <RevokeTokenMutation mutation={REVOKE_TOKEN}>
          {(revokeToken, { client }) => (
            <div>
              <div className="uk-position-relative uk-text-center uk-display-block">
                <a className="uk-navbar-item uk-link-muted tm-navbar-button" href="#0" uk-icon="user">
                  <Gravatar
                    md5={currentUser.gravatarMd5}
                    className="sc-avatar-initials"
                    size={30}
                  />
                </a>
                <div className="uk-dropdown user-drop" data-uk-dropdown="pos: bottom-center; animation: uk-animation-slide-bottom-small; duration: 150 ; mode: click">
                  <ul className="uk-nav uk-dropdown-nav uk-text-left">
                    <li className="uk-nav-header">{currentUser.firstName} {currentUser.lastName}</li>
                    <li><a href="#"><span data-uk-icon="icon: info"></span> Summary</a></li>
                    <li><a href={`/user/listings/${currentUser.id}`}><span data-uk-icon="icon: list"></span> Listings</a></li>
                    <li><a href={`/favorites/${currentUser.id}`}><span data-uk-icon="icon: heart"></span> Favorites</a></li>
                    <li><a href={`/contacts/${currentUser.id}`}><span data-uk-icon="icon: comments"></span> Messages</a></li>
                    <li className="uk-nav-divider"></li>
                    <li><a href={`/settings`}><span data-uk-icon="icon: settings"></span> Your Data</a></li>
                    <li className="uk-nav-divider"></li>
                    <li><a href="#0" onClick={this.logout(revokeToken, client)}><span data-uk-icon="icon: sign-out"></span> Sign Out</a></li>
                  </ul>
                </div>
              </div>


            </div>
          )}
        </RevokeTokenMutation>
      );
    }

    return (
      <>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li>
              <Link to="/users/signup">
                Register
              </Link>
            </li>
            <li>
              <Link to="/users/signin">
                Login
              </Link>

            </li>
          </ul>
        </div>
      </>
    );
  }

  public render() {
    const {
      params: { keywords }
    } = this.props.match;
    return (
      <>
        <header id="site-head">
          <div className="uk-navbar-container tm-navbar-container uk-sticky uk-sticky-fixed" data-uk-sticky="cls-active: tm-navbar-container-fixed"
            style={{ position: 'fixed', top: '0px', width: '1200px' }}>
            <div className="uk-container uk-container-xlarge uk-navbar" data-uk-navbar="">
              <div className="uk-navbar-left">
                <button className="uk-navbar-toggle uk-hidden@m uk-icon uk-navbar-toggle-icon"
                  data-uk-toggle="target: #nav-offcanvas" data-uk-navbar-toggle-icon="" aria-expanded="false">
                  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <rect y="9" width="20" height="2"></rect><rect y="3" width="20" height="2"></rect>
                    <rect y="15" width="20" height="2"></rect>
                  </svg></button>
                <a className="uk-navbar-item uk-logo" href="/">
                  <img src={logo} alt="" width={100} height={40} />
                </a>
                <div className="uk-navbar-item uk-visible@l">
                  <HeadListListings keywords={keywords} />
                </div>
              </div>
              <div className="uk-navbar-center">               
                It is time to declutter your home. List your item for free!
              </div>
              <div className="uk-navbar-right">
                <Link className="sc-button sc-button-small sc-button-primary" to="/listings/new">
                  List an Item <span className="uk-margin-xsmall-left" data-uk-icon="icon: camera" />
                </Link>

                <div className="uk-margin-large-left uk-margin-large-right uk-position-relative uk-text-center uk-display-block">
                  <a href="#" className="uk-text-large uk-text-muted uk-display-block uk-text-center" data-uk-icon="icon: triangle-down; ratio: 0.7">Links</a>
                  <div className="uk-dropdown user-drop" data-uk-dropdown="mode: click; pos: bottom-center; animation: uk-animation-slide-bottom-small; duration: 150">
                    <ul className="uk-nav uk-dropdown-nav uk-text-left">
                      <li><a href="/about"><span data-uk-icon="icon: info"></span> About</a></li>
                      <li><a href="/faq"><span data-uk-icon="icon: refresh"></span> FAQ</a></li>
                      <li><a href="/help"><span data-uk-icon="icon: question"></span>Help</a></li>
                      <li><a href="/terms"><span data-uk-icon="icon: image"></span> Terms</a></li>
                      <li><a href="/privacy"><span data-uk-icon="icon: sign-out"></span> Privacy</a></li>
                    </ul>
                  </div>
                </div>
                {this.renderSignInLinks()}
              </div>
            </div>
          </div><div className="uk-sticky-placeholder" style={{ height: '61px', margin: '0px' }} ></div>
        </header>

        <div className="uk-container uk-container-xlarge uk-padding-small uk-visible@m">
          <nav className="uk-navbar-container uk-margin">
            <ul className="uk-subnav uk-flex uk-flex-between uk-flex-nowrap">
              {this.renderCategoryLinks()}
            </ul>
          </nav>
        </div>

        <div id="nav-offcanvas" data-uk-offcanvas="overlay: true">
          <aside className="uk-offcanvas-bar uk-padding-remove">
            <div className="uk-card uk-card-default uk-card-small tm-shadow-remove">
              <nav className="uk-card-small uk-card-body">
                <ul className="uk-nav-default uk-nav-parent-icon uk-list-divider" data-uk-nav>
                  {this.renderCategoryLinks()}

                  <li><a href="blog.html">Blog</a>
                  </li>
                  <li><a href="about.html">About</a>
                  </li>
                </ul>
              </nav>
              <nav className="uk-card-body">
                <ul className="uk-iconnav uk-flex-center">
                  <li><a href="#" title="Facebook" data-uk-icon="facebook"></a></li>
                  <li><a href="#" title="Twitter" data-uk-icon="twitter"></a></li>
                  <li><a href="#" title="YouTube" data-uk-icon="youtube"></a></li>
                  <li><a href="#" title="Instagram" data-uk-icon="instagram"></a></li>
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </>
    );
  }
}

export default compose(withFlashMessage)(Header);
