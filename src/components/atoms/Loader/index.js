import React from 'react';
import { RefreshIndicator } from 'material-ui';

const loaderStyle = {
  container: {
    position: 'fixed',
    marginLeft: '-100px',
    marginTop: '-25px',
    left: '50%',
    top: '50%',
  },
};

const Loader = () => (
  <div style={loaderStyle.container}>
    <RefreshIndicator
      size={50}
      left={70}
      top={0}
      loadingColor="#FF9800"
      status="loading"
    />
  </div>
);

export default Loader;
