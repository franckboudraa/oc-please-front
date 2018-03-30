import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRequest } from '../../actions';

import { Container, Loader, Message } from 'semantic-ui-react';

class RequestShow extends Component {
  componentDidMount() {
    this.props.fetchRequest(this.props.match.params.id);
  }

  render() {
    const {
      success,
      error,
      loading,
      error_message,
      request
    } = this.props.requests;
    return (
      <Container>
        {loading && <Loader active />}
        {error && <Message error>{error_message}</Message>}
        {success && <Container>{request.title}</Container>}
      </Container>
    );
  }
}

function mapStateToProps({ requests }) {
  return { requests };
}

export default connect(mapStateToProps, { fetchRequest })(RequestShow);
