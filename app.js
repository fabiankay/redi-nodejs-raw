var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.sendFile('Hallo Welt');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
  
// POST method route
app.post('/', function (req, res) {
    console.log('Post Request successful')
});