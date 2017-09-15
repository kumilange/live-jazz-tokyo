/* eslint-disable no-console */

const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig);

const artists = [
  'ジョー蒲池',
  'KAORU',
  '宮崎カポネ信義',
  '田中利由子',
  '遠藤さや',
  '谷口雅彦',
  '水野由紀',
  '中野幸代',
  '一泉ナオ子',
  '八木秀樹',
];

const promises = artists.map(async (artist) => {
  try {
    const id = await db('artist')
      .insert({ name: artist })
      .returning('id');
    console.log(`${artist} inserted with id ${id}`);
  } catch (err) {
    console.error(`Inserting ${artist} failed!\n${err}`);
  }
});

Promise.all(promises)
  .then(() => {
    console.log('All done!');
    process.exit();
  });
