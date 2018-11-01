import React from 'react';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'store/index';
import Layout from 'containers/Layout';
import App from 'containers/App';

const routes = (
  <ConnectedRouter history={history}>
    <Layout>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </Layout>
  </ConnectedRouter>
);

export default routes;
