// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import countries from './public/lab_6/countries.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function getRandomIntInclusive(min, max) {
  const min1 = Math.ceil(min);
  const max1 = Math.floor(max);
  return Math.floor(Math.random() * (max1 - min1 + 1) + min1);
  // The maximum is inclusive and the minimum is inclusive
}

app.route('/api')
  .get((req, res) => {
    console.log('GET request detected');
    res.send(`Lab 5 for ${process.env.NAME}`);
  })
  .post(async (req, res) => {
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    console.log('POST request detected');
    const json = await data.json();
    console.log('Fetch request data', data);
    res.json(json);
    res.json(countries);

    const arrayOfTenItems = range(10);
    const randomRestaurantsArray = arrayOfTenItems.map((item) => {
      const which = getRandomIntInclusive(0, json.length);
      const restaurant = json[which]; // we are not worrying about uniqueness here
      return restaurant;
    });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
