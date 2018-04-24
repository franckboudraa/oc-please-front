import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Message, Responsive, Table } from 'semantic-ui-react';
import UserProposalsItem from './UserProposalsItem';

class UserProposalsList extends PureComponent {
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
      <Table basic="very" celled collapsing selectable sortable unstackable>
        <Table.Header>
          <Table.Row>
            <Responsive as={Table.HeaderCell} minWidth={767} />
            <Table.HeaderCell sorted={column === 'title' ? direction : null} onClick={this.handleSort('title')}>
              Title
            </Table.HeaderCell>
            <Responsive as={Table.HeaderCell} {...Responsive.onlyComputer}>
              Description
            </Responsive>
            <Responsive as={Table.HeaderCell} minWidth={767}>
              Helpers
            </Responsive>
            <Responsive
              as={Table.HeaderCell}
              sorted={column === 'created_at' ? direction : null}
              onClick={this.handleSort('created_at')}
              minWidth={767}
            >
              Created at
            </Responsive>
            <Table.HeaderCell sorted={column === 'status' ? direction : null} onClick={this.handleSort('status')}>
              Status
            </Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {requests.map(request => <UserProposalsItem key={request.id} request={request} auth={this.props.auth} />)}
        </Table.Body>
      </Table>
    ) : (
      <Message>
        <Message.Header>Oops</Message.Header>Sorry, it looks like you haven't offered your help yet!<br />
        <Link to="/">Help one!</Link>
      </Message>
    );
  }
}

export default UserProposalsList;
