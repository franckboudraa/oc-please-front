import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchUserRequests, flushRequests } from '../../actions';

import { Container, Header, Loader } from 'semantic-ui-react';

import UserRequestsList from './UserRequests/UserRequestsList';

class UserRequests extends PureComponent {
  componentDidMount() {
    this.props.fetchUserRequests(this.props.auth.user.id);
  }

  render() {
    const { success, requests } = this.props.requests;
    return (
      <Container>
        <Header as="h1" color="green" textAlign="center" className="josefin mt-4 rem-3 mb-4">
          My requests
        </Header>
        {success && requests ? <UserRequestsList requests={requests} /> : <Loader active />}
      </Container>
    );
  }
}

function mapStateToProps({ requests }) {
  return { requests };
}

export default connect(mapStateToProps, { fetchUserRequests, flushRequests })(UserRequests);
