import { SET_CHARGE_RESPONSE, SET_CREDIT_CARD_ERROR } from '../config/const';

const initialState = {
  chargeResponse: {},
  creditCardError: false,
};

const pay = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHARGE_RESPONSE:
      return {
        ...state,
        chargeResponse: action.chargeResponse,
      };
    case SET_CREDIT_CARD_ERROR:
      return {
        ...state,
        creditCardError: !state.creditCardError,
      };
    default:
      return state;
  }
};

export default pay;
