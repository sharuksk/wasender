const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const port = 3006;
const WhatsApp = require("whatsapp");
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

app.listen(port, () => {
  console.log("app wasrendereing", port);
});
