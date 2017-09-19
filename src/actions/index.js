import data from '../data/events.json';

export function initializeEvents() {
  // fetch /api/events?(time range), frontend requests 24h by default

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
