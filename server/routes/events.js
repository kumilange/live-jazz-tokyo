const express = require('express');

const fetch = require('isomorphic-fetch');

const router = express.Router();
const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig);

/* GET events. */
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
  const result = (await db('event')
    .leftJoin('venue', 'event.venue_id', 'venue.id')
    .leftJoin('artist', 'event.artist_id', 'artist.id')
    .leftJoin('event_img', 'event.event_image_id', 'event_img.id')
    .where('event.id', req.params.id)
    .select(
      'event.id as id',
      'event.name as name',
      'artist.name as artist',
      'venue.name as venue',
      'venue.address',
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
      address: event.address,
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

router.post('/', async (req, res) => {
  console.log(req.body);

  const date = new Date(req.body.date);
  const start = new Date(req.body.startTime);
  start.setFullYear(date.getFullYear());
  start.setMonth(date.getMonth());
  start.setDate(date.getDate());
  const end = new Date(req.body.endTime);
  end.setFullYear(date.getFullYear());
  end.setMonth(date.getMonth());
  end.setDate(date.getDate());

  const artistName = req.body.artist;
  const venueName = req.body.venue;
  const address = req.body.address;
  const event = {
    name: req.body.eventName,
    price: parseInt(req.body.price, 10),
    start: start.getTime(),
    end: end.getTime(),
  };

  try {
    let venueId;
    const [venue] = await db('venue')
      .select('id')
      .where('name', venueName);
    if (!venue) {
      const response = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`)).json();
      if (response.status === 'OK') {
        const lat = response.results[0].geometry.location.lat;
        const lng = response.results[0].geometry.location.lng;
        const newVenue = {
          name: venueName,
          address,
          lat,
          lng,
        };
        [venueId] = await db('venue')
          .insert(newVenue)
          .returning('id');
      } else {
        res.status(400).json({ status: 'error', message: 'Address not found.' });
      }
    } else {
      venueId = venue.id;
    }
    console.log('venueId', venueId);
    event.venue_id = venueId;

    let artistId;
    const [artist] = await db('artist')
      .select('id')
      .where('name', artistName);
    if (!artist) {
      [artistId] = await db('artist')
        .insert({ name: artistName })
        .returning('id');
    } else {
      artistId = artist.id;
    }
    console.log('artistId', artistId);
    event.artist_id = artistId;

    console.log('event', event);
    const [eventID] = await db('event')
      .insert(event)
      .returning('id');
    console.log('eventid', eventID);
    res.status(200).json({ addSuccess: true, message: 'YAY', eventID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ addSuccess: false, message: 'Insert failed' });
  }
});

module.exports = router;
