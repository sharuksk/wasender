const uniqid = require("uniqid");
//const { MongoClient, ObjectId, ChangeStream } = require("mongodb");
const mongodb = require("mongodb");
const http = require("https");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sharukajmal2:SharukDB%40123@cluster0.cfzoga8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const url =
//   "mongodb+srv://yadharth:1234567890@wasender.qenvxus.mongodb.net/?retryWrites=true&w=majority";
// const url =
//   "mongodb+srv://sharukajmal2:SharukDB%40123@cluster0.cfzoga8.mongodb.net/?retryWrites=true&w=majority";
const axios = require("axios");
const qs = require("qs");
const nodeBase64 = require("nodejs-base64-converter");

//////////devices(instances)
exports.handleSetDevices = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("WasSender");

    let dataObj = {
      admin: req.body?.admin,
      adminID: req.body?.adminID,
      name: req.body.name,
      number: req.body.number,
      instanceID: "#######",
      token: "#########",
      deviceID: uniqid(),
      authenthicate: false,
      created: new Date(),
      paid: "",
      expiry: "",
      status: "Inactive",
    };
    let insertData = await db.collection("devices").insertOne(dataObj);
    await client.close();
    res.json({
      message: "set success",
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "set failure",
    });
  }
};
exports.handleGetDevices = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("WasSender");
    let insertData = await db.collection("devices").find({}).toArray();
    await client.close();
    res.json({
      arrData: insertData,
      message: "receive Sucess",
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "receive failure",
    });
  }
};
exports.handleInstance = async (req, res) => {
  try {
    let dataObj = req.body;
    let config = {
      method: "get",
      url: `https://api.ultramsg.com/${dataObj.instanceID}/instance/status`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        token: dataObj.token,
      },
    };

    axios(config)
      .then(async (response) => {
        /////////
        console.log(response?.data?.status);

        if (response?.data?.status?.accountStatus?.status === "authenticated") {
          console.log("authenthicated");
          const client = await MongoClient.connect(url);
          const db = client.db("WasSender");
          await db.collection("devices").findOneAndUpdate(
            {
              _id: new ObjectId(dataObj["_id"]),
            },
            {
              $set: {
                authenthicate: true,
              },
            }
          );

          await client.close();
          res.json({
            message: response?.data?.status?.accountStatus?.status,
          });
        } else if (
          response?.data?.status?.accountStatus?.status === "standby"
        ) {
          console.log("still in stanby");
          res.json({
            message: response?.data?.status?.accountStatus?.status,
          });
        } else if (
          response?.data?.status?.accountStatus?.status === "loading"
        ) {
          await this.handleInstance(req, res);
        }

        //////////
      })
      .catch((error) => {
        res.json({
          message: "thirdParty Failure",
        });
      });
  } catch (err) {
    console.log(err);
    res.json({
      message: "instance failure",
    });
  }
};

const handleInsStatus = () => {
  try {
  } catch (err) {
    console.log(err);
  }
};
//doubts
exports.handleInstanceChange = async (req, res) => {
  try {
    let { dataObj, type } = req.body;
    const client = await MongoClient.connect(url);
    const db = client.db("WasSender");
    console.log(dataObj, type);
    if (type === "status") {
      await db.collection("devices").findOneAndUpdate(
        {
          _id: new ObjectId(dataObj["_id"]),
        },
        {
          $set: {
            authenthicate: true,
          },
        }
      );
    }
    await client.close();
    res.json({
      message: `${type} changed`,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: `${type} failure`,
    });
  }
};
exports.handleInstanceDetails = async (req, res) => {
  try {
    let dataObj = req.body;

    let config = {
      method: "get",
      url: `https://api.ultramsg.com/${dataObj.instanceID}/messages/statistics`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        token: dataObj.token,
      },
    };

    axios(config)
      .then((response) => {
        res.json({
          message: response.data,
        });
      })
      .catch((error) => {
        res.json({
          message: "thirdParty Failure",
        });
      });
  } catch (err) {
    console.log(err);

    res.json({
      message: `details failure`,
    });
  }
};
exports.handleQrCode = async (req, res) => {
  try {
    let dataObj = req.body;
    console.log(dataObj.instanceID, dataObj.token);
    let config = {
      method: "get",
      url: `https://api.ultramsg.com/${dataObj.instanceID}/instance/qr`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        token: dataObj.token,
      },
    };

    axios(config)
      .then((response) => {
        console.log("finished");
        res.json({
          message: true,
        });
      })
      .catch((error) => {
        res.json({
          message: "thirdParty Failure",
        });
      });
  } catch (err) {
    console.log(err);
    res.json({
      message: "qr failure",
    });
  }
};

