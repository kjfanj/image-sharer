const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const uuidv4 = require('uuid/v4');
const AWS = require('aws-sdk');

// load aws config
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
// get presignedURL and send it back to client
app.post('/addimage', async (req, res) => {
    console.log("client clicked upload image")
    console.log(req.body);
    let keyPath = `${uuidv4()}-${req.body.filename}`;
    console.log(`keyPath: ${keyPath}`)
    let presignedURL = await getSignedUrl(keyPath);
    console.log(`post request attemptig to send ${presignedURL}`);


    res.send({ data: presignedURL })

});


// get presigned url for user to upload
getSignedUrl = (path) => {
    return new Promise((resolve, reject) => {
        let params = {
            Bucket: process.env.AWS_S3_BUCKETNAME,
            Key: path,
            ContentType: 'image/*',
            Expires: 300
        };
        s3.getSignedUrl('putObject', params, (err, url) => {
            if (err) {
                reject(err)
            }
            resolve(url);
        });
    });


}

// console.log(getSignedUrl());




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

