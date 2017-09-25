const setup = (knex) => {
  knex.schema.createTable('user', (table) => {
    table.increments().index();
    table.string('name');
    table.string('email');
  });

  knex.schema.table('artist', (table) => {
    table.integer('user_id')
      .references('user.id');
  });

  knex.schema.table('transaction', (table) => {
    table.integer('user_id')
      .references('user.id')
      .notNullable();
  });

  knex.schema.table('venue', (table) => {
    table.integer('user_id')
      .references('user.id');
  });
};

const rollback = (knex) => {
  knex.schema.dropTable('user');
  knex.schema.table('artist', (table) => {
    table.dropColumn('user_id');
  });
  knex.schema.table('transaction', (table) => {
    table.dropColumn('user_id');
  });
  knex.schema.table('venue', (table) => {
    table.dropColumn('user_id');
  });
};

exports.up = setup;
exports.down = rollback;
