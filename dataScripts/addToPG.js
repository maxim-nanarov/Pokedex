const { MongoClient } = require('mongodb')
const path = require('path');
const fs = require('fs');
const {pool,Client, Connection} = require('pg');


//import { password } from '../backend/MongoPassword';

const filePath = path.join(__dirname, "../data/data.json");
const readFileData = JSON.parse(fs.readFileSync(filePath, "utf8"));

const client = new Client({
	connectionString:
		"postgres://jlsgteqzdwurvd:260d62c8313ea6ff5b065e1daffeee15f8265eb6ef8bbf95004259d724d3c994@ec2-18-214-35-70.compute-1.amazonaws.com:5432/dbn3u135unbqt5",
	ssl: {
		rejectUnauthorized: false,
	},
});

client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    daleho();
  });

async function createTable(client) {
    client.query("Drop TABLE IF EXISTS pokemon");
    let text = "CREATE TABLE pokemon (ID SERIAL PRIMARY KEY,photoURL VARCHAR(255) NOT NULL,name VARCHAR(255) NOT NULL,type VARCHAR(255) NOT NULL,height integer NOT NULL,weight integer NOT NULL);"
    client.query(text, (err) => {
        if (err) throw err;
    })
}

 async function insertTable(client) {
    let text = "INSERT INTO pokemon (ID,photoURL ,name ,type, height,weight) VALUES ";
    let statements = readFileData;
    // console.log(statements[15]);
    for (let i = 0; i < statements.length; i++) {
        let row = Object.values(statements[i]);
        
        text += `(${i},'${row[0]}','${row[1]}','${row[2]}',${row[3]},${row[4]}),`
    }
    text = text.slice(0,text.length -1) + ";";
    client.query(text);
}

async function daleho(){ 
    await createTable(client);
    await insertTable(client);
}




