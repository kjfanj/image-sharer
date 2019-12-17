const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');

const AWSApi = require('./AwsApi');
// const DbAccess = require('./DbAccess');
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
        // DbAccess.insertImageToDB(req.body.id, req.body.imageName, req.body.imageLocation, req.body.imageDescription);
        res.send({ didImageUpload: true });
    } else {
        console.log(`image upload failed`);
    }
});
// DbAccess.getAllImages();

const port = process.env.PORT || 5000;
app.listen(port);