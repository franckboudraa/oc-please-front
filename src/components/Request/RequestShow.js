import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fetchRequest } from '../../actions';

import {
  Button,
  Grid,
  Header,
  Loader,
  Message,
  Statistic
} from 'semantic-ui-react';
import StaticMap from '../Map/StaticMap';

class RequestShow extends Component {
  componentDidMount() {
    this.props.fetchRequest(this.props.match.params.id);
  }

  render() {
    const {
      success,
      error,
      loading,
      error_message,
      request
    } = this.props.requests;
    return (
      <div>
        {loading && <Loader active />}
        {error && <Message error>{error_message}</Message>}
        {success && request.user ? (
          <div>
            <div style={{ width: '100%', height: '300px' }}>
              <StaticMap
                center={{ lat: request.lat, lng: request.lng }}
                marker={request}
                zoom={16}
              />
            </div>
            <Grid container className="mt-3" divided>
              <Grid.Row columns={2}>
                <Grid.Column width={12}>
                  <Header as="h1" className="josefin">
                    {request.title}
                    <Header.Subheader>{request.address}</Header.Subheader>
                  </Header>
                  <Message>
                    <Message.Header>Description</Message.Header>
                    <p>{request.description}</p>
                  </Message>
                </Grid.Column>
                <Grid.Column width={4} textAlign="center">
                  <Button color="green" fluid>
                    Submit help
                  </Button>
                  <p className="mt-3">
                    Requested by
                    <Link to={`/user/${request.user_id}`}>
                      {` ${request.user.first_name} ${request.user.last_name}`}
                    </Link>
                  </p>
                  <p>{moment(request.created_at).format('LLL')}</p>
                  <Statistic>
                    <Statistic.Value>0</Statistic.Value>
                    <Statistic.Label>Helper</Statistic.Label>
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
