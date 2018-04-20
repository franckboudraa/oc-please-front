import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchVolunteersForRequest } from '../../actions';

import { Button, Container, Header, Icon, Loader, Message } from 'semantic-ui-react';
import RequestMessages from './RequestMessages/RequestMessages';

class RequestVolunteers extends PureComponent {
  componentDidMount() {
    this.props.fetchVolunteersForRequest(this.props.match.params.id);
  }

  render() {
    const { loading, error, error_message, success, request } = this.props.requests;

    return (
      <Container>
        <Header as="h1" color="green" textAlign="center" className="mt-4 rem-3 mb-4">
          Volunteers
          <Header.Subheader>{request && request.title}</Header.Subheader>
        </Header>
        <Button as={Link} to="/me/requests" className="mb-3">
          <Icon name="arrow left" /> Back to my requests
        </Button>
        {loading && <Loader active />}
        {error && (
          <Message error>
            <Message.Header>Oops!</Message.Header>
            {error_message}
          </Message>
        )}
        {success && request && <RequestMessages volunteers={request.volunteers} auth={this.props.auth} />}
      </Container>
    );
  }
}

function mapStateToProps({ requests, auth }) {
  return { requests, auth };
}

export default connect(mapStateToProps, { fetchVolunteersForRequest })(RequestVolunteers);
