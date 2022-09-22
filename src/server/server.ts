import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { Client } from 'pg';
// import { start } from 'repl';

const app: Express = express();
app.use(cors());
app.use(json());


let startIndex=0;
let endIndex=20;

app.use(express.static("./dist"));

const client = new Client({
  connectionString:
    "postgres://jlsgteqzdwurvd:260d62c8313ea6ff5b065e1daffeee15f8265eb6ef8bbf95004259d724d3c994@ec2-18-214-35-70.compute-1.amazonaws.com:5432/dbn3u135unbqt5",
  ssl: {
    rejectUnauthorized: false,
  },
});

//connects the client to the database
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// @ts-ignore

//gets the data from the database based on the ID so that it wont be 1000 requests to the server at the same time.
app.get('/pokemon', (req, response) => {
  console.log("Get");
  client.query(`SELECT * FROM pokemon Where ID < ${endIndex} and ID > ${startIndex};`, (err: Error, res: any) => {
    if (err) console.log(err);
    console.log(res.rows[0].photourl);
    response.status(200).json(res.rows);
    endIndex += 20; 
    startIndex += 20;
  });
});

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});