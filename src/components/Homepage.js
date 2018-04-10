import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getHomeStats } from '../actions';

import { Container, Grid, Header, Statistic } from 'semantic-ui-react';
import RegisterForm from './User/RegisterForm';

class Homepage extends PureComponent {
  componentDidMount() {
    this.props.getHomeStats();

    document.body.style.minHeight = '100%';
    document.body.style.height = '100%';
    document.body.style.background = 'url(/img/bg-home.jpg) center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
  }
  componentWillUnmount() {
    document.body.style.minHeight = null;
    document.body.style.height = null;
    document.body.style.background = null;
    document.body.style.backgroundRepeat = null;
    document.body.style.backgroundSize = null;
  }
  render() {
    const { stats: { requests_fulfilled, requests_unfulfilled, user_count } } = this.props.home;
    return (
      <Container textAlign="center">
        <Header as="h1" className="homepage-jumbotron my-5 light-blur">
          Become the hero of your neighborhood.
        </Header>
        <Grid stackable>
          <Grid.Row centered>
            <Grid.Column width={8}>
              <RegisterForm />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered stretched only="tablet computer" className="mt-5">
            <Grid.Column widths={8}>
              <Statistic.Group inverted widths={3} className="mt-5 light-blur">
                <Statistic>
                  <Statistic.Value>{requests_unfulfilled}</Statistic.Value>
                  <Statistic.Label>Requests in progress</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>{user_count}</Statistic.Value>
                  <Statistic.Label>Members</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>{requests_fulfilled}</Statistic.Value>
                  <Statistic.Label>Requests fulfilled</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps({ home }) {
  return { home };
}

export default connect(mapStateToProps, { getHomeStats })(Homepage);
