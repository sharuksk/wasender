const express = require("express");
const app = express();
const http = require("https");
const server = http.createServer(app);
const cors = require("cors");
const schedule = require("node-schedule") ;

const port = process.env.PORT || 3000;
// const mongodb = require("mongodb");
// const { MongoClient, ServerApiVersion } = require('mongodb');

const Scheduler = require("./scheduler");
const mongoose = require("mongoose");
const db="mongodb+srv://sharukajmal2:SharukDB%40123@cluster0.cfzoga8.mongodb.net/WASender"
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => consonle.log(err));
//const uri = "mongodb+srv://sharukajmal2:SharukDB%40123@cluster0.cfzoga8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//Scheduler Related Codes
//=====================================================================================================

// const date= "Sat Mar 23 2024 13:53:22 GMT+0300 (Arabian Standard Time)";


// const job = schedule.scheduleJob(date, function(){
//   console.log("Triggered")
// });

const path = require("path");
const hbsPath = path.join(__dirname, "./client");
app.set('view engine', "hbs");
app.set("views", hbsPath);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req,res) => {
  res.render("index")
} );



//Store date in the DB
app.post('/sendMsgScheduler', async (req, res) =>{
  try{
    const msg = req.body.msg;
    Scheduler.insertMany([{msg}]);    
    res.end();
  }
  catch(err){
    console.log(err);
  }
  
});

// let date;
// async function Call() {
//   const client = new MongoClient(uri);
//   //const query = {msg: "2024-03-23T17:21"}
//   const db = await client.db("WASender");
//   //const collection = await db.collection("scheduler");
//   let getData= await db.collection("scheduler").find().sort({msg: 1}).toArray();
//   //console.log(getData);
//   client.close();
//   return getData;
// }



async function a (){
  try{
    var date;
    var date = await  Scheduler.findOne().then(data=> date=data.msg);
    //console.log(date);
  }
  catch(err){
    console.log(err)
  }

}

// var promise=a() 

// promise.then((ans)=>{
//   result= ans 
//   }
//   )

//   console.log(promise);


// var date = [
//   {
//     _id: '65fee47b23c5f86ce04d5dfd',
//     msg: '2024-03-23T17:21'
//   },
//   {
//     _id: '65fee658c2a80b8f1248facf',
//     msg: '2024-03-23T17:28'
//   },
//   {
//     _id: '65ffccedc411acbfdbe9955b',
//     msg: '2024-03-24T09:53'
//   },
//   {
//     _id: '65ffcd24c411acbfdbe9955c',
//     msg: '2024-03-25T09:56'
//   },
//   {
//     _id: '65ffcdb3fc9123c547ce3d4c',
//     msg: '2024-03-29T13:59'
//   }
// ]

const cron = require('node-cron');

// Schedule the cron job to run every minute
cron.schedule('* * * * *', () => {
  a ();
});

async function a (){
  try{
    var date;
    var date = await  Scheduler.findOne().then(data=> date=data.msg);
    console.log(date);
    jobCall(date);
  }
  catch(err){
    console.log(err)
  }

}
a ();
function jobCall(vardate){
const job = schedule.scheduleJob(vardate, function(){
    console.log("Triggered with a msg")
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
        "token": "tz4c7nm9r4luh6i4",
        "to": "+919500310909",
        "body": `Hari trigger ${vardate}`
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
}

//=====================================================================================================  
var qs = require("querystring");
const router = require("./routes/wasRoutes");
const bodyParser = require("body-parser");
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(
//   bodyParser.urlencoded({
//     limit: "50mb",
//     extended: true,
//     parameterLimit: 50000,
//   })
// );
// app.use(express.json());
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
