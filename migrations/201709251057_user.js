exports.up = (knex) => {
  const transaction = [];
  transaction.push(knex.schema.createTable('user', (table) => {
    table.increments().index();
    table.string('name');
    table.string('email');
  }));
  transaction.push(knex.schema.table('artist', (table) => {
    return table.integer('user_id')
      .references('user.id');
  }));
  transaction.push(knex.schema.table('transaction', (table) => {
    return table.integer('user_id')
      .references('user.id')
      .notNullable();
  }));
  transaction.push(knex.schema.table('venue', (table) => {
    return table.integer('user_id')
      .references('user.id');
  }));
  return Promise.all(transaction);
};

exports.down = (knex) => {
  const transaction = [];
  transaction.push(knex.schema.table('artist', (table) => {
    return table.dropColumn('user_id');
  }));
  transaction.push(knex.schema.table('transaction', (table) => {
    return table.dropColumn('user_id');
  }));
  transaction.push(knex.schema.table('venue', (table) => {
    return table.dropColumn('user_id');
  }));
  transaction.push(knex.schema.dropTable('user'),
  );
  return Promise.all(transaction);
};
