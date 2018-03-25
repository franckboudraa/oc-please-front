import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { getUserLocation } from '../../actions';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GMAP_KEY = process.env.REACT_APP_GMAP_KEY;

class Map extends Component {
  componentDidMount() {
    this.props.getUserLocation();
  }

  render() {
    const { map } = this.props;
    return map.center ? (
      <div style={{ height: '95vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GMAP_KEY }}
          defaultCenter={map.center}
          defaultZoom={map.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    ) : (
      'Loading'
    );
  }
}

function mapStateToProps({ map }) {
  return { map };
}

export default connect(mapStateToProps, { getUserLocation })(Map);
