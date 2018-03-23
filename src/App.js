import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { checkAuthFromToken, getTokenThenAuthenticate } from './actions';

import Header from './components/Header/Header';
import Homepage from './components/Homepage';
import Footer from './components/Footer/Footer';

class App extends Component {
  componentDidMount() {
    this.props.getTokenThenAuthenticate();
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Homepage} />
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
  checkAuthFromToken,
  getTokenThenAuthenticate
})(App);
