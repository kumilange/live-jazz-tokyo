import querystring from 'querystring';
import hello from '../config/hello';
import { INITIALIZE_EVENT_DATA, SET_SELECTED_EVENT, CLEAR_SELECTED_EVENT, SET_USER_LOCATION, SET_CHARGE_RESPONSE, SET_EVENT_NAME_FIELD, SET_ARTIST_FIELD, SET_VENUE_FIELD, SET_ADDRESS_FIELD, SET_PRICE_FIELD, SET_DATE_FIELD, SET_START_TIME_FIELD, SET_END_TIME_FIELD, SET_ADD_EVENT_RESPONSE, SET_SELECTED_TAB, SET_TRANSACTION_HISTORY, SET_EVENT_DETAILS, SET_USER_PROFILE, CLEAR_USER_PROFILE, SET_JWT } from '../config/const';

// Map
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
        type: INITIALIZE_EVENT_DATA,
        data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}
export function setSelectedEvent(event) {
  return {
    type: SET_SELECTED_EVENT,
    event,
  };
}
export function clearSelectedEvent() {
  return {
    type: CLEAR_SELECTED_EVENT,
  };
}
export function setUserLocation(position) {
  return {
    type: SET_USER_LOCATION,
    position,
  };
}

// AddEvent
export function setEventNameField(event) {
  return {
    type: SET_EVENT_NAME_FIELD,
    value: event.target.value,
  };
}
export function setArtistField(event) {
  return {
    type: SET_ARTIST_FIELD,
    value: event.target.value,
  };
}
export function setVenueField(event) {
  return {
    type: SET_VENUE_FIELD,
    value: event.target.value,
  };
}
export function setAddressField(event) {
  return {
    type: SET_ADDRESS_FIELD,
    value: event.target.value,
  };
}
export function setPriceField(value) {
  return {
    type: SET_PRICE_FIELD,
    value,
  };
}
export function setDateField(date) {
  return {
    type: SET_DATE_FIELD,
    value: date,
  };
}
export function setStartTimeField(time) {
  return {
    type: SET_START_TIME_FIELD,
    value: time,
  };
}
export function setEndTimeField(time) {
  return {
    type: SET_END_TIME_FIELD,
    value: time,
  };
}
export function addNewEvent(event, userId, history) {
  return async (dispatch) => {
    try {
      const res = await (await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({ ...event, userId }),
        headers: {
          'Content-Type': 'application/json',
        },
      })).json();

      dispatch({
        type: SET_ADD_EVENT_RESPONSE,
        addEventResponse: res,
      });

      if (res.addSuccess) {
        history.push(`/event/${res.eventID}`);
      } else {
        history.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  };
}

// Event
export function getEventDetails(eventID) {
  return async (dispatch) => {
    try {
      const event = await (await fetch(`/api/events/${eventID}`)).json();

      dispatch({
        type: SET_EVENT_DETAILS,
        event,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

// Pay
export function setChargeResponse(result) {
  return {
    type: SET_CHARGE_RESPONSE,
    result,
  };
}

// User
export function setSelectedTab(selectedTab) {
  return {
    type: SET_SELECTED_TAB,
    selectedTab,
  };
}
export function getTransactionHistory(jwtString) {
  return async (dispatch) => {
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Bearer', jwtString);
      const res = await (await fetch('/api/charge', {
        method: 'GET',
        headers,
      })).json();

      dispatch({
        type: SET_TRANSACTION_HISTORY,
        transactions: res,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

// Header
export function setUserProfile(userProfile) {
  return {
    type: SET_USER_PROFILE,
    userProfile,
  };
}
export function setJWT(jwt) {
  return {
    type: SET_JWT,
    jwt,
  };
}
export function logout() {
  return {
    type: CLEAR_USER_PROFILE,
  };
}
const postJson = async (url, objToPost) => {
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(objToPost),
  };
  const res = await (await fetch(url, options)).json();
  return res;
};
export function addAuthListener() {
  return async (dispatch) => {
    hello.on('auth.login', async (auth) => {
      const res = await postJson('/api/auth', {
        network: 'facebook',
        socialToken: auth.authResponse.access_token,
      });
      if (res.userProfile) {
        dispatch(setUserProfile(res.userProfile));
      }
      if (res.jwt) {
        dispatch(setJWT(res.jwt));
      }
    });
  };
}

