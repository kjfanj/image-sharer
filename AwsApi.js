const uuidv4 = require('uuid/v4');
const AWS = require('aws-sdk');

require('dotenv').config();

process.env.AWS_SDK_LOAD_CONFIG = true;
AWS.config.update({ accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, region: process.env.AWS_S3_REGION });
const s3 = new AWS.S3();

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
