// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

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

app.route('/api')
  .get(async (req, res) => {
    console.log('GET request detected');
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    console.log('data from fetch', json);
    res.json(json);
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);

    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    console.log('data from fetch', json);
    res.json(json);
  });

// SQLite Settings

const dbSettings = {
  filename: './tmp/database.db',
  driver: sqlite3.Database
};

async function foodDataFetcher() {
  const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const json = await data.json();
  console.log('data from fetch', json);
  return json;
}

async function dataInput(data, db) {
  try {
    const rName = data.name;
    const rCategory = data.category;

    await db.exec(
      `INSERT INTO food (restaurant_name, category)
      VALUES ("${rName}", "${rCategory}")`
    );
    console.log(`${rName} and ${rCategory} inserted`);
  } catch (e) {
    console.log('Error on insertion');
    console.log(e);
  }
}

async function databaseInitialize() {
  try {
    const db = await open(dbSettings);
    await db.exec(`CREATE TABLE IF NOT EXISTS food (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      restaurant_name TEXT,
      category TEXT,
      inspection_date TEXT,
      inspection_results TEXT,
      city TEXT,
      state TEXT,
      zip INTEGER,
      owner TEXT,
      type TEXT)
      `);

    const data = await foodDataFetcher();

    data.forEach((entry) => { dataInput(entry, db); });

    const test = await db.get('SELECT * FROM food');
    console.log(test);

    console.log('Database connected.');
  } catch (e) {
    console.log('Error loading Database.');
    console.log(e);
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  databaseInitialize();
  console.log('Connected to the database');
});

app.route('/sql')
  .get((req, res) => {
    console.log('GET request detected');
    res.send(`Lab 5 for ${process.env.NAME}`);
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);

    const json = await data.json();
    console.log('data from fetch', json);
    res.json(json);
  });
