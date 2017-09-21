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

export function setEventNameField(event) {
  return {
    type: 'SET_EVENT_NAME_FIELD',
    value: event.target.value,
  };
}

export function setArtistField(event) {
  return {
    type: 'SET_ARTIST_FIELD',
    value: event.target.value,
  };
}

export function setVenueField(event) {
  return {
    type: 'SET_VENUE_FIELD',
    value: event.target.value,
  };
}

export function setAddressField(event) {
  return {
    type: 'SET_ADDRESS_FIELD',
    value: event.target.value,
  };
}

export function setPriceField(event) {
  return {
    type: 'SET_PRICE_FIELD',
    value: event.target.value,
  };
}

export function setStartTimeField(event) {
  return {
    type: 'SET_START_TIME_FIELD',
    value: event.target.value,
  };
}

export function setEndTimeField(event) {
  return {
    type: 'SET_END_TIME_FIELD',
    value: event.target.value,
  };
}

export function addNewEvent(event) {
  return async (dispatch) => {
    try {
      const res = await (await fetch('/api/addevent', {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
          'Content-Type': 'application/json',
        },
      })).json();
      dispatch({
        type: 'SET_ADD_EVENT_RESPONSE',
        addEventResponse: res.result,
      });
    } catch (err) {
      console.error(err);
    }
  };
}
