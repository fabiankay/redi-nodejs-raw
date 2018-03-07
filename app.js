/* Imports */
var express = require('express');

/* Configuration */
var app = express();

app.get('/', function (req, res) {
    /* '/' GET-Request */
    res.sendFile('Hallo Welt');
});

app.listen(3000, function () {
    /* Server started */
    console.log('Example app listening on port 3000!');
});
  
// POST method route
app.post('/', function (req, res) {
    /* '/' POST-Request */
    console.log('Post Request successful')
});