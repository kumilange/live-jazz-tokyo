import { INITIALIZE_EVENT_DATA, SET_SELECTED_EVENT, CLEAR_SELECTED_EVENT, SET_ADD_EVENT_RESPONSE, SET_EVENT_DETAILS, CLEAR_EVENT_DETAILS, SHOW_MAP } from '../config/const';

const initialState = {
  events: [],
  selectedEvent: {},
  eventDetails: undefined,
  showMap: false,
  addEventFields: {},
  addEventResponse: undefined,
};

const event = (state = initialState, action) => {
  switch (action.type) {
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
    case CLEAR_EVENT_DETAILS:
      return {
        ...state,
        eventDetails: undefined,
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
    default:
      return state;
  }
};

export default event;
