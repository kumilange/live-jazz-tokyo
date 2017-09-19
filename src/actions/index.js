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
      const params = {
        id: eventID,
      };

      const query = querystring.stringify(params);
      const event = await (await fetch(`/api/eventdetails?${query}`)).json();

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
