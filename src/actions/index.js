import querystring from 'querystring';

export function initializeEvents() {
  return async (dispatch) => {
    try {
      const now = Date.now();
      const TWENTY_FOUR_HOURS_IN_MILLISECONDS = 86400000;
      const params = {
        start: now,
        end: now + TWENTY_FOUR_HOURS_IN_MILLISECONDS,
      };

      const query = querystring.stringify(params);
      const data = await (await fetch(`/api/events?${query}`)).json();

      dispatch({
        type: 'INITIALIZE_EVENT_DATA',
        data,
      });
    } catch (err) {
      console.log('err', err);
    }
  };
}

export function getEventDetails(eventID) {
  return async (dispatch) => {
    try {
      const event = await (await fetch(`/api/events/${eventID}`)).json();

      dispatch({
        type: 'SET_EVENT_DETAILS',
        event,
      });
    } catch (err) {
      console.log('err', err);
    }
  };
}

export function setSelectedEvent(event) {
  return {
    type: 'SET_SELECTED_EVENT',
    event,
  };
}

export function setUserLocation(position) {
  return {
    type: 'SET_USER_LOCATION',
    position,
  };
}

export function setChargeResponse(result) {
  return {
    type: 'SET_CHARGE_RESPONSE',
    result,
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

export function setUserProfile(userProfile) {
  return {
    type: 'SET_USER_PROFILE',
    userProfile,
  };
}

export function logout() {
  return {
    type: 'CLEAR_USER_PROFILE',
  };
}

export function addNewEvent(event, history) {
  return async (dispatch) => {
    try {
      const res = await (await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
          'Content-Type': 'application/json',
        },
      })).json();
      dispatch({
        type: 'SET_ADD_EVENT_RESPONSE',
        addEventResponse: res,
      });
      history.push(`/event/${res.eventID}`);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
}

