/* eslint-disable no-console */

const fs = require('fs');

const eventNames = [
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

const artistNames = [
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

const venueNames = [
  '杜のうた',
  'ジャズピアノクラブJOE',
  'Blue Note Tokyo',
  '六本木サテンドール',
  'Billboard Live TOKYO',
  'Red Pepper',
  '9th Chord',
  '橋の下',
  'チャーリーズ・クラブ',
  'november eleventh',
];

const rndInt = num => Math.floor(Math.random() * num);

const list = [];

eventNames.forEach((event) => {
  artistNames.forEach((artist) => {
    venueNames.forEach((venue) => {
      const start = new Date(2017, 8 + rndInt(2), 1 + rndInt(31), 17 + rndInt(3), rndInt(2) * 30);
      const end = new Date(2017, start.getMonth(), start.getDate(), 20 + rndInt(3), rndInt(2) * 30);
      list.push({
        event,
        artist,
        venue,
        price: (rndInt(7) * 500) + 2000,
        start,
        end,
      });
    });
  });
});

fs.writeFileSync('../data/events.json', JSON.stringify(list));
console.log('All done!');
process.exit();
