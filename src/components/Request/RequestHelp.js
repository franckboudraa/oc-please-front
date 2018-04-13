import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Loader, Message } from 'semantic-ui-react';
import { flushRequests, fetchRequest, submitHelpRequest } from '../../actions';

import RequestHelpForm from './RequestHelpForm';
import StaticMap from '../Map/StaticMap';

class RequestHelp extends PureComponent {
  componentDidMount() {
    this.props.flushRequests();
    this.props.fetchRequest(this.props.match.params.id);
  }

  redirectTo(pathname) {
    this.props.history.push({
      pathname,
      state: { from: this.props.location }
    });
    return null;
  }

  render() {
    const { requests: { success, request, submitHelp }, auth } = this.props;

    submitHelp && this.redirectTo('/me/requests');

    // If request has enough volunteers (5) or request is fulfilled or request creator is current user, or user is already a volunteer, redirect back
    if (success && request) {
      const isAlreadyVolunteer = request.volunteers.filter(volunteer => volunteer.user_id === auth.user.id).length;
      if (
        request.volunteers.length >= 5 ||
        request.status === 'fulfilled' ||
        request.user_id === auth.user.id ||
        isAlreadyVolunteer
      ) {
        return this.redirectTo(`/r/${request.id}`);
      } else {
        return (
          <div>
            <div style={{ width: '100%', height: '13rem' }}>
              <StaticMap center={{ lat: request.lat, lng: request.lng }} marker={request} zoom={15} />
            </div>
            <Grid container stackable>
              <Grid.Row>
                <Grid.Column width={4}>&nbsp;</Grid.Column>
                <Grid.Column width={8}>
                  <Header as="h1" color="green" textAlign="center" className="mt-4 rem-3 mb-4">
                    Submit help for a request
                    <Header sub>
                      {request.title}
                      <br />
                      {request.address}
                    </Header>
                  </Header>

                  <Message>
                    Send a message to {request.user.first_name + ' ' + request.user.last_name}
                    <RequestHelpForm
                      request={request}
                      submitHelpRequest={message => this.props.submitHelpRequest(request.id, message)}
                    />
                  </Message>

                  <Button onClick={() => this.redirectTo(`/r/${request.id}`)} fluid>
                    Back to request summary
                  </Button>
                </Grid.Column>
                <Grid.Column width={4} className="mt-4">
                  <Message>
                    <Message.Header>Reminder</Message.Header>
                    <Message.List>
                      <Message.Item>Contact the requester by sending him a message (300 char. max)</Message.Item>
                      <Message.Item>Once you send your help, requester have 24h to accept your help</Message.Item>
                      <Message.Item>After the request has been fulfilled, please update it as "Fulfilled"</Message.Item>
                      <Message.Item>Never send money to an unknown person</Message.Item>
                    </Message.List>
                  </Message>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        );
      }
    } else {
      return <Loader active />;
    }
  }
}

function mapStateToProps({ requests }) {
  return { requests };
}

export default connect(mapStateToProps, { flushRequests, fetchRequest, submitHelpRequest })(RequestHelp);
