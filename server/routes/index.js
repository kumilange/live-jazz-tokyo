const express = require('express');

const stripe = require('stripe')('sk_test_BQokikJOvBiI2HlWgH4olfQ2');

const router = express.Router();
const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig);

/* GET events. */
router.get('/events', async (req, res) => {
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
      start: parseInt(event.start, 10),
      end: parseInt(event.end, 10),
    };
  },
  );
  res.status(200).json(events.length === 0 ? [] : events);
});

/* GET eventDetails. */
router.get('/eventdetails', async (req, res) => {
  const result = (await db('event')
    .leftJoin('venue', 'event.venue_id', 'venue.id')
    .leftJoin('artist', 'event.artist_id', 'artist.id')
    .leftJoin('event_img', 'event.event_image_id', 'event_img.id')
    .where('event.id', req.query.id)
    .select(
      'event.id as id',
      'event.name as name',
      'artist.name as artist',
      'venue.name as venue',
      'event_img.image as image',
      'event.price',
      'event.start',
      'event.end',
      'event.desc',
    )).map((event) => {
    return {
      id: event.id,
      name: event.name,
      artist: event.artist,
      venue: event.venue,
      image: event.image,
      price: event.price,
      start: parseInt(event.start, 10),
      end: parseInt(event.end, 10),
      description: event.desc,
    };
  },
  );
  res.status(200).json(result.length === 0 ? {} : result[0]);
});

router.post('/charge', (req, res) => {
  const tokenID = req.body.stripeToken.id;

  // Charge the user's card:
  stripe.charges.create({
    amount: 1000,
    currency: 'jpy',
    description: 'Example charge',
    source: tokenID,
  }, (err, charge) => {
    let response;
    if (err) {
      response = {
        OK: false,
      };
    } else {
      response = {
        OK: true,
        message: charge,
      };
    }
    res.status(200).json(response);
  });
});

module.exports = router;
