import data from '../data/events.json';

export function initializeEvents() {
  return {
    type: 'INITIALIZE_EVENT_DATA',
    data,
  };
}

export function setSelectedEvent(event) {
  return {
    type: 'SET_SELECTED_EVENT',
    event,
  };
}

export function setEventDetails(event) {
  return {
    type: 'SET_EVENT_DETAILS',
    event,
  };
}

export function setUserLocation(position) {
  return {
    type: 'SET_USER_LOCATION',
    position,
  };
}

export function setChargeResponse(message) {
  return {
    type: 'SET_CHARGE_RESPONSE',
    message,
  };
}
