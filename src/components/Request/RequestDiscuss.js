import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRequest } from '../../actions';

import { Button, Container, Header, Icon, Loader, Message } from 'semantic-ui-react';
import RequestMessages from './RequestMessages/RequestMessages';

class RequestDiscuss extends PureComponent {
  componentDidMount() {
    this.props.fetchRequest(this.props.match.params.id);
  }

  render() {
    const { loading, error, error_message, success, request } = this.props.requests;
    console.log(this.props);
    return (
      <Container>
        <Header as="h1" color="green" textAlign="center" className="mt-4 rem-3 mb-4">
          Discuss
          <Header.Subheader>{request && request.title}</Header.Subheader>
        </Header>
        <Button as={Link} to="/me/proposals" className="mb-3">
          <Icon name="arrow left" /> Back to my proposals
        </Button>
        {loading && <Loader active />}
        {error && (
          <Message error>
            <Message.Header>Oops!</Message.Header>
            {error_message}
          </Message>
        )}
        {success && request && <RequestMessages volunteers={request.volunteers} />}
      </Container>
    );
  }
}

function mapStateToProps({ requests }) {
  return { requests };
}

export default connect(mapStateToProps, { fetchRequest })(RequestDiscuss);
