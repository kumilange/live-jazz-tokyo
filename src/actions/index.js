import querystring from 'querystring';
import hello from '../config/hello';
import { INITIALIZE_EVENT_DATA, SET_SELECTED_EVENT, CLEAR_SELECTED_EVENT, SET_USER_LOCATION, SET_CHARGE_RESPONSE, SET_ADD_EVENT_RESPONSE, SET_SELECTED_TAB, SET_ORDER_HISTORY, FETCH_EVENT_DETAILS, FETCH_EVENT_DETAILS_SUCCESS, FETCH_EVENT_DETAILS_FAILURE, SHOW_MAP, SET_USER_PROFILE, CLEAR_USER_PROFILE, SET_JWT } from '../config/const';

// Top
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
        history.push(`/event/${res.eventId}`);
      } else {
        history.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  };
}

// Event
export function getEventDetails(eventId) {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_EVENT_DETAILS,
      });
      const event = await (await fetch(`/api/events/${eventId}`)).json();

      dispatch({
        type: FETCH_EVENT_DETAILS_SUCCESS,
        event,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: FETCH_EVENT_DETAILS_FAILURE,
      });
    }
  };
}
export function toggleMap() {
  return { type: SHOW_MAP };
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
export function getOrderHistory(jwtString) {
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
        type: SET_ORDER_HISTORY,
        orders: res,
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
  hello.logout('facebook');
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

