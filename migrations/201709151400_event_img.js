exports.up = knex =>
  knex.schema.createTable('event_img', (t) => {
    t.increments()
      .index();
    t.text('image')
      .notNullable();
  });

exports.down = knex =>
  knex.schema.dropTable('event_img');
