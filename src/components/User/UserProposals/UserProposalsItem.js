import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deleteHelpRequest, fulfillRequest } from '../../../actions';
import { Button, Confirm, Header, Icon, Table } from 'semantic-ui-react';

class UserProposalsItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { modalDeleteOpen: false, modalFulfillOpen: false };
  }

  handleDelete = id => {
    this.setState({ modalDeleteOpen: false });
    this.props.deleteHelpRequest(id);
  };

  handleFulfill = request => {
    this.setState({ modalFulfillOpen: false });
    this.props.fulfillRequest(request, 0, 1);
  };

  render() {
    const { request, auth } = this.props;
    const { modalDeleteOpen, modalFulfillOpen } = this.state;

    let volunteerID = 0;
    const volunteers = request.volunteers.filter(volunteer => volunteer.user_id === auth.user.id);
    if (volunteers.length) {
      volunteerID = volunteers[0].id;
    }

    return (
      <Table.Row>
        <Table.Cell>
          <Icon.Group size="big">
            <Icon name="marker" color={request.reqtype === 'task' ? 'purple' : 'pink'} />
            <Icon corner className="marker-text">
              {request.reqtype === 'task' ? 'S' : 'M'}
            </Icon>
          </Icon.Group>
        </Table.Cell>
        <Table.Cell>
          <Header as="h4" image>
            <Header.Content>
              <Link to={`/r/${request.id}/${_.kebabCase(request.title)}`}>{request.title}</Link>
              <Header.Subheader>
                <address>{request.address}</address>
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{_.truncate(request.description)}</Table.Cell>
        <Table.Cell>{request.volunteers.length}</Table.Cell>
        <Table.Cell>{moment(request.created_at).format('LL')}</Table.Cell>
        <Table.Cell className="capitalize">{request.status}</Table.Cell>
        <Table.Cell>
          <Button.Group>
            <Button
              basic
              onClick={() => this.setState({ modalFulfillOpen: true })}
              color="green"
              icon="checkmark"
              disabled={request.status === 'fulfilled'}
            />
            <Button basic as={Link} to={`/r/${volunteerID}/discuss`} color="blue" icon="comment" />
            <Button
              basic
              onClick={() => this.setState({ modalDeleteOpen: true })}
              color="red"
              icon="delete"
              disabled={request.status === 'fulfilled'}
            />
          </Button.Group>
          <Confirm
            open={modalDeleteOpen}
            onCancel={() => this.setState({ modalDeleteOpen: false })}
            onConfirm={() => this.handleDelete(request.id)}
            header="Delete a help request"
            content={`Are you sure you want to delete your help request for "${request.title}" ?`}
          />
          <Confirm
            open={modalFulfillOpen}
            onCancel={() => this.setState({ modalFulfillOpen: false })}
            onConfirm={() => this.handleFulfill(request)}
            header="Fulfill a request"
            content={`Are you sure you want to mark the request "${request.title}" as fulfilled? This is irreversible.`}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default connect(null, { deleteHelpRequest, fulfillRequest })(UserProposalsItem);
