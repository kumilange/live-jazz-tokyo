const setup = knex =>
  knex.schema.createTable('transaction', (t) => {
    t.increments().index();
    t.integer('event_id').unsigned().notNullable();
    t.foreign('event_id').references('event.id');
    t.integer('total').notNullable();
    t.string('charge_id').notNullable();
  });

const rollback = knex =>
  knex.schema.dropTable('transaction');

exports.up = setup;
exports.down = rollback;
