import React, { Component } from 'react';
import { Grid, Header, Message } from 'semantic-ui-react';
import RequestNewForm from './RequestNewForm';

class RequestNew extends Component {
  render() {
    return (
      <Grid centered container>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header
              as="h1"
              color="green"
              textAlign="center"
              className="josefin mt-4 rem-3 mb-4"
            >
              Create a request
            </Header>
            <Message>
              <RequestNewForm />
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default RequestNew;
