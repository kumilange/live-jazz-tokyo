const initialState = {
  events: [],
  selectedEvent: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case '@@redux/INIT':
      return state;
    case 'INITIALIZE_EVENT_DATA':
      return Object.assign({}, state, { events: action.data });
    case 'SET_SELECTED_EVENT':
      const newState = Object.assign({}, state, { selectedEvent: action.event });
      return newState;
    default:
      return state;
  }
};

export default reducer;
