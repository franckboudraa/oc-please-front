import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fetchRequest } from '../../actions';

import { Button, Grid, Header, Loader, Message, Statistic } from 'semantic-ui-react';

import StaticMap from '../Map/StaticMap';

class RequestShow extends PureComponent {
  componentDidMount() {
    this.props.fetchRequest(this.props.match.params.id);
  }

  render() {
    const { success, error, loading, error_message, request } = this.props.requests;
    const { auth } = this.props;
    let isAlreadyVolunteer = false;

    if (success && request) {
      isAlreadyVolunteer = request.volunteers.filter(volunteer => volunteer.user_id === auth.user.id).length;
    }

    return (
      <div>
        {loading && <Loader active />}
        {error && <Message error>{error_message}</Message>}
        {success && request && request.user ? (
          <div>
            <div style={{ width: '100%', height: '300px' }}>
              <StaticMap center={{ lat: request.lat, lng: request.lng }} marker={request} zoom={12} />
            </div>
            <Grid container className="mt-3" divided>
              <Grid.Row columns={2}>
                <Grid.Column width={12}>
                  <Header as="h1">
                    {request.title}
                    <Header.Subheader>{request.address}</Header.Subheader>
                    <Header.Subheader style={{ float: 'right' }}>
                      {moment(request.created_at).format('LLL')}
                    </Header.Subheader>
                  </Header>
                  <Message className="mt-4">
                    <Message.Header className="f1em">Description</Message.Header>
                    <p className="nl2br f15em">{request.description}</p>
                  </Message>
                  <Message className="mt-4">
                    <Message.Header className="f1em">Helpers</Message.Header>
                    <p className="nl2br f15em">{request.volunteers.length ? 'Volunteers' : 'No helpers yet!'}</p>
                  </Message>
                </Grid.Column>
                <Grid.Column width={4} textAlign="center">
                  {request.status === 'fulfilled' ? (
                    <Button disabled fluid>
                      Fulfilled request
                    </Button>
                  ) : (
                    <Button
                      color="green"
                      className={
                        !auth.user || (auth.user && request.user_id === auth.user.id) || isAlreadyVolunteer
                          ? 'disabled'
                          : ''
                      }
                      fluid
                      to={`/r/${request.id}/help`}
                      as={Link}
                    >
                      {!auth.user ? 'Login to submit help' : 'Submit help'}
                    </Button>
                  )}

                  <Message>
                    <Message.Header className="f1em">
                      {request.reqtype === 'task' ? 'Service requested' : 'Material needed'} by
                    </Message.Header>
                    <Link to={`/user/${request.user_id}`}>
                      {request.user.first_name} {request.user.last_name}
                    </Link>
                  </Message>

                  <Statistic>
                    <Statistic.Value>{request.volunteers.length}</Statistic.Value>
                    <Statistic.Label>Helper{request.volunteers.length > 1 && 's'}</Statistic.Label>
                  </Statistic>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        ) : (
          <Loader active />
        )}
      </div>
    );
  }
}

function mapStateToProps({ requests }) {
  return { requests };
}

export default connect(mapStateToProps, { fetchRequest })(RequestShow);
