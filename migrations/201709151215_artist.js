const setup = knex =>
  knex.schema.createTable('artist', (t) => {
    t.increments().index();
    t.string('name').notNullable().unique();
    t.text('image');
    t.integer('user_id').references('user.id');
  });

const rollback = knex =>
  knex.schema.dropTable('artist');

exports.up = setup;
exports.down = rollback;
