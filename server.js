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
    let curId = uuidv4();
    let keyPath = `${curId}-${req.body.filename}`;
    try {
        let signedUrl = await AWSApi.getSignedUrl(keyPath);
        res.send({ signedUrl: signedUrl });
    } catch (err) {
        console.log(err);
    }
});

// check if client successfully added image
app.post('/imageuploadstatus', (req, res) => {
    if (req.body.didImageUpload === true) {
        console.log(`image upload succeeded`);
        // update to database
        insertImageToDB(req.body.id, req.body.imageName, req.body.imageLocation, req.body.imageDescription);
        res.send({ didImageUpload: true });
    } else {
        console.log(`image upload failed`);
    }
});

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
    .catch(err => console.log(err));




client
    .query('select * from image')
    .then(res => {
        // console.table(res.rows)
        res.rows.map(item => {
            console.log(item.store_location)
        })
    })
    .catch(e => console.error(e.stack));

insertImageToDB = async (imageId, ImageName, storeLocation, imageDescription) => {
    console.log(`attempting to insert`)
    console.log([imageId, ImageName, storeLocation, imageDescription]);
    const text = 'INSERT INTO image(image_id, image_name, store_location, image_description, likes) VALUES($1, $2, $3, $4, $5) RETURNING *'
    const values = [imageId, ImageName, storeLocation, imageDescription, 0]
    try {
        await client.query(text, values)
    } catch (err) {
        console.log(err.stack)
    }
}

const port = process.env.PORT || 5000;
app.listen(port);