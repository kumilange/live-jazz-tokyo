const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig);
const TARGET_EVENT_COUNT = 1000;
const MILLISECONDS_PER_HOUR = 3600000;
const JAPAN_TIME_OFFSET = MILLISECONDS_PER_HOUR * 9;

const rndInt = num => Math.floor(Math.random() * num);
const rndIntRange = (max, min) => Math.floor(Math.random() * ((max + 1) - min)) + min;

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
  return events[rndIntRange(9, 0)];
};

const generateEvent = (name, start, end) => {
  return {
    artist_id: rndIntRange(10, 1),
    venue_id: rndIntRange(10, 1),
    event_image_id: rndIntRange(10, 1),
    name,
    price: (rndInt(7) * 500) + 2000,
    start,
    end,
    desc: `${name}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  };
};

const setUtcStartDate = (year, month) => {
  return Date.UTC(
    year,
    rndIntRange(month + 1, month), // TODO Dec to Jan
    rndIntRange(31, 1), // TODO Feb 28th or Sep 30th
    rndIntRange(19, 17),
    rndInt(2) * 30,
  );
};

const setUtcEndDate = (year, startDate) => {
  return Date.UTC(
    year,
    startDate.getMonth(),
    startDate.getDate(),
    rndIntRange(22, 20),
    rndInt(2) * 30,
  );
};

const convertJapanTimeDate = (utcStartDate) => {
  return utcStartDate - JAPAN_TIME_OFFSET;
};

exports.seed = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const promises = [];
  for (let i = 0; i < TARGET_EVENT_COUNT; i += 1) {
    try {
      const name = generateEventName();
      const start = convertJapanTimeDate(setUtcStartDate(currentYear, currentMonth));
      const startDate = new Date(start);
      const end = convertJapanTimeDate(setUtcEndDate(currentYear, startDate));
      const event = generateEvent(name, start, end);
      const promise = db('event').insert(event).returning('id');
      promises.push(promise);
    } catch (err) {
      console.error(`Inserting event failed!\n${err}`);
    }
  }

  return Promise.all(promises);
};
