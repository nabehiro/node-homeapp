var express = require('express');
var exec = require('child_process').exec;

var app = express();

app.get('/', async (req, res) => {
    console.log("[get] index");
    res.send("This is homeapp.");
});

app.get('/tv_turnon', async (req, res) => {
    console.log("[get] turn on");
    exec(`echo "on 0" | cec-client -s -d 1`, (err, stdout, stderr) => {
        console.log(err, stdout, stderr);
    });
    res.send("tv turn on");
});

app.get('/tv_turnoff', async (req, res) => {
    console.log("[get] turn off");
    exec(`echo "standby 0" | cec-client -s -d 1`, (err, stdout, stderr) => {
        console.log(err, stdout, stderr);
    });
    res.send("tv turn off");
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
  });