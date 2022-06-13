import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import client from 'config/apolloClient';
import App from 'containers/layouts/App';
import ScrollToTop from 'components/ScrollToTop';

// import 'uikit/dist/js/uikit.js';
// import 'uikit/dist/js/uikit-core.js';
// import "uikit/dist/js/uikit-icons.js";
import './assets/uikit/js/script.js';

render(
  <ApolloProvider client={client}>
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
