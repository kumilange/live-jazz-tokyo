const setup = knex =>
  knex.schema.createTable('artist', (t) => {
    t.increments().index();
    t.string('name').notNullable();
    t.text('image');
  });

const rollback = knex =>
  knex.schema.dropTable('artist');

exports.up = setup;
exports.down = rollback;
