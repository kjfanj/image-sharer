const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'client/public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
app.get('/123', (req, res) => {
    res.status('200').send("Status: ok!");
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);