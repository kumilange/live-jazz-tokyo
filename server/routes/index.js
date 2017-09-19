const express = require('express');

const router = express.Router();
const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig);

/* GET home page. */
router.get('/events', async (req, res) => {
  console.log("query", req.query);

  const events = (await db('event')
    .leftJoin('venue', 'event.venue_id', 'venue.id')
    .leftJoin('artist', 'event.artist_id', 'artist.id')
    .whereBetween('end', [req.query.start, req.query.end])
    .select(
      'event.id as id',
      'event.name as name',
      'artist.name as artist',
      'venue.name as venue',
      'venue.lat',
      'venue.lng',
      'event.price',
      'event.start',
      'event.end',
    )).map((event) => {
      return {
        id: event.id,
        name: event.name,
        artist: event.artist,
        venue: event.venue,
        lat: parseFloat(event.lat),
        lng: parseFloat(event.lng),
        price: event.price,
        start: parseInt(event.start),
        end: parseInt(event.end),
      }
    }
  );

  console.log('events', events);

  res.status(200).json(events);
});

module.exports = router;