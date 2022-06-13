import * as React from 'react';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import AllRecipes from 'containers/recipes/AllRecipes';
import SearchRecipe from 'containers/recipes/SearchRecipe';
import NewRecipe from 'containers/recipes/NewRecipe';
import EditRecipe from 'containers/recipes/EditRecipe';
import Recipe from 'containers/recipes/Recipe';

import SignInUser from 'containers/users/SignInUser';
import SignUpUser from 'containers/users/SignUpUser';
import EditUserProfile from 'containers/users/EditUserProfile';
import ChangeUserPassword from 'containers/users/ChangeUserPassword';

import ConfirmationNeeded from 'containers/users/ConfirmationNeeded';

import UserIsAuthenticated from 'components/UserIsAuthenticated';
import NotFound from 'components/NotFound';
import Header from 'containers/layouts/Header';

import FlashMessage from 'components/flash/FlashMessage';
import withFlashMessage from 'components/flash/withFlashMessage';
import withCurrentUser from 'queries/currentUserQuery';

import 'assets/uikit/sass/style.scss';
import 'assets/scutum/admin/scss/main.scss';
// import 'assets/scutum/landing/style.scss';

// typings
import { User } from 'types';
import { History } from 'history';
import AllListings from 'containers/listings/AllListings';
import SearchListing from 'containers/listings/SearchListing';
import Listing from 'containers/listings/Listing';
import EditListing from 'containers/listings/EditListing';
import NewListing from 'containers/listings/NewListing';
import Footer from './Footer';
import Settings from 'containers/users/Settings';
import MyListings from 'containers/users/MyListings';
import UserListings from 'containers/listings/UserListings';
import PersonalInfo from 'containers/users/PersonalInfo';
import ListFavorites from 'containers/favorites/ListFavorites';
import Privacy from './Privacy';
import Terms from './Terms';
import ListReviews from 'containers/reviews/ListReviews';
import Checkout from 'containers/checkout/Checkout';
import CreateFavorite from 'containers/favorites/CreateFavorite';
import ListContacts from 'containers/messages/ListContacts';
import ListMessages from 'containers/messages/ListMessages';
import Faq from './Faq';
import About from './About';
import Blog from './Blog';
import News from './News';

interface IProps {
  history: History;
  deleteFlashMessage: () => void;
  currentUser: User;
  currentUserLoading: boolean;
}


class App extends React.Component<IProps, {}> {
  private unsubscribeFromHistory: any;

  public componentWillMount() {
    const { history } = this.props;
    this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
    this.handleLocationChange();
  }

  public componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  }

  public handleLocationChange = () => {
    this.props.deleteFlashMessage();
  };

  public render() {
    const { currentUser, currentUserLoading } = this.props;

    return (
      
      <div id="page-container">
        <Header currentUser={currentUser} currentUserLoading={currentUserLoading} />
        <FlashMessage />
        <main id="content-wrap">
          <Switch>
            <Route path="/" exact component={AllListings} />
            <Route path="/alllistings" component={AllListings} />
            <Route path="/listings/search/:keywords" component={SearchListing} />
            <Route path="/listings/new" component={UserIsAuthenticated(NewListing)} />
            <Route path="/listings/:id/edit" component={UserIsAuthenticated(EditListing)} />
            <Route path="/listing/:id" component={Listing} />

            <Route path="/allrecipes" exact component={AllRecipes} />
            <Route path="/recipes/search/:keywords" component={SearchRecipe} />
            <Route path="/recipes/new" component={UserIsAuthenticated(NewRecipe)} />
            <Route path="/recipes/:id/edit" component={UserIsAuthenticated(EditRecipe)} />
            <Route path="/recipes/:id" component={Recipe} />

            <Route path="/favorites/:id/new" component={UserIsAuthenticated(CreateFavorite)} />
            <Route path="/favorites/:id" component={UserIsAuthenticated(ListFavorites)} />

            <Route path="/users/signin" component={SignInUser} />
            <Route path="/users/signup" component={SignUpUser} />
            <Route path="/personal-info" component={UserIsAuthenticated(PersonalInfo)} />
            <Route path="/settings" component={UserIsAuthenticated(Settings)} />
            <Route path="/my-listings" component={UserIsAuthenticated(MyListings)} />
            <Route path="/users/welcome/:email" component={ConfirmationNeeded} />

            <Route path="/contacts/:id" component={UserIsAuthenticated(ListContacts)} />
            <Route path="/messages/:senderId/:receiverId/:listingId" component={UserIsAuthenticated(ListMessages)} />

            <Route path="/user/reviews/:id" component={ListReviews} />
            <Route path="/user/listings/:id" component={UserListings} /> 
            <Route path="/users/confirmation-needed/:email" component={ConfirmationNeeded} />
            <Route path="/users/profile/edit" component={UserIsAuthenticated(EditUserProfile)} />
            <Route path="/users/password/edit" component={UserIsAuthenticated(ChangeUserPassword)} />

            <Route path="/about" component={About} />
            <Route path="/news" component={News} />
            <Route path="/faq" component={Faq} />
            <Route path="/blog" component={Blog} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route path="/checkout" component={Checkout} />

            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default compose(
  withCurrentUser,
  withFlashMessage,
  withRouter
)(App);
