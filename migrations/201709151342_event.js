const setup = knex =>
  knex.schema.createTable('event', (t) => {
    t.increments().index();
    t.integer('artist_id').unsigned();
    t.forerign('artist_id').references(artist.id);
    t.integer('venue_id').unsigned();
    t.forerign('venue_id').references(venue.id);
    t.integer('event_image_id').unsigned();
    t.forerign('event_image_id').references(event_img.id);
    t.integer('price');
    t.timestamp('start_time');
    t.timestamp('end_time');
    t.text('description');
  });

const rollback = knex =>
  knex.schema.dropTable('event');

exports.up = setup;
exports.down = rollback;