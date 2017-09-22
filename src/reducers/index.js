const initialState = {
  events: [],
  selectedEvent: {},
  eventDetails: {},
  userLocation: {},
  chargeResponse: undefined,
  addEventResponse: undefined,
  addEventFields: {
    eventName: '',
    artist: '',
    venue: '',
    address: '',
    price: '',
    date: '',
    startTime: '',
    endTime: '',
  },
};

const reducer = (state = initialState, action) => {
  let newState;
  let newAddEventFields;
  switch (action.type) {
    case '@@redux/INIT':
      newState = state;
      break;
    case 'INITIALIZE_EVENT_DATA':
      newState = Object.assign({}, state, { events: action.data });
      break;
    case 'SET_SELECTED_EVENT':
      newState = Object.assign({}, state, { selectedEvent: action.event });
      break;
    case 'SET_EVENT_DETAILS':
      newState = Object.assign({}, state, { eventDetails: action.event });
      break;
    case 'SET_USER_LOCATION':
      newState = Object.assign({}, state, { userLocation: action.position });
      break;
    case 'SET_CHARGE_RESPONSE':
      newState = Object.assign({}, state, { chargeResponse: action.message });
      break;
    case 'SET_EVENT_NAME_FIELD':
      newAddEventFields = Object.assign({}, state.addEventFields, { eventName: action.value });
      newState = Object.assign({}, state, { addEventFields: newAddEventFields });
      break;
    case 'SET_ARTIST_FIELD':
      newAddEventFields = Object.assign({}, state.addEventFields, { artist: action.value });
      newState = Object.assign({}, state, { addEventFields: newAddEventFields });
      break;
    case 'SET_VENUE_FIELD':
      newAddEventFields = Object.assign({}, state.addEventFields, { venue: action.value });
      newState = Object.assign({}, state, { addEventFields: newAddEventFields });
      break;
    case 'SET_ADDRESS_FIELD':
      newAddEventFields = Object.assign({}, state.addEventFields, { address: action.value });
      newState = Object.assign({}, state, { addEventFields: newAddEventFields });
      break;
    case 'SET_DATE_FIELD':
      newAddEventFields = Object.assign({}, state.addEventFields, { date: action.value });
      newState = Object.assign({}, state, { addEventFields: newAddEventFields });
      break;
    case 'SET_PRICE_FIELD':
      newAddEventFields = Object.assign({}, state.addEventFields, { price: action.value });
      newState = Object.assign({}, state, { addEventFields: newAddEventFields });
      break;
    case 'SET_START_TIME_FIELD':
      newAddEventFields = Object.assign({}, state.addEventFields, { startTime: action.value });
      newState = Object.assign({}, state, { addEventFields: newAddEventFields });
      break;
    case 'SET_END_TIME_FIELD':
      newAddEventFields = Object.assign({}, state.addEventFields, { endTime: action.value });
      newState = Object.assign({}, state, { addEventFields: newAddEventFields });
      break;
    case 'SET_ADD_EVENT_RESPONSE':
      newState = Object.assign({}, state, { addEventResponse: action.addEventResponse });
      break;
    default:
      console.log('UNKNOWN ACTION', action.type);
      newState = state;
      break;
  }
  return newState;
};

export default reducer;
