const express = require("express");
const app = express();
const http = require("https");
const server = http.createServer(app);
const cors = require("cors");
const port = 3000;
const { MongoClient, ObjectId, ChangeStream } = require("mongodb");
const mongodb = require("mongodb");
const url =
  "mongodb+srv://sharukajmal2:SharukDB%40123@cluster0.cfzoga8.mongodb.net/?retryWrites=true&w=majority";
var qs = require("querystring");
const router = require("./routes/wasRoutes");
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
// app.use("/ablelyfwas", "routes");
const routez = require("./routes/wasRoutes");
app.use("/ablelyfwas", routez);

//newly added---------------------------------------------------------------------------------------------------------------------

app.post("/ultramsgwebhook", async (req, res) => {
  // print all response
  const messageMsg = req.body["data"]["body"]; // Message text
  var to = req.body["data"]["from"];
  const client = await MongoClient.connect(url);
  const db = client.db("WASender");

    // await db.collection("trigger").insertOne({
    //       _id: 1,
    //       text: messageMsg
    //           });
    //   await client.close();

    let insertData = await db.collection("trigger").findOne({_id: 1});
    if (insertData) {
      if (messageMsg == 'Intro'){
        optionOne();
      }
      if (messageMsg == 'Prices'){
        optionTwo();
      }
      if (messageMsg == 'Details'){
        optionThree();
      }
        console.log("Already Triggered");
        await db.collection("trigger").findOneAndDelete({_id: 1})
    } 
    else{
      if (messageMsg == "Hi Sharuk") {
      triggerbot();
      await db.collection("trigger").insertOne({
          _id: 1,
          text: messageMsg
              });
      await client.close();
      }
      else {
        invalidBot()
      }
      console.log(insertData);
      console.log(req.body);
      res.status(200).end();
    }
    

  //Get received msg and from number
  //const messageFrom=req.body['data']['from'] // sender number
  

  // if (messageMsg == "Hi Sharuk") {
  //   //Trigger Bot
  //   console.log(req.body["data"]["body"]);
  //   res.status(200).end();
  //   triggerbot();
        
  //       // if (newMsg == 'Intro'){
  //       //   optionOne();
  //       // }
  //       // if (newMsg == 'Prices'){
  //       //   optionTwo();
  //       // }
  //       // if (newMsg == 'Details'){
  //       //   optionThree();
  //       // }
  //       // else {
  //       //   invalidBot()
  //       // }
  // }
  // if (messageMsg == 'Intro'){
  //   optionOne();
  // }
  // if (messageMsg == 'Prices'){
  //   optionTwo();
  // }
  // if (messageMsg == 'Details'){
  //   optionThree();
  // } 
  // else {
  //   console.log(req.body);
  //   console.log("Bot is not started");
  //   res.status(200).end();
  // }

  //Trigger Text Bot
  function triggerbot() {
    console.log("triggered");
    var options = {
      method: "POST",
      hostname: "api.ultramsg.com",
      port: null,
      path: "/instance77326/messages/chat",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });
    var postData = qs.stringify({
      token: "tz4c7nm9r4luh6i4",
      //"to": "120363158438640142@g.us",
      to: to,
      body: `Welcome You to our Product
                      Select your Query Option
                      1. Intro
                      2. Prices
                      3. Details`,
    });
    req.write(postData);
    req.end();
    console.log(req.body);
  }

  //Selecting Option 1
  function optionOne() {
    var options = {
      method: "POST",
      hostname: "api.ultramsg.com",
      port: null,
      path: "/instance77326/messages/image",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });
    var postData = qs.stringify({
      token: "tz4c7nm9r4luh6i4",
      to: to,
      image:
        "https://t4.ftcdn.net/jpg/03/17/25/45/360_F_317254576_lKDALRrvGoBr7gQSa1k4kJBx7O2D15dc.jpg",
      caption: `Intro Image`,
    });
    req.write(postData);
    req.end();

    console.log(req.body);
    res.status(200).end();
  }

  //Selecting Option 2
  function optionTwo() {
    var options = {
      method: "POST",
      hostname: "api.ultramsg.com",
      port: null,
      path: "/instance77326/messages/image",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });
    var postData = qs.stringify({
      token: "tz4c7nm9r4luh6i4",
      to: to,
      image:
        "https://t4.ftcdn.net/jpg/03/17/25/45/360_F_317254576_lKDALRrvGoBr7gQSa1k4kJBx7O2D15dc.jpg",
      caption: `Prices Image`,
    });
    req.write(postData);
    req.end();

    console.log(req.body);
    res.status(200).end();
  }

  //Selecting Option 3
  function optionThree() {
    var options = {
      method: "POST",
      hostname: "api.ultramsg.com",
      port: null,
      path: "/instance77326/messages/image",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });
    var postData = qs.stringify({
      token: "tz4c7nm9r4luh6i4",
      to: to,
      image:
        "https://t4.ftcdn.net/jpg/03/17/25/45/360_F_317254576_lKDALRrvGoBr7gQSa1k4kJBx7O2D15dc.jpg",
      caption: `Details Image`,
    });
    req.write(postData);
    req.end();

    console.log(req.body);
    res.status(200).end();
  }

  //messageFrom=req.body['data']['from'] // sender number
  //messageMsg=req.body['data']['body'] // Message text
  function invalidBot() {
    var options = {
      method: "POST",
      hostname: "api.ultramsg.com",
      port: null,
      path: "/instance77326/messages/chat",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });
    var postData = qs.stringify({
      token: "tz4c7nm9r4luh6i4",
      //"to": "120363158438640142@g.us",
      to: to,
      body: `Invalid Option`,
    });
    req.write(postData);
    req.end();

    console.log(req.body);
    res.status(200).end();
  }
});

//newly added---------------------------------------------------------------------------------------------------------------------
app.use(bodyParser.json());
app.listen(port, () => {
  console.log("app wasrendereing", port);
});
