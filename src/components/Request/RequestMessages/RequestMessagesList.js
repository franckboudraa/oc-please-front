import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Button, Confirm, Form, Header, Comment, Grid } from 'semantic-ui-react';
import RequestMessagesItem from './RequestMessagesItem';
import { submitVolunteerMessage, fulfillRequest, declineHelpRequest } from '../../../actions';

class RequestMessagesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        content: ''
      },
      modalDeclineOpen: false,
      modalAcceptOpen: false
    };
  }
  handleDecline = (requestID, volunteerID) => {
    this.setState({ modalDeclineOpen: false });
    this.props.declineHelpRequest(requestID, volunteerID);
  };

  handleAccept = (request, volunteerID) => {
    this.setState({ modalAcceptOpen: false });
    this.props.fulfillRequest(request, volunteerID, 2);
  };

  handleChange = (e, { name, value }) => this.setState({ form: { ...this.state.form, [name]: value } });

  render() {
    const { volunteer, requests: { msg, request } } = this.props;
    const { form, modalAcceptOpen, modalDeclineOpen } = this.state;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Header as="h4">Messages</Header>
            <Comment.Group>
              {volunteer.messages.map(message => <RequestMessagesItem key={message.id} message={message} />)}
              <Form reply loading={msg.loading} onSubmit={() => this.props.submitVolunteerMessage(form, volunteer.id)}>
                <Form.TextArea autoHeight name="content" value={form.content} onChange={this.handleChange} />
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
              disabled={request.status === 'fulfilled'}
              onClick={() => this.setState({ modalAcceptOpen: true })}
            />
            <Button
              fluid
              size="small"
              content="Decline"
              labelPosition="left"
              icon="cancel"
              color="red"
              className="my-1"
              disabled={request.status === 'fulfilled'}
              onClick={() => this.setState({ modalDeclineOpen: true })}
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
        <Confirm
          open={modalDeclineOpen}
          onCancel={() => this.setState({ modalDeclineOpen: false })}
          onConfirm={() => this.handleDecline(request.id, volunteer.id)}
          header="Decline a helper"
          content={`Are you sure you want to decline help request from "${volunteer.user.first_name} ${
            volunteer.user.last_name
          }" ?`}
        />
        <Confirm
          open={modalAcceptOpen}
          onCancel={() => this.setState({ modalAcceptOpen: false })}
          onConfirm={() => this.handleAccept(request, volunteer.id)}
          header="Accept a help request"
          content={`Are you sure you want to accept help request from "${volunteer.user.first_name} ${
            volunteer.user.last_name
          }" ?`}
        />
      </Grid>
    );
  }
}

function mapStateToProps({ requests }) {
  return { requests };
}

export default connect(mapStateToProps, { submitVolunteerMessage, fulfillRequest, declineHelpRequest })(
  RequestMessagesList
);
