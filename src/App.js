import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getTokenFromLSThenAuthenticate } from './actions';

import { Container, Grid, Loader, Message } from 'semantic-ui-react';

import PrivateRoute from './PrivateRoute';
import Header from './components/Header/Header';
import Homepage from './components/Homepage';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound';

import UserSettings from './components/User/UserSettings';
import UserIDUpload from './components/User/UserIDUpload';
import UserRequests from './components/User/UserRequests';
import UserProfile from './components/User/UserProfile';
import UserProposals from './components/User/UserProposals';

import RequestNew from './components/Request/RequestNew';
import RequestShow from './components/Request/RequestShow';
import RequestHelp from './components/Request/RequestHelp';
import RequestVolunteers from './components/Request/RequestVolunteers';
import RequestDiscuss from './components/Request/RequestDiscuss';

class App extends PureComponent {
  componentDidMount() {
    this.props.getTokenFromLSThenAuthenticate();
  }

  render() {
    const { auth } = this.props;

    if (auth.loading) return <Loader active />;

    return (
      <Router>
        <Grid>
          <Grid.Row columns={1} className="pb-0">
            <Grid.Column width={16}>
              <Route path="*" component={props => <Header {...props} auth={auth} />} />
              {auth.error && (
                <Container>
                  <Message error>
                    <h1>An error occured</h1>Please try again.
                  </Message>
                </Container>
              )}
              <Switch>
                {auth.user && !auth.user.identity && <PrivateRoute path="*" component={UserIDUpload} auth={auth} />}
                <Route exact path="/" component={auth.user ? Dashboard : Homepage} />
                <Route path="/u/:id" component={props => <UserProfile {...props} auth={auth} />} />
                <PrivateRoute path="/settings" component={UserSettings} auth={auth} />
                <PrivateRoute path="/requests/new" component={RequestNew} auth={auth} />
                <PrivateRoute path="/r/:id/help" component={RequestHelp} auth={auth} />
                <PrivateRoute path="/r/:id/volunteers" component={RequestVolunteers} auth={auth} />
                <PrivateRoute path="/r/:id/discuss" component={RequestDiscuss} auth={auth} />
                <Route path="/r/:id" component={props => <RequestShow {...props} auth={auth} />} />

                <PrivateRoute path="/me/requests" component={UserRequests} auth={auth} />
                <PrivateRoute path="/me/proposals" component={UserProposals} auth={auth} />

                <Route component={NotFound} />
              </Switch>
              <Route path="*" component={props => <Footer {...props} auth={auth} />} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
