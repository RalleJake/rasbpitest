var express = require('express');
var app = express();
var port = process.env.PORT || 1337;
var http = require('http').Server(app);


app.get('/', function(req,res){
    res.sendFile(__dirname+"/index.html")
});

var server = http.listen(port,"192.168.0.8", function () {
    
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)

});
