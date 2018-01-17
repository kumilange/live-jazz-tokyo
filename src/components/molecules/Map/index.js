import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

import { DEFAULT_CENTER } from '../../../config/const';
import fancyMapStyles from '../../../resources/fancyMapStyles.json';
import { isObjectEmpty } from '../../../utils';

const Map = withGoogleMap(({ position, children }) => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={DEFAULT_CENTER}
    defaultOptions={{
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      styles: fancyMapStyles,
    }}
    center={isObjectEmpty(position) ? DEFAULT_CENTER : position}
  >
    {children}
  </GoogleMap>),
);

Map.propTypes = {
  position: PropTypes.shape().isRequired,
};

export default Map;
