/* global describe it */
const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('knex');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');

const expect = chai.expect;

const app = require('../app');
const config = require('../../knexfile');

const db = knex(config);

chai.use(chaiHttp);

describe('Events route /events', () => {
  beforeEach(async () => {
    await db('event').del();
    await db('artist').del();
    await db('venue').del();
    await db('event_img').del();
  });

  it('should get events data within date range', async () => {
    // setup artist, venue, event_img tables
    const artist = { name: 'Name1' };
    const venue = { lat: '1', lng: '1', name: 'Venue1' };
    const image = fs.readFileSync(path.join(__dirname, '../data/img/event_0.jpg')).toString('base64');
    const eventImg = { image };
    const eventName = ['eventBefore', 'eventInRange', 'eventAfter'];

    // insert data to artist, venue, event_img tables
    const artistId = (await db('artist').insert(artist).returning('id'))[0];
    const venueId = (await db('venue').insert(venue).returning('id'))[0];
    const eventImageId = (await db('event_img').insert(eventImg).returning('id'))[0];

    // setup event table
    const events = [{
      artist_id: artistId,
      venue_id: venueId,
      event_image_id: eventImageId,
      name: eventName[0],
      price: 1,
      start: new Date('2017-01-01 19:00').getTime(),
      end: new Date('2017-01-01 21:00').getTime(),
      desc: 'desc1',
    },
    {
      artist_id: artistId,
      venue_id: venueId,
      event_image_id: eventImageId,
      name: eventName[1],
      price: 2,
      start: new Date('2017-01-02 19:00').getTime(),
      end: new Date('2017-01-02 21:00').getTime(),
      desc: 'desc2',
    },
    {
      artist_id: artistId,
      venue_id: venueId,
      event_image_id: eventImageId,
      name: eventName[2],
      price: 3,
      start: new Date('2017-01-03 19:00').getTime(),
      end: new Date('2017-01-03 21:00').getTime(),
      desc: 'desc3',
    }];

    // insert event table
    const eventIdList = await db.batchInsert('event', events).returning('id');

    const expected = [
      { id: eventIdList[1],
        name: eventName[1],
        artist: artist.name,
        venue: venue.name,
        lat: 1,
        lng: 1,
        price: 2,
        start: parseFloat(new Date('2017-01-02 19:00').getTime()),
        end: parseFloat(new Date('2017-01-02 21:00').getTime()),
      },
    ];

    // exercise
    const now = new Date('2017-01-02 00:00').getTime();
    const MS_24_HOUR = 1000 * 60 * 60 * 24;
    const params = {
      start: now,
      end: now + MS_24_HOUR,
    };
    const query = querystring.stringify(params);

    const result = await chai.request(app)
      .get('/api/events')
      .query(query)
      .send();

    // assert
    expect(result.body).to.deep.equal(expected);
  });

  it('should return empty array when there is no data', async () => {
    const expected = [];

    // exercise
    const now = new Date('2017-01-02 00:00').getTime();
    const MS_24_HOUR = 1000 * 60 * 60 * 24;
    const params = {
      start: now,
      end: now + MS_24_HOUR,
    };
    const query = querystring.stringify(params);

    const result = await chai.request(app)
      .get('/api/events')
      .query(query)
      .send();

    // assert
    expect(result.body).to.deep.equal(expected);
  });

  // teardown
  afterEach(async () => {
    await db('event').del();
    await db('artist').del();
    await db('venue').del();
    await db('event_img').del();
  });
});


describe('EventDetails route /events', () => {
  beforeEach(async () => {
    await db('event').del();
    await db('artist').del();
    await db('venue').del();
    await db('event_img').del();
  });

  it('should get event detail', async () => {
    // setup artist, venue, event_img tables
    const artist = { name: 'Name1' };
    const venue = { name: 'Venue1', address: 'testaddress', lat: 0.0, lng: 0.0 };
    const image = fs.readFileSync(path.join(__dirname, '../data/img/event_0.jpg')).toString('base64');
    const eventImg = { image };
    const eventName = ['eventBefore', 'eventInRange', 'eventAfter'];
    const desc = ['desc1', 'desc2', 'desc3'];

    // insert data to artist, venue, event_img tables
    const artistId = (await db('artist').insert(artist).returning('id'))[0];
    const venueId = (await db('venue').insert(venue).returning('id'))[0];
    const eventImageId = (await db('event_img').insert(eventImg).returning('id'))[0];

    // setup event table
    const events = [{
      artist_id: artistId,
      venue_id: venueId,
      event_image_id: eventImageId,
      name: eventName[0],
      price: 1,
      start: new Date('2017-01-01 19:00').getTime(),
      end: new Date('2017-01-01 21:00').getTime(),
      desc: desc[0],
    },
    {
      artist_id: artistId,
      venue_id: venueId,
      event_image_id: eventImageId,
      name: eventName[1],
      price: 2,
      start: new Date('2017-01-02 19:00').getTime(),
      end: new Date('2017-01-02 21:00').getTime(),
      desc: desc[1],
    },
    {
      artist_id: artistId,
      venue_id: venueId,
      event_image_id: eventImageId,
      name: eventName[2],
      price: 3,
      start: new Date('2017-01-03 19:00').getTime(),
      end: new Date('2017-01-03 21:00').getTime(),
      desc: desc[2],
    }];
    // insert event table
    const eventIdList = await db.batchInsert('event', events).returning('id');

    const expected =
      { id: eventIdList[1],
        name: eventName[1],
        artist: artist.name,
        venue: venue.name,
        address: venue.address,
        lat: venue.lat,
        lng: venue.lng,
        image,
        price: 2,
        start: parseInt(parseFloat(new Date('2017-01-02 19:00').getTime()), 10),
        end: parseInt(parseFloat(new Date('2017-01-02 21:00').getTime()), 10),
        desc: desc[1],
      };

    // exercise
    const result = await chai.request(app)
      .get(`/api/events/${expected.id}`)
      .send();

    // assert
    expect(result.body).to.deep.equal(expected);
  });

  it('should return empty object when there is no data', async () => {
    const expected = {};
    const id = 1;

    // exercise
    const result = await chai.request(app)
      .get(`/api/events/${id}`)
      .send();

    // assert
    expect(result.body).to.deep.equal(expected);
  });

  // teardown
  afterEach(async () => {
    await db('event').del();
    await db('artist').del();
    await db('venue').del();
    await db('event_img').del();
  });
});

