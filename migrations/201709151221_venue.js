const setup = knex =>
  knex.schema.createTable('venue', (t) => {
    t.increments().index();
    t.string('name').notNullable().unique();
    t.decimal('lat', 12, 8).notNullable();
    t.decimal('lng', 12, 8).notNullable();
    t.string('address');
    t.string('phone');
    t.integer('capacity');
    t.text('description');
    t.text('image');
    t.integer('user_id').references('user.id');
  });

const rollback = knex =>
  knex.schema.dropTable('venue');

exports.up = setup;
exports.down = rollback;
