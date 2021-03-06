import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { getUserLocation, getUnfulfilledRequests } from '../../actions';
import { Loader } from 'semantic-ui-react';

import MapMarker from './MapMarker';

const GMAP_KEY = process.env.REACT_APP_GMAP_KEY;

class Map extends PureComponent {
  componentDidMount() {
    // On mounting, get user coords to center the map
    this.props.getUserLocation();
  }

  onBoundsChange = ({ bounds: { sw, ne } }) => {
    // Load the requests unfulfilled within a square bounding box from map bounds
    this.props.getUnfulfilledRequests({ sw, ne });
  };

  render() {
    const { center, zoom, error, markers } = this.props.map;
    return !error && center ? (
      <div style={{ height: '93vh', width: '100vw' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GMAP_KEY }}
          defaultCenter={center}
          defaultZoom={zoom}
          onChange={this.onBoundsChange}
        >
          {markers.map(marker => marker.volunteers.length < 5 && <MapMarker {...marker} key={marker.id} />)}
        </GoogleMapReact>
      </div>
    ) : (
      <Loader active />
    );
  }
}

function mapStateToProps({ map }) {
  return { map };
}

export default connect(mapStateToProps, {
  getUserLocation,
  getUnfulfilledRequests
})(Map);
