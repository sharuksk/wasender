const express = require("express");
const app = express();
const http = require("https");
const server = http.createServer(app);
const cors = require("cors");
const schedule = require("node-schedule") ;

const port = process.env.PORT || 3000;
const mongodb = require("mongodb");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sharukajmal2:SharukDB%40123@cluster0.cfzoga8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const date= "Sat Mar 23 2024 13:53:22 GMT+0300 (Arabian Standard Time)";


// const job = schedule.scheduleJob(date, function(){
//   console.log("Triggered")
// });

//Scheduler

const date= "Sat Mar 23 2024 14:05:00 GMT+0300 (Arabian Standard Time)";

const job = schedule.scheduleJob(date, function(){
    console.log("Triggered")
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
        "token": "tz4c7nm9r4luh6i4",
        "to": "+919500310909",
        "body": "WhatsApp API on UltraMsg.com works good"
    });

    var config = {
    method: 'post',
    url: 'https://api.ultramsg.com/instance77326/messages/chat',
    headers: {  
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
  });

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

app.use(bodyParser.json());
app.listen(port, () => {
  console.log("app wasrendereing", port);
});
