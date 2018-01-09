const JWT_KEY = process.env.JWT_KEY || 'TEST_KEY';
const JWT_APP = process.env.JWT_APP || 'TEST_APP';
const STRIPE_KEY = process.env.STRIPE_KEY || 'sk_test_BQokikJOvBiI2HlWgH4olfQ2';
const RES_STAT = {
  OK: {
    CODE: 200,
    MESSAGE: 'OK.',
  },
  BAD_REQUEST: {
    CODE: 400,
    MESSAGE: 'Bad Request.',
  },
  NOT_FOUND: {
    CODE: 404,
    MESSAGE: 'Not Found.',
  },
  INTERNAL_SERVER_ERROR: {
    CODE: 500,
    MESSAGE: 'Internal Server Error.',
  },
};

module.exports = { JWT_KEY, JWT_APP, STRIPE_KEY, RES_STAT };
