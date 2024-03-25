var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://sharukajmal2:SharukDB%40123@cluster0.cfzoga8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

console.log("entered");

//node demosort.js

function a() {
    console.log("connected");
MongoClient.connect(url, function(err, db) {
    console.log("connected");
    var dbo = db.db("WASender");
    dbo.collection("scheduler").find().toArray(function(err, result) {
      if (err) throw err;
      console.log(result);  
      db.close();
    });
  }); 
};
a();