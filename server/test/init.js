process.env.DATABASE_URL = 'postgres://127.0.0.1:5432/livejazztest'

const app = require('../app');
const knex = require('knex')
const config = require('../../knexfile');
const db = knex(config);

(async ()=> {
  try {
    console.log('Running migrations...');
    await db.migrate.latest();
    console.log('Migrations complete!');
    global.run();
  } catch (err) {
      console.error('Error running migrations!', err);
      process.exit(-1);
  }
})()

