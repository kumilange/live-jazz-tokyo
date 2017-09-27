/* eslint-disable no-console */

const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig);
const TARGET_EVENT_COUNT = 1000;
const MILLISECONDS_PER_HOUR = 3600000
const JAPAN_TIME_OFFSET = MILLISECONDS_PER_HOUR * 9;

const rndInt = num => Math.floor(Math.random() * num);
const rndIndex = (max, min) => Math.floor(Math.random() * ((max + 1) - min)) + min;

const generateEventName = () => {
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
  return events[rndIndex(9, 0)];
}

exports.seed = () => {
  const rangeInMonths = 3;
  const promises = [];
  for (let i = 0; i < TARGET_EVENT_COUNT; i += 1) {
    try {
      const name = generateEventName();
      const utcStartDate = Date.UTC(2017, 8 + rndInt(2), 1 + rndInt(31), 17 + rndInt(3), rndInt(2) * 30)
      const japanStartDate = utcStartDate - JAPAN_TIME_OFFSET;
      let start = new Date(japanStartDate);
      const utcEndDate = Date.UTC(2017, start.getMonth(), start.getDate(), 20 + rndInt(3), rndInt(2) * 30);
      const japanEndDate = utcEndDate - JAPAN_TIME_OFFSET;
      let end = new Date(japanEndDate);
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
        desc: `${name}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      };
      const promise = db('event').insert(event).returning('id');
      promises.push(promise);
    } catch (err) {
      console.error(`Inserting event failed!\n${err}`);
    }
  }

  return Promise.all(promises);
};
