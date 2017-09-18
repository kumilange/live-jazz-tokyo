const setup = knex =>
  knex.schema.createTable('event_img', (t) => {
    t.increments().index();
    t.text('image').notNullable();
  });

const rollback = knex =>
  knex.schema.dropTable('event_img');

exports.up = setup;
exports.down = rollback;
