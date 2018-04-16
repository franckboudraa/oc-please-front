import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Button, Form, Header, Comment, Grid } from 'semantic-ui-react';
import RequestMessagesItem from './RequestMessagesItem';

const RequestMessagesList = ({ volunteer }) => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          <Header as="h4">Messages</Header>
          <Comment.Group>
            {volunteer.messages.map(message => <RequestMessagesItem key={message.id} message={message} />)}
            <Form reply>
              <Form.TextArea autoHeight />
              <Button content="Reply" labelPosition="left" icon="reply" color="green" />
            </Form>
          </Comment.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Header as="h4">Actions</Header>

          <Button
            fluid
            size="small"
            content="Accept this helper"
            labelPosition="left"
            icon="checkmark"
            color="green"
            className="my-1"
          />
          <Button
            fluid
            size="small"
            content="Decline"
            labelPosition="left"
            icon="cancel"
            color="red"
            className="my-1"
          />
          <Button
            fluid
            as={Link}
            to={`/u/${volunteer.user_id}/${_.kebabCase(volunteer.user.first_name + '-' + volunteer.user.last_name)}`}
            size="small"
            content="View profile"
            labelPosition="left"
            icon="user"
            primary
            className="my-1"
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RequestMessagesList;
