const knex = require('knex');
const config = require('../../knexfile');

// HACK - work around for heroku being broken
Object.keys(process.env).forEach((key) => {
  if (key.startsWith('HEROKU_POSTGRESQL')) {
    config.connection = process.env[key];
  }
});
// END HACK

console.log('DATABASE_URL=', process.env.DATABASE_URL);
console.log('config=', config);

const db = knex(config);

(async () => {
  try {
    console.log('Running migrations...');
    await db.migrate.rollback();
    await db.migrate.latest();
    console.log('Migrations complete!');
    global.run();
  } catch (err) {
    console.error('Error running migrations!', err);
    process.exit(-1);
  }
})();
