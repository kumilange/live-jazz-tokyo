exports.up = (knex) => {
  return knex.schema.table('event', (t) => {
    return t.integer('user_id')
      .references('user.id');
  });
};

exports.down = (knex) => {
  return knex.schema.table('event', (t) => {
    return t.dropColumn('user_id');
  });
};
