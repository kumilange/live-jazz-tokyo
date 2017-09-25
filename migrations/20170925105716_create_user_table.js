const setup = knex =>
  knex.schema.createTable('user', (table) => {
    table.increments().index();
    table.string('name');
    table.string('email');
  });

const rollback = knex =>
  knex.schema.dropTable('user');

exports.up = setup;
exports.down = rollback;
