const https = require("https");
const qs = require("querystring");
const checksum = require("../helpers/paytm/checksum");
const { response } = require("express");
const User = require("../model/users.model");
const jwt = require("jsonwebtoken");
const Form = require("../model/userForm.model");

exports.paytmController = (req, res) => {
  // const token = req.headers.authorization.split(" "); // extracting token from header
  // const { _id } = jwt.decode(token[1]);
  // User.findOne({ _id }).exec((err, user) => {
  //   if (err || !user) {
  //     // if user not found
  //     return res.status(404).json({
  //       errorDetails: "User doesn't exist.",
  //     });
  //   } else {
  //     if (!req.query.formId || !req.query.amt) {
  //       return res.status(400).json("Missing Form ID or Amount");
  //     } else {
  // var email = user.email;
  // var mobile_no = user.profile.contact;
  var paytmParams = {
    MID: process.env.TEST_MERCHANT_ID,
    WEBSITE: process.env.WEBSITE,
    INDUSTRY_TYPE_ID: process.env.INDUSTRY_TYPE,
    CHANNEL_ID: process.env.CHANNEL_ID,
    ORDER_ID: "NP" + req.query.formId + new Date().getTime(),
    CUST_ID: "abcdefg",
    MOBILE_NO: "9031760771",
    EMAIL: "ashutosh.devil7@gmail.com",
    TXN_AMOUNT: req.query.amt,
    CALLBACK_URL: process.env.CALLBACK_URL,
  };

  checksum.genchecksum(
    paytmParams,
    process.env.TEST_MERCHANT_KEY,
    (err, checksum) => {
      console.log("Checksum: ", checksum);
      var params = {
        ...paytmParams,
        CHECKSUMHASH: checksum
      }
      console.log(paytmParams)
      res.json(params)
    }
  );
};
//     }
//   });
// };

exports.callbackController = (req, res) => {
  var body = "";
  console.log("callback received");
  req.on("data", function (data) {
    body += data;
  });

  req.on("end", function () {
    var html = "";
    var post_data = qs.parse(body);

    // received params in callback
    console.log('Callback Response: ', post_data, "\n");

    // verify the checksum
    var checksumhash = post_data.CHECKSUMHASH;
    // delete post_data.CHECKSUMHASH;
    var result = checksum.verifychecksum(
      post_data,
      process.env.TEST_MERCHANT_KEY,
      checksumhash
    );
    console.log("Checksum Result => ", result, "\n");

    // Send Server-to-Server request to verify Order Status
    var params = {
      "MID": process.env.TEST_MERCHANT_ID,
      "ORDERID": post_data.ORDERID,
    };

    checksum.genchecksum(params, process.env.TEST_MERCHANT_KEY, function (
      err,
      checksum
    ) {
      params.CHECKSUMHASH = checksum;
      post_data = "JsonData=" + JSON.stringify(params);

      var options = {
        hostname: "securegw-stage.paytm.in", // for staging
        // hostname: 'securegw.paytm.in', // for production
        port: 443,
        path: "/merchant-status/getTxnStatus",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": post_data.length,
        },
      };

      // Set up the request
      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
          response += chunk;
        });

        post_res.on("end", function () {
          var _result = JSON.parse(response);
          if (_result["RESPCODE"] == "01") {
            res.json({ responseData: _result["RESPMSG"] });
            console.log(_result)
          } else {
            res
              .status(_result["RESPCODE"])
              .json({ errorDetails: _result["RESPMSG"] });
            console.log(_result)
          }
        });
      });

      // post the data
      post_req.write(post_data);
      post_req.end();
    });
  });
};
