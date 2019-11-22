const express = require('express');
const path = require('path');

const app = express();

console.log(__dirname);
// app.use(express.static(path.join(__dirname, 'client/public')));


const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);