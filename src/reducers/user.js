import { SET_USER_LOCATION, SET_SELECTED_TAB, SET_ORDER_HISTORY, SET_USER_PROFILE, CLEAR_USER_PROFILE, SET_JWT } from '../config/const';

const initialState = {
  jwt: '',
  userProfile: {},
  userLocation: {},
  selectedTab: 'profile',
  orders: [],
  orderDict: {},
};

const createOrderDictionary = (orders) => {
  return orders.reduce((prev, { eventId }) => {
    const dic = prev;
    dic[eventId] = true;
    return dic;
  }, {});
};


const users = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.userProfile,
      };
    case CLEAR_USER_PROFILE:
      return {
        ...state,
        jwt: '',
        userProfile: {},
        orders: [],
        orderDict: {},
      };
    case SET_USER_LOCATION:
      return {
        ...state,
        userLocation: action.position,
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
        orderDict: createOrderDictionary(action.orders),
      };
    case SET_JWT: {
      return {
        ...state,
        jwt: action.jwt,
      };
    }
    default:
      return state;
  }
};

export default users;
