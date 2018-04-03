import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Popup } from 'semantic-ui-react';

const markerPosition = {
  position: 'absolute',
  width: 45,
  height: 33,
  left: -17,
  top: -45
};

class MapMarker extends PureComponent {
  render() {
    return (
      <div style={markerPosition}>
        <Popup
          wide
          hoverable
          position="top center"
          style={{ backgroundColor: 'rgb(0,0,0,0)', padding: 0, border: 0 }}
          trigger={
            <Icon.Group size="huge">
              <Icon
                name="marker"
                color={this.props.reqtype === 'task' ? 'purple' : 'pink'}
              />
              <Icon corner className="marker-text">
                {this.props.reqtype === 'task' ? 'S' : 'M'}
              </Icon>
            </Icon.Group>
          }
        >
          <Card raised link>
          <Card.Content>
            <Card.Header>{this.props.title}</Card.Header>
            <Card.Meta>{this.props.created_at}</Card.Meta>
            </Card.Content>
            <Card.Content>
            
            <Card.Description>{this.props.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name="user" />
              x helpers
              <Link to={`/r/${this.props.id}/help`} style={{float:'right'}}><Icon name="chevron right" />Help</Link>
            </Card.Content>
          </Card>
        </Popup>
      </div>
    );
  }
}

export default MapMarker;
