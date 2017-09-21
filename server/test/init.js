const knex = require('knex');
const config = require('../../knexfile');

// HACK - work around for heroku being broken
console.log(`DATABASE_URL=`, DATABASE_URL);
Object.keys(process.env).forEach((key) => {
  if (key.startsWith('HEROKU_POSTGRESQL')) {
    const NEWURL = process.env[key];
    console.log(`${key}=`, NEWURL);
    process.env.DATABASE_URL = NEWURL;
    console.log(`new DATABASE_URL=`, process.env.DATABASE_URL);
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
