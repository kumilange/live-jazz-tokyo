import {
  INITIALIZE_EVENT_DATA, SET_SELECTED_EVENT, CLEAR_SELECTED_EVENT, SET_USER_LOCATION, SET_CHARGE_RESPONSE, SET_ADD_EVENT_RESPONSE, SET_SELECTED_TAB, SET_ORDER_HISTORY, SET_EVENT_DETAILS, SET_USER_PROFILE, CLEAR_USER_PROFILE, SET_JWT, SHOW_MAP, SET_CREDIT_CARD_ERROR } from '../config/const';

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
  orders: [],
  selectedTab: 'profile',
  creditCardError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case '@@redux/INIT':
      return state;
    case INITIALIZE_EVENT_DATA:
      return {
        ...state,
        events: action.data,
      };
    case SET_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: action.event,
      };
    case CLEAR_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: {},
      };
    case SET_EVENT_DETAILS:
      return {
        ...state,
        eventDetails: action.event,
      };
    case SET_USER_LOCATION:
      return {
        ...state,
        userLocation: action.position,
      };
    case SET_CHARGE_RESPONSE:
      return {
        ...state,
        chargeResponse: action.chargeResponse,
      };
    case SET_ADD_EVENT_RESPONSE:
      return {
        ...state,
        addEventResponse: action.addEventResponse,
      };
    case SHOW_MAP:
      return {
        ...state,
        showMap: !state.showMap,
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.userProfile,
      };
    case CLEAR_USER_PROFILE:
      return {
        ...state,
        jwt: undefined,
        userProfile: undefined,
        orders: [],
      };
    case SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.selectedTab,
      };
    case SET_ORDER_HISTORY:
      return {
        ...state,
        orders: action.orders,
      };
    case SET_CREDIT_CARD_ERROR:
      return {
        ...state,
        creditCardError: !state.creditCardError,
      };
    case SET_JWT: {
      return {
        ...state,
        jwt: action.jwt,
      };
    }
    default:
      console.log('UNKNOWN ACTION', action.type);
      return state;
  }
};

export default reducer;
