// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
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
  .get((req, res) => {
    console.log('GET request detected');
    res.send(`Lab 5 for ${process.env.NAME}`);
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);

    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    console.log('data from fetch', json);
    res.json(json);
  });

function databaseInitialize() {
  const db = new sqlite3.Database('./config.js', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

  const dbSchema = `CREATE TABLE IF NOT EXISTS food (
    name text NOT NULL PRIMARY KEY,
    category text NOT NULL UNIQUE,
    inspection_date text NOT NULL,
    inspection_results text NOT NULL UNIQUE,
    city text,
    state text,
    zip integer,
    owner text,
    type text
);`;

  db.run(dbSchema);

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  databaseInitialize();
  console.log('Connected to the database');
});
