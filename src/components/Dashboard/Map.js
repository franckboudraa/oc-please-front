import React, { PureComponent, Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { getUserLocation, getUnfulfilledRequests } from '../../actions';
import { Loader } from 'semantic-ui-react';

class AnyReactComponent extends PureComponent {
  render() {
    console.log('render2');
    return <h1>{this.props.text}</h1>;
  }
}

const GMAP_KEY = process.env.REACT_APP_GMAP_KEY;

class Map extends Component {
  componentDidMount() {
    this.props.getUserLocation();
    this.props.getUnfulfilledRequests();
  }

  render() {
    const { center, zoom, error, markers } = this.props.map;
    console.log('render!');
    return !error && center ? (
      <div style={{ height: '95vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GMAP_KEY }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {markers.map(marker => (
            <AnyReactComponent
              lat={marker.lat}
              lng={marker.lng}
              text={marker.title}
              key={marker.id}
            />
          ))}
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
