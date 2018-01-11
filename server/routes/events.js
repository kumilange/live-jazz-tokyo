const { RES_STAT } = require('../config/const');
const knexConfig = require('../../knexfile');
const { sendResponse } = require('../utils/');

const express = require('express');
const fetch = require('isomorphic-fetch');
const db = require('knex')(knexConfig);

const router = express.Router();

const formatEvent = (event) => {
  const { id, name, artist, venue, address, lat, lng, image, price, start, end, desc } = event;
  return {
    id,
    name,
    artist,
    venue,
    address,
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    image,
    price,
    start: parseInt(start, 10),
    end: parseInt(end, 10),
    desc,
  };
};

/* GET events */
router.get('/', async (req, res) => {
  try {
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
      )).map(event => formatEvent(event));
    console.log('events', events);
    sendResponse(res, RES_STAT.OK.CODE, events);
  } catch (err) {
    console.log('err', err);
    sendResponse(res, RES_STAT.INTL_SERVER_ERR.CODE, RES_STAT.INTL_SERVER_ERR.MSG);
  }
});

/* GET eventDetails */
router.get('/:id', async (req, res) => {
  try {
    let detail = await db('event')
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
        'venue.lat',
        'venue.lng',
        'event_img.image as image',
        'event.price',
        'event.start',
        'event.end',
        'event.desc',
      )
      .first();
    console.log('details', detail);
    detail = formatEvent(detail);
    sendResponse(res, RES_STAT.OK.CODE, detail);
  } catch (err) {
    console.log('err', err);
    sendResponse(res, RES_STAT.INTL_SERVER_ERR.CODE, RES_STAT.INTL_SERVER_ERR.MSG);
  }
});

/* POST event */
router.post('/', async (req, res) => {
  try {
    const { start, end, artistName, venueName, address, eventName, price } = req.body;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const event = {
      name: eventName,
      price: parseInt(price, 10),
      start: startDate.getTime(),
      end: endDate.getTime(),
    };

    // set venueID to event
    let [venueID] = await db('venue')
      .where({ name: venueName })
      .select('id');
    console.log('venueID', venueID);

    if (!venueID) {
      const response = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`)).json();
      // error handling for geocode api
      if (response.results.length === 0) {
        console.log('err', response);
        sendResponse(res, RES_STAT.BAD_REQ.CODE, { addSuccess: false });
        return;
      }
      const { lat, lng } = response.results[0].geometry.location;
      [venueID] = await db('venue')
        .insert({ name: venueName, address, lat, lng })
        .returning('id');
      console.log('venueID', venueID);
    } else {
      venueID = venueID.id;
    }
    event.venue_id = venueID;

    // set artistID to event
    let [artistID] = await db('artist')
      .where('name', artistName)
      .select('id');
    console.log('artistID', artistID);

    if (!artistID) {
      [artistID] = await db('artist')
        .insert({ name: artistName })
        .returning('id');
      console.log('artistID', artistID);
    } else {
      artistID = artistID.id;
    }
    event.artist_id = artistID;

    // insert event
    console.log('event', event);
    const [eventID] = await db('event')
      .insert(event)
      .returning('id');

    sendResponse(res, RES_STAT.OK.CODE, { addSuccess: true, eventID });
  } catch (err) {
    console.error(err);
    sendResponse(res, res, RES_STAT.INTL_SERVER_ERR.CODE, { addSuccess: false });
  }
});

module.exports = router;
