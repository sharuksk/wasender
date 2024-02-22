const express = require("express");
const app = express();
const http = require("https");
const server = http.createServer(app);
const cors = require("cors");

const port = process.env.PORT || 3000;
const mongodb = require("mongodb");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sharukajmal2:SharukDB%40123@cluster0.cfzoga8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
