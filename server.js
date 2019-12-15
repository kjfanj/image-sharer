const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const uuidv4 = require('uuid/v4');
const AWSApi = require('./AwsApi');

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

// get presignedURL and send it back to client
app.post('/getsignedurl', async (req, res) => {
    let imageDescription = req.body.imageDescription;
    let keyPath = `${uuidv4()}-${req.body.filename}`;
    try {
        let signedUrl = await AWSApi.getSignedUrl(keyPath);
        console.log(`successfully retrieved signedUrl from s3`);
        res.send({ signedUrl: signedUrl });
    } catch (err) {
        console.log(`failed to get signedUrl from s3`);
        console.log(err);
    }
});

// get presignedURL and send it back to client
// app.post('/addimage', async (req, res) => {
//     let keyPath = `${uuidv4()}-${req.body.filename}`;
//     let presignedURL = await getSignedUrl(keyPath);
//     res.send({ data: presignedURL })
// });

// connect to aws rds postgres db
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