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


// get presignedURL and send it back to client
app.post('/getsignedurl', async (req, res) => {
    let imageDescription = req.body.imageDescription;
    let keyPath = `${uuidv4()}-${req.body.filename}`;
    try {
        let signedUrl = await getSignedUrl(keyPath);
        console.log(`client requesting signedUrl`);
        console.log(`*************** image description ***************`);
        console.log(`"${imageDescription}"`);
        console.log(`s3 path is: https://image-sharer-app.s3.us-east-2.amazonaws.com/${keyPath}`);
        console.log(`*************** signedUrl ***************`);
        console.log(`${signedUrl}`);
        console.log(`sending signedUrl back to client`);
        res.send({ signedUrl: signedUrl })
    } catch (err) {
        console.log(`failed to get signedUrl from s3`)
        console.log(err);
    }
});


// get presignedURL and send it back to client
// app.post('/addimage', async (req, res) => {
//     let keyPath = `${uuidv4()}-${req.body.filename}`;
//     let presignedURL = await getSignedUrl(keyPath);
//     res.send({ data: presignedURL })
// });

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

