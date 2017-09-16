import React, { Component } from 'react';
import { InfoWindow, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PropTypes from 'prop-types';

class MyMarker extends Component {
  state = {
    isOpen: false
  }

  render() {
    const position = {
      lat: this.props.marker.lat,
      lng: this.props.marker.lng,
    };
    
    return <Marker
      id='marker'
      position={position}
      key={String(position.lat) + String(position.lng)}
      title={this.props.marker.event}
      onClick={ () => {
        if(!this.state.isOpen) {
          this.setState({
            isOpen: true
          });
        }
      }}
    >
      { this.state.isOpen &&
        <InfoWindow
          ref={ node => this.infoWindowRef = node }
          onCloseClick={ () => {
            this.setState({
              isOpen: false
            });
        }} >
          <div>
            TEST
          </div>
        </InfoWindow>
      }
    </Marker>
  }
}

const MyMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 35.6857933, lng: 139.7501793 }}
  >
    { props.markers.map( (marker) => <MyMarker marker={ marker } /> ) }
  </GoogleMap>
));

class Map extends Component {
  render() {
    console.log('MAP');
    return process.env.npm_lifecycle_event === 'test' ? <div /> : <MyMap
      markers={this.props.markers}
      className="test"
      containerElement={
        <div style={{ height: '100%' }} />
      }
      mapElement={
        <div style={{ height: '100%' }} />
      }
    />;
  }
}

Map.propTypes = {
  markers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Map;
