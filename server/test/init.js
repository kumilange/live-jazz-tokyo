const knex = require('knex');
const config = require('../../knexfile');


// HACK - work around for heroku being broken
for(let key in process.env) {
  if(key.startsWith('HEROKU_POSTGRESQL')) {
    console.log(`Replacing DATABASE_URL with ${key} because Heroku CI is broken`)
    process.env.DATABASE_URL = process.env[key];
  }
}
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
