const initialState = {
  events: [],
  openInfoWindow: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case '@@redux/INIT':
      return state;
    case 'INITIALIZE_EVENT_DATA':
      const newState = Object.assign({}, state, { events: action.data });
      return newState;
    default:
      return state;
  }
};

export default reducer;
