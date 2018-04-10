import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, List, Loader, Message } from 'semantic-ui-react';
import { flushRequests, fetchRequest } from '../../actions';

import RequestHelpForm from './RequestHelpForm';
import StaticMap from '../Map/StaticMap';

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

  redirectBack(id) {
    this.props.history.push({
      pathname: `/r/${id}`,
      state: { from: this.props.location }
    });
  }

  render() {
    const { requests: { success, request }, auth } = this.props;
    console.log(this.props);

    // If request has enough volunteers (5) or if the request creator is current user, redirect back
    if (success && request) {
      if (request.volunteers.length >= 5 || request.status === 'fulfilled' || request.user_id === auth.user.id) {
        return this.redirectBack(request.id);
      }
    }

    return success && request ? (
      <Grid container stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            <div style={{ width: '100%', height: '100%' }}>
              <StaticMap center={{ lat: request.lat, lng: request.lng }} marker={request} zoom={11} />
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h1" color="green" textAlign="center" className="mt-3 rem-3 mb-4">
              Submit help for a request
              <Header sub>Send a message to {request.user.first_name + ' ' + request.user.last_name}</Header>
            </Header>

            <Message>
              <RequestHelpForm request={request} />
            </Message>
            <Button onClick={() => this.redirectBack(request.id)} fluid>
              Back to request summary
            </Button>
          </Grid.Column>
          <Grid.Column width={4} className="mt-3">
            <Message>
              <Message.Header>Reminder</Message.Header>
              <Message.List>
                <Message.Item>Contact the requester by send him a message (300 char. max)</Message.Item>
                <Message.Item>Once you send your help, requester have 24h to accept your help</Message.Item>
                <Message.Item>After the request has been fulfilled, please update it as "Fulfilled"</Message.Item>
                <Message.Item>Never send money to an unknown person</Message.Item>
              </Message.List>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ) : (
      <Loader active />
    );
  }
}

function mapStateToProps({ requests }) {
  return { requests };
}

export default connect(mapStateToProps, { flushRequests, fetchRequest })(RequestHelp);
