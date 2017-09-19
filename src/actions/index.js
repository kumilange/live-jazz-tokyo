import querystring from 'querystring';

export function initializeEvents() {
  return async dispatch => {
    try {
      const now = Date.now();
      const TWENTY_FOUR_HOURS_IN_MILLISECONDS = 86400000;
      const params = {
        start: now,
        end: now + TWENTY_FOUR_HOURS_IN_MILLISECONDS,
      }

      const query = querystring.stringify(params);
      const data = await (await fetch(`/api/events?${query}`)).json();

      console.log(data);
      return {
        type: 'INITIALIZE_EVENT_DATA',
        data,
      };
    } catch (err) {
      console.log("err", err)
    }
  }
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
