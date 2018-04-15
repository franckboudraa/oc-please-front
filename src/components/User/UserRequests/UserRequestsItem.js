import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deleteRequest } from '../../../actions';
import { Button, Confirm, Header, Icon, Table } from 'semantic-ui-react';

class UserRequestsItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
  }

  handleDelete = id => {
    this.setState({ modalOpen: false });
    this.props.deleteRequest(id);
  };

  render() {
    const { request } = this.props;
    const { modalOpen } = this.state;
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
            <Button basic as={Link} to={`/r/${request.id}/edit`} color="green" icon="checkmark" />
            <Button basic as={Link} to={`/r/${request.id}/helpers`} color="blue" icon="users" />
            <Button basic onClick={() => this.setState({ modalOpen: true })} color="red" icon="delete" />
          </Button.Group>
          <Confirm
            open={modalOpen}
            onCancel={() => this.setState({ modalOpen: false })}
            onConfirm={() => this.handleDelete(request.id)}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default connect(null, { deleteRequest })(UserRequestsItem);
