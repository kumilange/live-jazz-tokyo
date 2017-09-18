/* eslint-disable no-console */

const fs = require('fs');
const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig);

const filenames = fs.readdirSync('../data/img');
const promises = filenames.map(async (file) => {
  try {
    const image = fs.readFileSync(`../data/img/${file}`).toString('base64');
    const id = await db('event_img')
      .insert({ image })
      .returning('id');
    console.log(`${image} inserted with id ${id}`);
  } catch (err) {
    console.error(`Inserting image failed!\n${err}`);
  }
});

Promise.all(promises)
  .then(() => {
    console.log('All done!');
    process.exit();
  });

