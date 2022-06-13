import * as React from 'react';
import { compose } from 'react-apollo';
// import { Link } from 'react-router-dom';

import SearchForm from 'containers/listings/_SearchForm';
import withCurrentUser from 'queries/currentUserQuery';

// typings
import { User } from 'types';

interface IProps {
  keywords: string;
  currentUser: User;
}

class HeadListListings extends React.Component<IProps, {}> {
  public render() {
    const { keywords } = this.props;

    return (
      <>       
          <SearchForm initialKeywords={keywords} />
      </>
    );
  }
}

export default compose(withCurrentUser)(HeadListListings);
