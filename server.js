const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

// Index route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const { Client } = require('pg')

const client = new Client({
    user: process.env.RDS_USERNAME,
    host: process.env.RDS_HOSTNAME,
    database: process.env.RDS_DB_NAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
})
client.connect()
    .then(() => console.log("connected to database successfully"))
    .catch(err => console.log(err))

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);