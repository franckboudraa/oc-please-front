import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getTokenFromLSThenAuthenticate } from './actions';

import { Container, Loader, Message } from 'semantic-ui-react';

import PrivateRoute from './PrivateRoute';
import Header from './components/Header/Header';
import Homepage from './components/Homepage';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound';
import UserSettings from './components/User/UserSettings';
import UserIDUpload from './components/User/UserIDUpload';

import RequestNew from './components/Request/RequestNew';

class App extends PureComponent {
  componentDidMount() {
    this.props.getTokenFromLSThenAuthenticate();
  }

  render() {
    const { auth } = this.props;

    if (auth.loading) return <Loader active />;

    return (
      <Router>
        <div>
          <Header />
          {auth.error && (
            <Container>
              <Message error>
                <h1>An error occured</h1>Please try again.
              </Message>
            </Container>
          )}
          <Switch>
            {auth.user &&
              !auth.user.identity && (
                <PrivateRoute path="*" component={UserIDUpload} auth={auth} />
              )}
            <Route
              exact
              path="/"
              component={auth.user ? Dashboard : Homepage}
            />
            <PrivateRoute
              path="/settings"
              component={UserSettings}
              auth={auth}
            />
            <PrivateRoute
              path="/requests/new"
              component={RequestNew}
              auth={auth}
            />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, {
  getTokenFromLSThenAuthenticate
})(App);
