exports.up = knex =>
  knex.schema.createTable('event', (t) => {
    t.increments()
      .index();
    t.integer('artist_id')
      .unsigned();
    t.foreign('artist_id')
      .references('artist.id');
    t.integer('venue_id')
      .unsigned();
    t.foreign('venue_id')
      .references('venue.id');
    t.integer('event_image_id')
      .unsigned();
    t.foreign('event_image_id')
      .references('event_img.id');
    t.string('name');
    t.integer('price');
    t.bigInteger('start');
    t.bigInteger('end');
    t.text('desc');
  });

exports.down = knex =>
  knex.schema.dropTable('event');
