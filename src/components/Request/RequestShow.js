import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

class RequestShow extends Component {
  render() {
    return <Container>{this.props.match.params.id}</Container>;
  }
}

export default RequestShow;
