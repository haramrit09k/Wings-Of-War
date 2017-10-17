var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');
// var db = require('./db.js');
var user;
var status;

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/wow';
//http://202.177.233.119:3000/
var assert = require('assert');


app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/',function(req,res){

    res.sendFile(__dirname+'/index.html');

});


server.listen(process.env.PORT || 3000,function(){
    console.log('Listening on '+server.address().port);
});

app.post('/send', function(req, res) {
  user = req.body.user;
  status = req.body.status;
  console.log(user);
  console.log(status);
  sendText();
  res.redirect('/');
  
});



function sendText(){


      var stext = {
            user : user,
          };


      MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection("scores").insert(stext, function(err, r) {
          assert.equal(null, err);
          assert.equal(1, r.insertedCount);

            db.close();
          });



  });
}

app.get('/get', function(req, res) {

    // var results;
    // MongoClient.connect(url, function(err, db) {
    //    assert.equal(null, err);
                        
    //           db.collection("scores").find({}, "score username", {sort: {'score': 'desc' }}, function (err, results){
    //             // console.log(results);
    //             res.send(results);
    //           });
  
    //   });

    var results;
    MongoClient.connect(url, function(err, db) {
       assert.equal(null, err);
                db.collection('scores').find().sort().toArray(function(err, results){
                      // document.write(results);
                      // console.log(results);
                      return res.send(results);
                      // return res.json(results);
                });
  
      });

    

});









