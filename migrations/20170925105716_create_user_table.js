const setup = (knex) => {
  return knex.schema.createTable('user', (table) => {
    table.increments().index();
    table.string('name');
    table.string('email');
  })
    .then(knex.schema.table('artist', (table) => {
      table.integer('user_id')
        .references('user.id');
    }))
    .then(knex.schema.table('transaction', (table) => {
      table.integer('user_id')
        .references('user.id')
        .notNullable();
    }))
    .then(knex.schema.table('venue', (table) => {
      table.integer('user_id')
        .references('user.id');
    }));
};

const rollback = (knex) => {
  return knex.schema.table('artist', (table) => {
    table.dropColumn('user_id');
  })
    .then(knex.schema.table('transaction', (table) => {
      table.dropColumn('user_id');
    }))
    .then(knex.schema.table('venue', (table) => {
      table.dropColumn('user_id');
    }))
    .then(knex.schema.dropTable('user'),
    );
};

exports.up = setup;
exports.down = rollback;
