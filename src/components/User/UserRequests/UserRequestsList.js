import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Message, Table } from 'semantic-ui-react';
import UserRequestsItem from './UserRequestsItem';

class UserRequestsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      direction: null
    };
  }

  handleSort = clickedColumn => () => {
    const { column, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        direction: 'ascending'
      });

      _.sortBy(this.props.requests, [clickedColumn]);

      return;
    }

    this.setState({
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });
    this.props.requests.reverse();
  };

  render() {
    const { requests } = this.props;
    const { column, direction } = this.state;
    return requests.length ? (
      <Table basic="very" celled collapsing selectable sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell sorted={column === 'title' ? direction : null} onClick={this.handleSort('title')}>
              Title
            </Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Helpers</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'created_at' ? direction : null}
              onClick={this.handleSort('created_at')}
            >
              Created at
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'status' ? direction : null} onClick={this.handleSort('status')}>
              Status
            </Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{requests.map(request => <UserRequestsItem key={request.id} request={request} />)}</Table.Body>
      </Table>
    ) : (
      <Message>
        <Message.Header>Oops</Message.Header>Sorry, it appears like you don't have created any request yet!<br />
        <Link to="/requests/new">Create one!</Link>
      </Message>
    );
  }
}

export default UserRequestsList;
