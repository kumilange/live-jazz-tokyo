const setup = knex =>
  knex.schema.createTable('order', (t) => {
    t.increments().index();
    t.integer('event_id').unsigned();
    t.foreign('event_id').references('event.id');
    t.integer('total');
    t.string('charge_id');
  });

const rollback = knex =>
  knex.schema.dropTable('order');

exports.up = setup;
exports.down = rollback;
