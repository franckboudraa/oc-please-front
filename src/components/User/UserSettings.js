import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const UserSettings = props => {
  console.log(props);
  return (
    <Container>
      <Header as="h1" color="green" textAlign="center" className="mt-4 rem-3 mb-4">
        My settings
      </Header>
      <h3>My ID:</h3>
      <a href={props.auth.user.identity} target="_blank" rel="noopener noreferrer">
        {props.auth.user.identity}
      </a>
    </Container>
  );
};

export default UserSettings;
