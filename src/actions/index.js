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

      event.start = new Date(event.start);
      event.end = new Date(event.end);

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

export function clearSelectedEvent() {
  return {
    type: 'CLEAR_SELECTED_EVENT',
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

export function setPriceField(value) {
  return {
    type: 'SET_PRICE_FIELD',
    value,
  };
}

export function setDateField(date) {
  return {
    type: 'SET_DATE_FIELD',
    value: date,
  };
}

export function setStartTimeField(time) {
  return {
    type: 'SET_START_TIME_FIELD',
    value: time,
  };
}

export function setEndTimeField(time) {
  return {
    type: 'SET_END_TIME_FIELD',
    value: time,
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

export function setSelectedTab(selectedTab) {
  return {
    type: 'SET_SELECTED_TAB',
    selectedTab,
  }
}

export function getTransactionHistory(jwtString) {
  return async (dispatch) => {
    try {
      const res = await (await fetch('/api/charge', {
        method: 'GET',
        body: JSON.stringify({
          jwtString,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })).json();
      dispatch({
        type: 'SET_TRANSACTION_HISTORY',
        transactions: res,
      });
    } catch (err) {
      console.error(err);
    }
  }
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

