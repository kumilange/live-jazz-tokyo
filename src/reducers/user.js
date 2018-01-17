import { SET_USER_LOCATION, SET_SELECTED_TAB, SET_ORDER_HISTORY, SET_USER_PROFILE, CLEAR_USER_PROFILE, SET_JWT } from '../config/const';

const initialState = {
  jwt: '',
  userProfile: {},
  userLocation: {},
  selectedTab: 'profile',
  orders: [],
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
