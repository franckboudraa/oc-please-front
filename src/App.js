import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getTokenFromLSThenAuthenticate } from './actions';

import Header from './components/Header/Header';
import Homepage from './components/Homepage';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.getTokenFromLSThenAuthenticate();
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route
            exact
            path="/"
            component={
              this.props.auth.token || this.props.auth.user
                ? Dashboard
                : Homepage
            }
          />
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
