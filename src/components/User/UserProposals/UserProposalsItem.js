import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Table } from 'semantic-ui-react';

const UserProposalsItem = ({ request }) => {
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
          <Button basic as={Link} to={`/r/${request.id}/volunteers`} color="blue" icon="users" />
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
};

export default UserProposalsItem;
