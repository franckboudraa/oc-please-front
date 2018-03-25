import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getTokenFromLSThenAuthenticate } from './actions';

import { Loader } from 'semantic-ui-react';

import PrivateRoute from './PrivateRoute';
import Header from './components/Header/Header';
import Homepage from './components/Homepage';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound';
import UserSettings from './components/User/UserSettings';

class App extends Component {
  componentDidMount() {
    this.props.getTokenFromLSThenAuthenticate();
  }

  render() {
    const { auth } = this.props;
    return auth.loading ? (
      <Loader active />
    ) : (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              component={auth.user ? Dashboard : Homepage}
            />
            <PrivateRoute
              path="/settings"
              component={UserSettings}
              auth={auth.user}
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
