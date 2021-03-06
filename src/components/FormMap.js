import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import supported from '@mapbox/mapbox-gl-supported';

let Map = null;
if (supported({})) {
  Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    dragPan: false
  });
}

class FormMap extends Component {

  onDragEnd = e => {
    const { passMapCoordinates } = this.props;
    const lng = e.lngLat.lng;
    const lat = e.lngLat.lat;
    passMapCoordinates({ lng, lat });
  };

  render() {
    const { centerLng, centerLat } = this.props;
    return (
      <div style={{height: '100%'}}>
        {Map && <Map style="mapbox://styles/mapbox/streets-v9"
             center={{ lng: centerLng, lat: centerLat }}
             className="formMap"
        >
          <Layer type="circle"
                 id="marker"
                 paint={{
                   'circle-color': '#ff5200',
                   'circle-stroke-width': 1,
                   'circle-stroke-opacity': 1,
                   'circle-radius': 10
                 }}>
            <Feature coordinates={[centerLng, centerLat]} draggable
                     onDragEnd={e => this.onDragEnd(e)}/>
          </Layer>
        </Map>}
      </div>
    );
  }
}

export default FormMap;
