const { Client } = require('pg');

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


module.exports = {
    getAllImages: async () => {
        try {
            let result = await client.query('SELECT * FROM image')
            return result.rows
        } catch (e) {
            console.log(e)
        }
    },
    insertImageToDB: async (imageId, ImageName, storeLocation, imageDescription) => {
        console.log(`attempting to insert`)
        console.log([imageId, ImageName, storeLocation, imageDescription]);
        const text = 'INSERT INTO image(image_id, image_name, store_location, image_description, likes) VALUES($1, $2, $3, $4, $5) RETURNING *'
        const values = [imageId, ImageName, storeLocation, imageDescription, 0]
        try {
            await client.query(text, values);
        } catch (err) {
            console.log(err.stack)
        }
    }
}