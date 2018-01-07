exports.up = knex =>
  knex.schema.createTable('transaction', (t) => {
    t.increments()
      .index();
    t.integer('event_id')
      .unsigned()
      .notNullable();
    t.foreign('event_id')
      .references('event.id');
    t.integer('total')
      .notNullable();
    t.string('charge_id')
      .notNullable();
  });

exports.down = knex =>
  knex.schema.dropTable('transaction');

