const fs = require('fs');
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig);

exports.seed = () => {
  const filenames = fs.readdirSync('./server/data/img');
  const promises = filenames.map(async (file) => {
    try {
      const image = fs.readFileSync(`./server/data/img/${file}`).toString('base64');
      const id = await db('event_img')
        .insert({ image })
        .returning('id');
      console.log(`${image} inserted with id ${id}`);
    } catch (err) {
      console.error(`Inserting image failed!\n${err}`);
    }
  });

  return Promise.all(promises);
};
