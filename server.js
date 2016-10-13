var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 1024;
var http = require('http').Server(app);
var iplocation = require('iplocation');
var schedule = require('node-schedule');
var request = require('request');

schedule.scheduleJob('2 22 15 * * *', function(){
  request.post("http://ssk.lokalnytt.se/rosta/20109").on("response", function(response){
    console.log(response.statusCode);
  });
})

app.use(express.static(__dirname+"/public"));

app.get('/', function(req,resp){

iplocation(req.ip, function(error, res){
  var currentTime = new Date();
  console.log(currentTime+" | "+req.ip+" | country: "+ res.country_name+", city: "+res.city)
})
    resp.sendFile(__dirname+"/index.html")
});

var server = http.listen(port,"192.168.0.11", function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)

});
