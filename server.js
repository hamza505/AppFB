var express = require('express');
app = express(),
  path = require('path'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  https = require('https'),
  Stream = require('stream').Transform,
  fs = require('fs');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/')));

app.post('/api/pictures', function (req, res) {
  var pictures = req.body;
  console.log(req.body);
  for (pic in pictures) {
    console.log(pic);
    https.request(pictures[pic], function (response) {
      var data = new Stream();
      response.on('data', function (chunk) {
        data.push(chunk);
      });
      response.on('end', function () {
        fs.writeFileSync('img/' + new Date().getTime() + '_img.png', data.read());
      });
      response.on('error', function () {
        res.send({ status: 'NOK' });
      });
    }).end();
  }
  res.send({ status: 'OK' });
});

app.get('*', function (req, res) {
  res.sendFile('index.html', { "root": __dirname });
});

app.listen(9001, function () {
  console.log('App listening on port 9001!');
});