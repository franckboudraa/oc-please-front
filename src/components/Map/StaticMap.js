import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Loader } from 'semantic-ui-react';
import MapMarker from './MapMarker';

const GMAP_KEY = process.env.REACT_APP_GMAP_KEY;

const StaticMap = props => {
  const { center, zoom, marker } = props;
  return center && zoom ? (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GMAP_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <MapMarker {...marker} key={marker.id} />
      </GoogleMapReact>
    </div>
  ) : (
    <Loader active />
  );
};

export default StaticMap;
