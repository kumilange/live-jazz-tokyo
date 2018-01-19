import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

export const CalendarIcon = props =>
  (<SvgIcon {...props}>
    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgIcon>);

export const ClockIcon = props =>
  (<SvgIcon {...props}>
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </SvgIcon>);

export const YenIcon = props =>
  (<SvgIcon {...props}>
    <path d="M12.011,20v-3.619H8.752v-1.313h3.259v-1.444H8.752v-1.313h2.611L7.895,6h2.779l1.755,3.899 c0.376,0.797,0.606,1.464,0.877,2.153h0.042c0.25-0.646,0.522-1.4,0.877-2.197L16.043,6h2.717l-3.656,6.311h2.59v1.313h-3.28v1.444 h3.28v1.313h-3.28V20H12.011z" />
  </SvgIcon>);

export const PinIcon = props =>
  (<SvgIcon {...props}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </SvgIcon>);

export const UserIcon = props =>
  (<SvgIcon {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgIcon>);

export const CheckIcon = props =>
  (<SvgIcon {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#36BC54" />
  </SvgIcon>);

export const MarkerIcon = (isReserved) => {
  const color = isReserved ? 'rgb(218, 165, 32)' : 'beige';
  return {
    path: 'M256,0C139.563,0,45.172,94.406,45.172,210.828S210.875,512,256,512c45.109,0,210.828-184.75,210.828-301.172S372.438,0,256,0z M256,307.594c-53.453,0-96.766-43.328-96.766-96.766c0-53.453,43.313-96.766,96.766-96.766c53.438,0,96.766,43.313,96.766,96.766C352.766,264.266,309.438,307.594,256,307.594z',
    anchor: { x: 0, y: 0 },
    fillColor: color,
    fillOpacity: 1.0,
    scale: 0.06,
  };
};

export const UserLocationIcon = {
  path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
  anchor: { x: 0, y: 0 },
  fillColor: '#daa520',
  fillOpacity: 1.0,
  scale: 0.5,
};

export const SignoutIcon = (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="25" height="16" viewBox="0 0 32 32">
    <path d="M24 20v-4h-10v-4h10v-4l6 6zM22 18v8h-10v6l-12-6v-26h22v10h-2v-8h-16l8 4v18h8v-6z" fill="#000000" />
  </svg>);

export const FacebookIcon = (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
    <path d="M14.5 0h-13c-0.825 0-1.5 0.675-1.5 1.5v13c0 0.825 0.675 1.5 1.5 1.5h6.5v-7h-2v-2h2v-1c0-1.653 1.347-3 3-3h2v2h-2c-0.55 0-1 0.45-1 1v1h3l-0.5 2h-2.5v7h4.5c0.825 0 1.5-0.675 1.5-1.5v-13c0-0.825-0.675-1.5-1.5-1.5z" fill="beige" />
  </svg>);

export const svgIconSizeL = { width: '25px', height: '20px' };
export const svgIconSize = { width: '25px', height: '16px' };
