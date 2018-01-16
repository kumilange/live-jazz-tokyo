import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

import { DEFAULT_CENTER } from '../../../config/const';
import fancyMapStyles from '../../../resources/fancyMapStyles.json';

const MyMap = withGoogleMap(({ position, children }) => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={DEFAULT_CENTER}
    defaultOptions={{
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      styles: fancyMapStyles,
    }}
    center={position.lat === undefined ? DEFAULT_CENTER : position}
  >
    {children}
  </GoogleMap>),
);

MyMap.propTypes = {
  position: PropTypes.shape().isRequired,
};

export default MyMap;
