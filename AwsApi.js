const uuidv4 = require('uuid/v4');
const AWS = require('aws-sdk');

// load aws config
AWS.config.loadFromPath('./AwsConfig.json');
const s3 = new AWS.S3();

require('dotenv').config();

module.exports = {
    // get presigned url for user to upload
    getSignedUrl: (path) => {
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
}
