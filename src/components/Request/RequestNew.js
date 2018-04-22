import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { flushRequests } from '../../actions';
import { Grid, Header, Loader, Message } from 'semantic-ui-react';
import RequestNewForm from './RequestNewForm';

class RequestNew extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      submittedForm: false
    };
  }

  componentDidMount() {
    this.props.flushRequests();
  }

  render() {
    const { submittedForm } = this.state;
    const { success, request, flush } = this.props.requests;
    if (submittedForm && success && request.id) {
      return (
        <Redirect
          push
          to={{
            pathname: `/r/${request.id}`,
            state: { from: this.props.location }
          }}
        />
      );
    }
    return (
      <Grid centered container>
        <Grid.Row columns={1}>
          <Grid.Column mobile={16} tablet={12} computer={10} largeScreen={8} widescreen={8}>
            <Header as="h1" color="green" textAlign="center" className="mt-4 rem-3 mb-4">
              Create a request
            </Header>
            <Message>
              {flush ? (
                <RequestNewForm onFormSubmit={() => this.setState({ submittedForm: true })} />
              ) : (
                <Loader active />
              )}
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapStateToProps({ requests }) {
  return { requests };
}

export default connect(mapStateToProps, { flushRequests })(RequestNew);
