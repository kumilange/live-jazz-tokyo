/* eslint-disable no-console */

const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig);

const rndInt = num => Math.floor(Math.random() * num);
const rndIndex = (max, min)=> { 
  return Math.floor(Math.random() * (max + 1 - min)) + min 
}

const events = [
  {"artist_id": rndIndex(10, 1), "venue_id": rndIndex(10, 1),"event_image_id": rndIndex(10, 1),"name":"ヴォーカル・セッション", "price": (rndInt(7) * 500) + 2000, "start":1505642400000,"end":1505655000000, "desc": "description1"},
  {"artist_id": rndIndex(10, 1),"venue_id": rndIndex(10, 1),"event_image_id": rndIndex(10, 1),"name":"ビューティフルナイト", "price": (rndInt(7) * 500) + 2000, "start":1506848400000,"end":1506855600000, "desc": "description2"},
  {"artist_id": rndIndex(10, 1),"venue_id": rndIndex(10, 1),"event_image_id": rndIndex(10, 1),"name":"スプレンディッドナイト", "price": (rndInt(7) * 500) + 2000, "start":1504512000000,"end":1504524600000, "desc": "description3"},
  {"artist_id": rndIndex(10, 1),"venue_id": rndIndex(10, 1),"event_image_id": rndIndex(10, 1),"name":"スタイリッシュナイト", "price": (rndInt(7) * 500) + 2000, "start":1506852000000,"end":1506855600000, "desc": "description4"},
  {"artist_id": rndIndex(10, 1),"venue_id": rndIndex(10, 1),"event_image_id": rndIndex(10, 1),"name":"オトナのジャズナイト", "price": (rndInt(7) * 500) + 2000, "start":1508837400000,"end":1508844600000, "desc": "description5"},
  {"artist_id": rndIndex(10, 1),"venue_id": rndIndex(10, 1),"event_image_id": rndIndex(10, 1),"name":"SPセッション", "price": (rndInt(7) * 500) + 2000, "start":1506418200000,"end":1506423600000, "desc": "description6"},
  {"artist_id": rndIndex(10, 1),"venue_id": rndIndex(10, 1),"event_image_id": rndIndex(10, 1),"name":"コケティッシュナイト", "price": (rndInt(7) * 500) + 2000, "start":1504434600000,"end":1504443600000, "desc": "description7"},
  {"artist_id": rndIndex(10, 1),"venue_id": rndIndex(10, 1),"event_image_id": rndIndex(10, 1),"name":"ハートウォーミングナイト", "price": (rndInt(7) * 500) + 2000, "start":1508149800000,"end":1508155200000, "desc": "description8"},
  {"artist_id": rndIndex(10, 1),"venue_id": rndIndex(10, 1),"event_image_id": rndIndex(10, 1),"name":"ゴージャスナイト", "price": (rndInt(7) * 500) + 2000, "start":1506245400000,"end":1506256200000, "desc": "description9"},
  {"artist_id": rndIndex(10, 1),"venue_id": rndIndex(10, 1),"event_image_id": rndIndex(10, 1),"name":"スタンダードナイト","price": (rndInt(7) * 500) + 2000,"start":1508664600000,"end":1508679000000, "desc": "description10"},
];

const promises = events.map(async (event) => {
  try {
    const id = await db('event')
    .insert(event)
    .returning('id');
  console.log(`${event} inserted with id ${id}`);

  } catch (err) {
    console.error(`Inserting ${event.name} failed!\n${err}`);
  }
});

Promise.all(promises)
.then(() => {
  console.log('All done!');
  process.exit();
});

