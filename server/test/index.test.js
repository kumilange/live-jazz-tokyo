/* global describe it */
const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('knex');
const assert = chai.assert;
const expect = chai.expect;
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');

const app = require('../app');
const config = require('../../knexfile');
const db = knex(config);

chai.use(chaiHttp);

describe('Events route', () => {
  beforeEach(async ()=> {
    await db('artist').del();
    await db('venue').del();
    await db('event_img').del();
    await db('event').del();
  })

  it('should get events data within date range', async () => {

    // setup
    // insert the simplest data possible to satisfy later assertion
    //            ^^^^^^^^^^^^^^^^^^^^^^ (not random production data)
    const artist = { name: 'Kumiko Haraguchi'}
    const venue = { lat: '1', lng: '1', name: '杜のうた' }
    const image = fs.readFileSync(path.join(__dirname, `../data/img/event_0.jpg`)).toString('base64');
    const event_img = { image }
    const events = [{
      id: 1,
      name: 'before event',
      artist: 'artist1',
      venue: 'venue1',
      lat: '1',
      lng: '1',
      price: 1,
      start: new Date('2017-01-01 19:00').getTime(),
      end: new Date('2017-01-01 21:00').getTime()
    },
    {
      id: 2,
      name: 'during event',
      artist: 'artist2',
      venue: 'venue2',
      lat: '2',
      lng: '2',
      price: 2,
      start: new Date('2017-01-02 19:00').getTime(),
      end: new Date('2017-01-02 21:00').getTime()
    },
    {
      id: 3,
      name: 'after event',
      artist: 'artist3',
      venue: 'venue3',
      lat: '3',
      lng: '3',
      price: 3,
      start: new Date('2017-01-03 19:00').getTime(),
      end: new Date('2017-01-03 21:00').getTime()
    }];

    await db('artist').insert(artist)
    await db('venue').insert(venue)
    await db('event_img').insert(event_img)
    const expected = await db.batchInsert('event', events).returning('*');

    // exercise
    const now = new Date('2017-01-02 00:00').getTime();
    const MS_24_HOUR = 1000 * 60 * 60 * 24;
    const params = {
      start: now,
      end: now + MS_24_HOUR,
    };
    const query = querystring.stringify(params);

    const result = await chai.request(app)
      .get(`/events?${query}`)
      .send();

    // assert
    expect(result.body).to.deep.equal(expected);

    // teardown
  });
});

