const express = require('express');

const stripe = require('stripe')('sk_test_BQokikJOvBiI2HlWgH4olfQ2');
const fetch = require('isomorphic-fetch');

const router = express.Router();
const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig);

const GOOGLE_APIKEY = '';

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
  const eventID = req.body.eventID;

  // Charge the user's card:
  stripe.charges.create({
    amount: 1000,
    currency: 'jpy',
    description: 'Example charge',
    source: tokenID,
  }, async (err, charge) => {
    let response;
    if (err) {
      response = {
        OK: false,
      };
    } else {
      const result = await db('transaction')
        .returning('id')
        .insert({
          event_id: eventID,
          total: charge.amount,
          charge_id: charge.id,
        });
      response = {
        OK: true,
        order_id: result[0],
      };
    }
    res.status(200).json(response);
  });
});

router.post('/addevent', async (req, res) => {
  console.log('Request:', req.body);

  const artistName = req.body.artist;
  const venueName = req.body.venue;
  const address = req.body.address;
  let event = {
    name: req.body.eventName,
    price: parseInt(req.body.price),
    start: parseInt(req.body.startTime, 10),
    end: parseInt(req.body.endTime, 10),
  }

  try {
    // check if venue existts
      // if venue exists, get id
      // if not, get lat and lng from google api and insert venue name && lat, lng
    let [venueId] = await db('venue')
      .select('id')
      .where('name', venueName);
    console.log(venueId)
    if(!venueId) {
      // &key=${GOOGLE_APIKEY}
      const res = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`)).json();
      if(res.status === 'OK') {
        const lat = res.results[0].geometry.location.lat;
        const lng = res.results[0].geometry.location.lng;
        const venue = {
          name: venueName,
          address,
          lat,
          lng,
        }
        venueId = await db('venue')
          .insert(venue)
          .returning('id');
      } else {
        res.status(200).json({ status: 'error', message: 'Address not found.' });
      }
    }
    event.venue_id = venueId.id;

    // check if artist exists
      // if artist exists, get id
      // if not, insert artist name
    let [artistId] = await db('artist')
      .select('id')
      .where('name', artistName);
    if(!artistId) {
      [artistId] = await db('artist')
        .insert({ name: artistName })
        .returning('id');
    }
    event.artist_id = artistId.id;

    console.log('event', event)
    const [eventID] = await db('event')
      .insert(event)
      .returning('id');
    console.log('eventid', eventID);
    res.status(200).json({ addSuccess: true, message: 'YAY' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ addSuccess: false, message: 'Insert failed' });
  }
});

module.exports = router;
