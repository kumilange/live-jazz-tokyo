// eslint-disable-line no-console
require('dotenv').config();
const app = require('./app');
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig);

const PORT = process.env.PORT || 3001;

/**
 * Run migration and listen on provided port
 */
(async () => {
  try {
    console.log('Running migrations...');
    await db.migrate.latest();
    console.log('Starting express...');
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  } catch (err) {
    console.error('Error occured!', err);
    process.exit(-1);
  }
})();
