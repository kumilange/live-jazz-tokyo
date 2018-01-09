/* OTHERS */
const JWT_KEY = process.env.JWT_KEY || 'TEST_KEY';
const JWT_APP = process.env.JWT_APP || 'TEST_APP';
const STRIPE_KEY = process.env.STRIPE_KEY || 'sk_test_BQokikJOvBiI2HlWgH4olfQ2';

/* API */
const RES_STAT = {
  OK: {
    CODE: 200,
    MSG: 'OK.',
  },
  BAD_REQ: {
    CODE: 400,
    MSG: 'Bad Request.',
  },
  NOT_FOUND: {
    CODE: 404,
    MSG: 'Not Found.',
  },
  INTL_SERVER_ERR: {
    CODE: 500,
    MSG: 'Internal Server Error.',
  },
};

module.exports = { JWT_KEY, JWT_APP, STRIPE_KEY, RES_STAT };
