const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
require('dotenv').config();


var count = 0;

const app = express();

// for json data from client
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// spa base route
app.use(express.static(path.join(__dirname, 'client/build')));
// Index route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});



app.post('/test', (req, res) => {
    console.log("working", count++);
    console.log(req.body)
    res.send({ testdata: "test mesasdfasdfsage" })
});

// const { Client } = require('pg')

// const client = new Client({
//     user: process.env.RDS_USERNAME,
//     host: process.env.RDS_HOSTNAME,
//     database: process.env.RDS_DB_NAME,
//     password: process.env.RDS_PASSWORD,
//     port: process.env.RDS_PORT,
// })
// client.connect()
//     .then(() => console.log("connected to database successfully"))
//     .catch(err => console.log(err))

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);