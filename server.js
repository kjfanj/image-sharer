const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const uuidv4 = require('uuid/v4');
const AWS = require('aws-sdk');
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

// aws s3 get presigned
// async function getPresignedUploadUrl(bucket, directory) {
//     const key = `${directory}/${uuidv4()}`;
//     const url = await s3
//         .getSignedUrl('putObject', {
//             Bucket: bucket,
//             Key: key,
//             ContentType: 'image/*',
//             Expires: 300,
//         })
//         .promise();
//     return url;
// }

// console.log(getPresignedUploadUrl("image-sharer-store", "UserUpload"))


var params = { Bucket: 'image-sharer-store', Key: 'key' };
s3.getSignedUrl('putObject', params, function (err, url) {
    console.log('The URL is', url);
});



0
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