//
exports.handleSetContacts = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("WasSender");

    let dataObj = {
      admin: req.body?.admin,
      adminID: req.body?.adminID,
      name: req.body.name,
      number: req.body.number,
      created: new Date(),
      contactID: uniqid(),
    };
    let insertData = await db.collection("contacts").insertOne(dataObj);
    await client.close();
    res.json({
      message: "set success",
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "set failure",
    });
  }
};
exports.handleEditContacts = async (req, res) => {
  try {
    console.log(req.body.dataObj, req.body.contact);
    const client = await MongoClient.connect(url);
    const db = client.db("WasSender");

    let updateData = await db.collection("contacts").findOneAndUpdate(
      { _id: new ObjectId(req.body.contact["_id"]) },
      {
        $set: {
          name: req.body.dataObj.name,
          number: req.body.dataObj.number,
        },
      }
    );
    await client.close();
    res.json({
      message: "update success",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.handleBulkContacts = async (req, res) => {
  try {
    console.log(req.body);
    const client = await MongoClient.connect(url);
    const db = client.db("WasSender");

    let dataObj = {
      admin: req.body?.admin,
      adminID: req.body?.adminID,
      name: req.body.name,
      number: req.body.number,
      created: new Date(),
      contactID: uniqid(),
    };
    let insertData = await db.collection("contacts").insertOne(dataObj);
    await client.close();
    res.json({
      message: "set success",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.handleGetContacts = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("WasSender");
    let getData = await db.collection("contacts").find({}).toArray();
    await client.close();
    res.json({
      msgArr: getData,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.handleDeleteContacts = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("WasSender");
    console.log(req.body);
    let getData = await db
      .collection("contacts")
      .deleteMany({ _id: new ObjectId(req.body["_id"]) });
    await client.close();
    res.json({
      msgArr: "del succ",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.handleSendMsg = (req, res) => {
  try {
    console.log(req.body);
    let dataObj = req.body;
    let toDataNumbers = dataObj.to;
    console.log(toDataNumbers);
    for (let i = 0; i < toDataNumbers.length; i++) {
      let data;

      if (dataObj.type === "chat") {
        data = qs.stringify({
          token: `${dataObj.from.token}`,
          to: `+${toDataNumbers[i].number}`,
          body: `${dataObj.body}`,
        });
      } else if (dataObj.type === "contact") {
        data = qs.stringify({
          token: `${dataObj.from.token}`,
          to: `+${toDataNumbers[i].number}`,
          contact: `${dataObj.body}@c.us`,
        });
      } else if (dataObj.type === "document") {
        console.log(dataObj.fileName);
        data = qs.stringify({
          token: dataObj.from.token,
          to: `+${toDataNumbers[i].number}`,
          filename: dataObj.fileName,
          document: dataObj.file,
          caption: dataObj.body,
        });
      } else if (dataObj.type === "image") {
        data = qs.stringify({
          token: `${dataObj.from.token}`,
          to: `+${toDataNumbers[i].number}`,
          image: `${dataObj.file}`,
          caption: `${dataObj.body}`,
        });
      } else if (dataObj.type === "video") {
        data = qs.stringify({
          token: `${dataObj.from.token}`,
          to: `+${toDataNumbers[i].number}`,
          video: `${dataObj.file}`,
          caption: `${dataObj.body}`,
        });
      } else if (dataObj.type === "audio") {
        data = qs.stringify({
          token: `${dataObj.from.token}`,
          to: `+${toDataNumbers[i].number}`,
          audio: `${dataObj.file}`,
        });
      } else if (dataObj.type === "location") {
        data = qs.stringify({
          token: `${dataObj.from.token}`,
          to: `+${toDataNumbers[i].number}`,
          address: `${dataObj.body}`,
          lat: `${dataObj.lat}`,
          lng: `${dataObj.lng}`,
        });
      }

      let config = {
        method: "post",
        url: `https://api.ultramsg.com/${dataObj.from.instanceID}/messages/${dataObj.type}`, //type
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config).then((ress) => {
        console.log(ress.data);
      });
    }

    res.json({
      message: "sent",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.handleImportBulk = async (req, res) => {
  try {
    const params = {
      token: "gwab0rhjqpa8d539",
    };

    const config = {
      method: "get",
      url: "https://api.ultramsg.com/instance77445/contacts",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: params,
    };

    await axios(config).then(async (obj) => {
      let dataObj = [],
        postObj = [];

      if (obj?.data.length) {
        let arrObj = obj?.data;

        for (let i = 0; i < arrObj.length; i++) {
          if (
            arrObj[i] &&
            !arrObj[i].isGroup &&
            arrObj[i].name &&
            arrObj[i].number
          ) {
            dataObj.push(arrObj[i]);
            postObj.push({
              name: arrObj[i].name,
              number: arrObj[i].number,
              created: new Date(),
              contactID: uniqid(),
              finalno: arrObj[i].number,
            });
          }
        }

        const client = await MongoClient.connect(url);
        const db = client.db("WasSender");
        let insertData = await db.collection("contacts").insertMany(postObj);
        await client.close();
        res.json({
          arrData: postObj,
          message: "success",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
exports.handleDuplicates = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("WasSender");
    let getData = await db.collection("contacts").find({}).toArray();
    let arrObj = [];

    for (let i = 0; i < getData.length; i++) {
      if (!arrObj.includes(getData[i].number)) {
        arrObj.push(getData[i].number);
      } else {
        await db
          .collection("contacts")
          .deleteOne({ _id: new ObjectId(getData[i]["_id"]) });
      }
    }

    await client.close();
    res.json({
      message: "duplicates deleted",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.handleLogMessages = async (req, res) => {
  try {
    let dataObj = req.body;
    console.log(dataObj);
    let params = {
      token: dataObj.token,
      page: 1,
      limit: 100,
      status: "all",
      sort: "desc",
    };

    let config = {
      method: "get",
      url: `https://api.ultramsg.com/${dataObj.instanceID}/messages`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: params,
    };

    await axios(config).then((response) => {
      res.json({
        message: response.data,
      });
    });
  } catch (err) {
    console.log(err);
  }
};
exports.handleLogChats = async (req, res) => {
  try {
    let { fromSelect, toSelect } = req.body;
    console.log(
      fromSelect.token,
      `${toSelect.number}@c.us`,
      fromSelect.instanceID
    );
    let params = {
      token: fromSelect.token,
      chatId: `${toSelect.number}@c.us`,
      limit: 100,
    };

    let config = {
      method: "get",
      url: `https://api.ultramsg.com/${fromSelect.instanceID}/chats/messages`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: params,
    };

    axios(config).then((response) => {
      res.json({
        message: response.data,
      });
    });
  } catch (err) {
    console.log("err");
  }
};
exports.handleCreateReply = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("WasSender");

    let dataObj = req.body;
    let postData = await db.collection("reply").insertOne(dataObj);
    await client.close();
    res.json({
      msg: "posted success",
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: err,
    });
  }
};
exports.handleGetReply = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("WasSender");
    let getData = await db.collection("reply").find({}).toArray();
    await client.close();
    res.json({
      msg: getData,
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: err,
    });
  }
};
exports.handleIdReply = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("WasSender");
    let getData = await db
      .collection("reply")
      .findOne({ _id: new ObjectId(req.body.id) });
    await client.close();
    res.json({
      msg: getData,
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: err,
    });
  }
};
exports.handleDeleteReply = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("WasSender");
    let dataObj = req.body;
    let getData = await db
      .collection("reply")
      .findOneAndDelete({ _id: new ObjectId(dataObj["_id"]) })
      .toArray();
    console.log(getData);
    await client.close();
    res.json({
      msg: "delete",
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: err,
    });
  }
};
exports.handleEditReply = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("WasSender");
    const { dataObj, id } = req.body;
    let postData = await db.collection("reply").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          message: dataObj.message,
          to: dataObj.to,
          from: dataObj.from,
          file: dataObj.file?.toString(),
          fileName: dataObj.fileName,
          body: dataObj.body,
          lat: dataObj.lat,
          lng: dataObj.lng,
          type: dataObj.type,
        },
      }
    );
    await client.close();
    res.json({
      msg: "edit success",
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: err,
    });
  }
};


//-----------------------------------------------------------------------------------------

exports.ultramsgwebhook = async (req, res) => {

  try {
    // print all response
    const messageMsg = req.body["data"]["body"]; // Message text
    var to = req.body["data"]["from"];
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
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
          res.status(200).end();
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
          res.status(200).end();
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
      res.status(200).end();
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
    res.status(200).end();
  }
  catch (err) {
    console.log(err);
  }
}
//-----------------------------------------