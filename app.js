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

 MongoClient.connect(url, function(err, db) {
  var wins;
  var count = 0;
        assert.equal(null, err);
             db.collection('scores').find( { user:user } ).count(function(err,results){
                     count = results;
                     if (count>0) 
                       {
                          wins = wins + status;
                          // console.log("here"+user);
                          // var s = status + 0;
                          db.collection('scores').update(
                                 { user: user },
                                 { $inc: { wins: 1} }
                                ) 
                       }
                       else
                       {
                          wins = 1;
                          var stext = {
                              user : user,
                              wins : wins
                            };

                          // console.log("there"+user);

                            db.collection("scores").insert(stext, function(err, r) {
                              assert.equal(null, err);
                              assert.equal(1, r.insertedCount);

                                db.close();
                            });
                       }

                     
               });

             // console.log(count);
             

      

     



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









