import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Grid, Header, Loader, Message } from 'semantic-ui-react';
import { flushRequests, fetchRequest } from '../../actions';

import RequestHelpForm from './RequestHelpForm';

class RequestHelp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      submittedForm: false
    };
  }

  componentDidMount() {
    this.props.fetchRequest(this.props.match.params.id);
  }

  render() {
    const { requests: { success, request }, auth } = this.props;

    // If request has enough volunteers (5) or if the request creator is current user, redirect back
    if (success && request) {
      if (request.volunteers.length >= 5 || request.user_id === auth.user.id) {
        return (
          <Redirect
            to={{
              pathname: `/r/${request.id}`,
              state: { from: this.props.location }
            }}
          />
        );
      }
    }

    return (
      <Grid centered container>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h1" color="green" textAlign="center" className="josefin mt-4 rem-3 mb-4">
              Submit help for a request
            </Header>
            <Message>{success && request ? <RequestHelpForm request={request} /> : <Loader active />}</Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapStateToProps({ requests }) {
  return { requests };
}

export default connect(mapStateToProps, { flushRequests, fetchRequest })(RequestHelp);
