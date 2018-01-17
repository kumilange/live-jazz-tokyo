import { INITIALIZE_EVENT_DATA, SET_SELECTED_EVENT, CLEAR_SELECTED_EVENT, SET_ADD_EVENT_RESPONSE, FETCH_EVENT_DETAILS, FETCH_EVENT_DETAILS_SUCCESS, FETCH_EVENT_DETAILS_FAILURE, SHOW_MAP } from '../config/const';

const initialState = {
  isFetching: false,
  events: [],
  selectedEvent: {},
  eventDetails: undefined,
  showMap: false,
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
    case FETCH_EVENT_DETAILS:
      return {
        ...state,
        isFetching: true,
        showMap: false,
        eventDetails: {},
      };
    case FETCH_EVENT_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        eventDetails: action.event,
      };
    case FETCH_EVENT_DETAILS_FAILURE:
      return {
        ...state,
        isFetching: false,
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
