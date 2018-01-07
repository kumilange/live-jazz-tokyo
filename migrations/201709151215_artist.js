exports.up = knex =>
  knex.schema.createTable('artist', (t) => {
    t.increments()
      .index();
    t.string('name')
      .notNullable()
      .unique();
    t.text('image');
  });

exports.down = knex =>
  knex.schema.dropTable('artist');
