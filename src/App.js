import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getTokenFromLSThenAuthenticate } from './actions';

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
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              component={this.props.auth.user ? Dashboard : Homepage}
            />
            <PrivateRoute
              path="/settings"
              component={UserSettings}
              auth={this.props.auth.user}
            />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {
  getTokenFromLSThenAuthenticate
})(App);
