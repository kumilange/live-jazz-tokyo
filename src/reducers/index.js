import { INITIALIZE_EVENT_DATA, SET_SELECTED_EVENT, CLEAR_SELECTED_EVENT, SET_USER_LOCATION, SET_CHARGE_RESPONSE, SET_EVENT_NAME_FIELD, SET_ARTIST_FIELD, SET_VENUE_FIELD, SET_ADDRESS_FIELD, SET_PRICE_FIELD, SET_DATE_FIELD, SET_START_TIME_FIELD, SET_END_TIME_FIELD, SET_ADD_EVENT_RESPONSE, SET_SELECTED_TAB, SET_TRANSACTION_HISTORY, SET_EVENT_DETAILS, SET_USER_PROFILE, CLEAR_USER_PROFILE, SET_JWT, SHOW_MAP, SET_CREDIT_CARD_ERROR, SET_NAME_ERROR_TEXT, SET_ADDRESS_ERROR_TEXT, SET_EMAIL_ERROR_TEXT } from '../config/const';

const initialState = {
  events: [],
  selectedEvent: {},
  eventDetails: undefined,
  showMap: false,
  userLocation: {},
  chargeResponse: undefined,
  addEventResponse: undefined,
  userProfile: undefined,
  jwt: undefined,
  transactionHistory: [],
  addEventFields: {
    eventName: '',
    artistName: '',
    venueName: '',
    address: '',
    price: '',
    date: '',
    start: '',
    end: '',
  },
  selectedTab: 'profile',
  creditCardError: false,
  nameErrorText: '',
  addressErrorText: '',
  emailErrorText: '',
};

const reducer = (state = initialState, action) => {
  let newState;
  let newAddEventFields;
  switch (action.type) {
    case '@@redux/INIT':
      newState = state;
      break;
    case INITIALIZE_EVENT_DATA:
      newState = Object.assign({}, state, { events: action.data });
      break;
    case SET_SELECTED_EVENT:
      newState = Object.assign({}, state, { selectedEvent: action.event });
      break;
    case CLEAR_SELECTED_EVENT:
      newState = Object.assign({}, state, { selectedEvent: {} });
      break;
    case SET_EVENT_DETAILS:
      newState = Object.assign({}, state, { eventDetails: action.event });
      break;
    case SET_USER_LOCATION:
      newState = Object.assign({}, state, { userLocation: action.position });
      break;
    case SET_CHARGE_RESPONSE:
      newState = Object.assign({}, state, { chargeResponse: action.chargeResponse });
      break;
    case SET_EVENT_NAME_FIELD:
      newAddEventFields = Object.assign({}, state.addEventFields, { eventName: action.value });
      newState = Object.assign({}, state, { addEventFields: newAddEventFields });
      break;
    case SET_ARTIST_FIELD:
      newAddEventFields = Object.assign({}, state.addEventFields, { artistName: action.value });
      newState = Object.assign({}, state, { addEventFields: newAddEventFields });
      break;
    case SET_VENUE_FIELD:
      newAddEventFields = Object.assign({}, state.addEventFields, { venueName: action.value });
      newState = Object.assign({}, state, { addEventFields: newAddEventFields });
      break;
    case SET_ADDRESS_FIELD:
      newAddEventFields = Object.assign({}, state.addEventFields, { address: action.value });
      newState = Object.assign({}, state, { addEventFields: newAddEventFields });
      break;
    case SET_DATE_FIELD:
      newAddEventFields = Object.assign({}, state.addEventFields, { date: action.value });
      newState = Object.assign({}, state, { addEventFields: newAddEventFields });
      break;
    case SET_PRICE_FIELD:
      newAddEventFields = Object.assign({}, state.addEventFields, { price: action.value });
      newState = Object.assign({}, state, { addEventFields: newAddEventFields });
      break;
    case SET_START_TIME_FIELD:
      newAddEventFields = Object.assign({}, state.addEventFields, { start: action.value });
      newState = Object.assign({}, state, { addEventFields: newAddEventFields });
      break;
    case SET_END_TIME_FIELD:
      newAddEventFields = Object.assign({}, state.addEventFields, { end: action.value });
      newState = Object.assign({}, state, { addEventFields: newAddEventFields });
      break;
    case SET_ADD_EVENT_RESPONSE:
      newState = Object.assign({}, state, { addEventResponse: action.addEventResponse });
      break;
    case SHOW_MAP:
      newState = Object.assign({}, state, { showMap: !state.showMap });
      break;
    case SET_USER_PROFILE:
      newState = Object.assign({}, state, { userProfile: action.userProfile });
      break;
    case CLEAR_USER_PROFILE:
      newState = Object.assign({}, state, {
        jwt: undefined,
        userProfile: undefined,
        transactionHistory: [],
      });
      break;
    case SET_SELECTED_TAB:
      newState = Object.assign({}, state, { selectedTab: action.selectedTab });
      break;
    case SET_TRANSACTION_HISTORY:
      newState = Object.assign({}, state, { transactionHistory: action.transactions });
      break;
    case SET_CREDIT_CARD_ERROR:
      newState = Object.assign({}, state, { creditCardError: !state.creditCardError });
      break;
    case SET_NAME_ERROR_TEXT:
      newState = Object.assign({}, state, { nameErrorText: action.nameErrorText });
      break;
    case SET_ADDRESS_ERROR_TEXT:
      newState = Object.assign({}, state, { addressErrorText: action.addressErrorText });
      break;
    case SET_EMAIL_ERROR_TEXT:
      newState = Object.assign({}, state, { emailErrorText: action.emailErrorText });
      break;
    case SET_JWT:
      newState = Object.assign({}, state, { jwt: action.jwt });
      break;
    default:
      console.log('UNKNOWN ACTION', action.type);
      newState = state;
      break;
  }
  return newState;
};

export default reducer;
