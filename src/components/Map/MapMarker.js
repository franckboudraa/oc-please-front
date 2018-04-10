import React, { PureComponent } from 'react';
import _ from 'lodash';
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
          position="top center"
          style={{ backgroundColor: 'rgb(0,0,0,0)', padding: 0, border: 0 }}
          trigger={
            <Link to={`/r/${this.props.id}`}>
              <Icon.Group size="huge">
                <Icon name="marker" color={this.props.reqtype === 'task' ? 'purple' : 'pink'} />
                <Icon corner className="marker-text">
                  {this.props.reqtype === 'task' ? 'S' : 'M'}
                </Icon>
              </Icon.Group>
            </Link>
          }
        >
          <Card raised>
            <Card.Content>
              <Card.Header>{this.props.title}</Card.Header>
              <Card.Meta>{this.props.address}</Card.Meta>
            </Card.Content>
            <Card.Content>
              <Card.Description className="nl2br">
                {_.truncate(this.props.description, { length: 150 })}
              </Card.Description>
            </Card.Content>
            <Card.Content>
              {this.props.reqtype === 'task' ? 'Service request' : 'Material need'}
              <span style={{ float: 'right' }}>{this.props.volunteers.length} helpers</span>
            </Card.Content>
          </Card>
        </Popup>
      </div>
    );
  }
}

export default MapMarker;
