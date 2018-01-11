exports.up = (knex) => {
  const transaction = [];
  transaction.push(knex.schema.createTable('user', (t) => {
    t.increments().index();
    t.string('name');
    t.string('email');
  }));
  transaction.push(knex.schema.table('artist', (t) => {
    return t.integer('user_id')
      .references('user.id');
  }));
  transaction.push(knex.schema.table('transaction', (t) => {
    return t.integer('user_id')
      .references('user.id')
      .notNullable();
  }));
  transaction.push(knex.schema.table('venue', (t) => {
    return t.integer('user_id')
      .references('user.id');
  }));
  return Promise.all(transaction);
};

exports.down = (knex) => {
  const transaction = [];
  transaction.push(knex.schema.table('artist', (t) => {
    return t.dropColumn('user_id');
  }));
  transaction.push(knex.schema.table('transaction', (t) => {
    return t.dropColumn('user_id');
  }));
  transaction.push(knex.schema.table('venue', (t) => {
    return t.dropColumn('user_id');
  }));
  transaction.push(knex.schema.dropTable('user'),
  );
  return Promise.all(transaction);
};
