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

exports.seed = () => {
  const promises = artists.map((artist) => {
    return db('artist')
      .insert({ name: artist })
      .returning('id');
  });

  return Promise.all(promises);
};
