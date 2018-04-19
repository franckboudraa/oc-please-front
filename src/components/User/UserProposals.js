import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchUserProposals, flushRequests } from '../../actions';

import { Container, Header, Loader } from 'semantic-ui-react';

import UserProposalsList from './UserProposals/UserProposalsList';

class UserProposals extends PureComponent {
  componentDidMount() {
    this.props.fetchUserProposals(this.props.auth.user.id);
  }

  render() {
    const { success, requests } = this.props.requests;
    return (
      <Container>
        <Header as="h1" color="green" textAlign="center" className="mt-4 rem-3 mb-4">
          My proposals
        </Header>
        {success && requests ? <UserProposalsList requests={requests} /> : <Loader active />}
      </Container>
    );
  }
}

function mapStateToProps({ requests }) {
  return { requests };
}

export default connect(mapStateToProps, { fetchUserProposals, flushRequests })(UserProposals);
