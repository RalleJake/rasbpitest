var express = require('express');
var app = express();
var port = process.env.PORT || 1337;
var http = require('http').Server(app);

app.use(express.static('site'));

app.get('/', function(res,req){
    res.sendFile('index.html');
});

var server = http.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)

});
