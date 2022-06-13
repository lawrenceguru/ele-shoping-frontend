import * as React from 'react';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import SearchForm from 'containers/recipes/_SearchForm';
import withCurrentUser from 'queries/currentUserQuery';

// typings
import { User } from 'types';

interface IProps {
  keywords: string;
  currentUser: User;
}

class HeadListRecipes extends React.Component<IProps, {}> {
  public render() {
    const { keywords, currentUser } = this.props;

    return (
      <div className="columns is-flex is-centered">
        <div className="column is-half">
          <SearchForm initialKeywords={keywords} />
          {currentUser ? (
            <div className="column">
              <Link to="/recipes/new" className="button is-primary is-pulled-right">
                New Recipe
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default compose(withCurrentUser)(HeadListRecipes);
