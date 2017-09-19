const initialState = {
  events: [],
  selectedEvent: {},
  eventDetails: {},
  userLocation: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case '@@redux/INIT':
      return state;
    case 'INITIALIZE_EVENT_DATA':
      return Object.assign({}, state, { events: action.data });
    case 'SET_SELECTED_EVENT':
      return Object.assign({}, state, { selectedEvent: action.event });
    case 'SET_EVENT_DETAILS':
      return Object.assign({}, state, { eventDetails: action.event });
    case 'SET_USER_LOCATION':
      return Object.assign({}, state, { userLocation: action.position });
    default:
      console.log('UNKNOWN STATE!');
      return state;
  }
};

export default reducer;
