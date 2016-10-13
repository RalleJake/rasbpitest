var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 1024;
var http = require('http').Server(app);
var iplocation = require('iplocation');
var schedule = require('node-schedule');
var request = require('request');
var cheerio = require("cheerio");



schedule.scheduleJob('2 22 15 * * *', function(){
  request({
    uri: "http://ssk.lokalnytt.se/rosta/20109",
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    $('input').map(function(i, link){
      if($(link).attr('name') == "_token"){

        var valueInput = $(link).attr('value');
        var fd = {_token : valueInput};
        
        request.post({url:"http://ssk.lokalnytt.se/rosta/20109", formData:fd}).on("response", function(response, err, html){
          console.log(response.statusCode);
          console.log(html);
        });


      }
    })
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

var server = http.listen(port,"localhost", function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)

});
