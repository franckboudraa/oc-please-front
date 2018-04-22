import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deleteRequest, resetRequest } from '../../../actions';
import { Button, Confirm, Header, Icon, Responsive, Table } from 'semantic-ui-react';

class UserRequestsItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { modalDeleteOpen: false, modalResetOpen: false };
  }

  handleDelete = id => {
    this.setState({ modalDeleteOpen: false });
    this.props.deleteRequest(id);
  };

  handleReset = requestID => {
    this.setState({ modalResetOpen: false });
    this.props.resetRequest(requestID);
  };

  render() {
    const { request } = this.props;
    const { modalDeleteOpen, modalResetOpen } = this.state;

    let lastVolunteerInHours = 0;

    if (request.volunteers.length) {
      const lastVolunteer = moment(request.volunteers[request.volunteers.length - 1].created_at);
      const now = moment();
      lastVolunteerInHours = now.diff(lastVolunteer, 'hours');
    }

    return (
      <Table.Row>
        <Responsive as={Table.Cell} minWidth={767}>
          <Icon.Group size="big">
            <Icon name="marker" color={request.reqtype === 'task' ? 'purple' : 'pink'} />
            <Icon corner className="marker-text">
              {request.reqtype === 'task' ? 'S' : 'M'}
            </Icon>
          </Icon.Group>
        </Responsive>
        <Table.Cell>
          <Header as="h4" image>
            <Header.Content>
              <Link to={`/r/${request.id}/${_.kebabCase(request.title)}`}>{request.title}</Link>
              <Responsive as={Header.Subheader} {...Responsive.onlyComputer}>
                <address>{request.address}</address>
              </Responsive>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Responsive as={Table.Cell} {...Responsive.onlyComputer}>
          {_.truncate(request.description)}
        </Responsive>
        <Responsive as={Table.Cell} minWidth={767}>
          {request.volunteers.length}
        </Responsive>
        <Responsive as={Table.Cell} minWidth={767}>
          {moment(request.created_at).format('LL')}
        </Responsive>
        <Table.Cell className="capitalize">{request.status}</Table.Cell>
        <Table.Cell>
          <Button.Group>
            <Button
              basic
              onClick={() => this.setState({ modalResetOpen: true })}
              color="green"
              icon="refresh"
              disabled={!(request.volunteers.length === 5 && lastVolunteerInHours > 24)}
            />
            <Button
              basic
              as={Link}
              to={`/r/${request.id}/volunteers`}
              color="blue"
              icon="users"
              disabled={!request.volunteers.length}
            />
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
            header="Delete a request"
            content={`Are you sure you want to delete your request "${request.title}" ?`}
          />
          <Confirm
            open={modalResetOpen}
            onCancel={() => this.setState({ modalResetOpen: false })}
            onConfirm={() => this.handleReset(request.id)}
            header="Republish a request"
            content={`Are you sure you want to republish your request for "${request.title}" ?`}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default connect(null, { deleteRequest, resetRequest })(UserRequestsItem);
