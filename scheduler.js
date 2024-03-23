const schedule = require("node-schedule") ;

const date= "Sat Mar 23 2024 13:57:00 GMT+0300 (Arabian Standard Time)";

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