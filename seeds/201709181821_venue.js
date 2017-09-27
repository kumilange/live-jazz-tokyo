/* eslint-disable no-console */

const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig);

const rndLat = () => (Math.random() * (35.704248 - 35.661167)) + 35.661167;
const rndLng = () => (Math.random() * (139.769388 - 139.716144)) + 139.716144;

const venues = [
  { lat: rndLat(), lng: rndLng(), name: '杜のうた', address: '東京都港区赤坂３丁目６−１８ 赤坂ニューロイヤルビル本館 B1F' },
  { lat: rndLat(), lng: rndLng(), name: 'ジャズピアノクラブJOE', address: '東京都港区赤坂2－13－8 ロイヤルプラザB1F' },
  { lat: rndLat(), lng: rndLng(), name: 'Blue Note Tokyo', address: '東京都港区南青山６丁目３−１６ ライカビル' },
  { lat: rndLat(), lng: rndLng(), name: '六本木サテンドール', address: '東京都港区六本木６丁目１−８ 六本木グリーンビルディング' },
  { lat: rndLat(), lng: rndLng(), name: 'Billboard Live TOKYO', address: '東京都港区赤坂９丁目７−４' },
  { lat: rndLat(), lng: rndLng(), name: 'Red Pepper', address: '東京都豊島区西池袋１丁目３７−１５ 西形ビル 5F' },
  { lat: rndLat(), lng: rndLng(), name: '9th Chord', address: '東京都港区赤坂６丁目１９−４７' },
  { lat: rndLat(), lng: rndLng(), name: '橋の下', address: '東京都港区赤坂３丁目7-15 B1' },
  { lat: rndLat(), lng: rndLng(), name: 'チャーリーズ・クラブ', address: '東京都港区六本木５丁目９−１４ 第 7 ビレッジ ビル B1F' },
  { lat: rndLat(), lng: rndLng(), name: 'november eleventh', address: '東京都港区赤坂３丁目１７−８' },
];

exports.seed = () => {
  const promises = venues.map((venue) => {
    return db('venue')
      .insert(venue)
      .returning('id');
  });

  return Promise.all(promises);
};
