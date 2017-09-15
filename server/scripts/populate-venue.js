/* eslint-disable no-console */

const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig);

const rndLat = () => (Math.random() * (35.704248 - 35.661167)) + 35.661167;
const rndLng = () => (Math.random() * (139.769388 - 139.716144)) + 139.716144;

const venues = [
  { lat: rndLat(), lng: rndLng(), name: '杜のうた' },
  { lat: rndLat(), lng: rndLng(), name: 'ジャズピアノクラブJOE' },
  { lat: rndLat(), lng: rndLng(), name: 'Blue Note Tokyo' },
  { lat: rndLat(), lng: rndLng(), name: '六本木サテンドール' },
  { lat: rndLat(), lng: rndLng(), name: 'Billboard Live TOKYO' },
  { lat: rndLat(), lng: rndLng(), name: 'Red Pepper' },
  { lat: rndLat(), lng: rndLng(), name: '9th Chord' },
  { lat: rndLat(), lng: rndLng(), name: '橋の下' },
  { lat: rndLat(), lng: rndLng(), name: 'チャーリーズ・クラブ' },
  { lat: rndLat(), lng: rndLng(), name: 'november eleventh' },
];

const promises = venues.map(async (venue) => {
  try {
    const id = await db('venue')
      .insert(venue)
      .returning('id');
    console.log(`${venue.name} inserted with id ${id}`);
  } catch (err) {
    console.error(`Inserting ${venue.name} failed!\n${err}`);
  }
});

Promise.all(promises)
  .then(() => {
    console.log('All done!');
    process.exit();
  });
