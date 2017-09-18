/* eslint-disable no-console */

const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig);
const NUM_OF_PRE_RECORD = 1000;

const rndInt = num => Math.floor(Math.random() * num);
const rndIndex = (max, min) => Math.floor(Math.random() * ((max + 1) - min)) + min;

const events = [
  'ヴォーカル・セッション',
  'ビューティフルナイト',
  'スプレンディッドナイト',
  'スタイリッシュナイト',
  'オトナのジャズナイト',
  'SPセッション',
  'コケティッシュナイト',
  'ハートウォーミングナイト',
  'ゴージャスナイト',
  'スタンダードナイト',
];

exports.seed = () => {
  const promises = [];
  for (let i = 0; i < NUM_OF_PRE_RECORD; i += 1) {
    try {
      const name = events[rndIndex(9, 0)];
      let start = new Date(2017, 8 + rndInt(2), 1 + rndInt(31), 17 + rndInt(3), rndInt(2) * 30);
      let end = new Date(2017, start.getMonth(), start.getDate(), 20 + rndInt(3), rndInt(2) * 30);
      start = Date.parse(start);
      end = Date.parse(end);

      const event = {
        artist_id: rndIndex(10, 1),
        venue_id: rndIndex(10, 1),
        event_image_id: rndIndex(10, 1),
        name,
        price: (rndInt(7) * 500) + 2000,
        start,
        end,
        desc: `desc${name}`,
      };
      const promise = db('event').insert(event).returning('id');
      promises.push(promise);
    } catch (err) {
      console.error(`Inserting event failed!\n${err}`);
    }
  }

  return Promise.all(promises);
};
