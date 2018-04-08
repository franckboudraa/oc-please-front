import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions';

import { Container, Header, Loader, Message } from 'semantic-ui-react';

class UserProfile extends PureComponent {
  componentDidMount() {
    this.props.getUserProfile(this.props.match.params.id);
  }

  render() {
    const { success, error, loading, user } = this.props.user;
    return (
      <Container>
        {loading && <Loader active />}
        {error && <Message error>User was not found.</Message>}
        {success &&
          user && (
            <Header as="h1" color="green" className="mt-4 rem-3 mb-4">
              {user.first_name} {user.last_name}
            </Header>
          )}
      </Container>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps, { getUserProfile })(UserProfile);
