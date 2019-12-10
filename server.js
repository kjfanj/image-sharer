const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const uuidv4 = require('uuid/v4');
const AWS = require('aws-sdk');

// load config for aws
AWS.config.loadFromPath('./AwsConfig.json');
const s3 = new AWS.S3();
// for env variable
require('dotenv').config();

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


// current test route
app.post('/addimage', (req, res) => {
    // console.log(req.body);
    console.log("clicked addimage")
    res.send({ data: "testdatafromserver" })
});

// get presigned for user to upload
function getSignedUrlTest() {
    let params = { Bucket: process.env.AWS_S3_BUCKETNAME, Key: process.env.AWS_S3_KEY };

    s3.getSignedUrl('putObject', params, function (err, url) {
        if (err) {
            console.log(err)
        }
        console.log('The URL is', url);
        return url;
    });
}

console.log(getSignedUrlTest());




// connect to aws rds postgres db
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

