const https = require("https");
const checksum = require("../helpers/checksum");
const qs = require("querystring");
const Form = require('../../model/userForm.model')
const Transaction = require("../model/transaction.model");

exports.callbackController = (req, res) => {
  let callbackResponse = "";
  req
    .on("data", (chunk) => {
      callbackResponse += chunk;
    })
    .on("end", () => {
      let data = qs.parse(callbackResponse);
      console.log(data);

      data = JSON.parse(JSON.stringify(data));

      const paytmChecksum = data.CHECKSUMHASH;

      var isVerifySignature = checksum.verifySignature(
        data,
        process.env.TEST_MERCHANT_KEY,
        paytmChecksum
      );
      if (isVerifySignature) {
        console.log("Checksum Matched");

        var paytmParams = {};

        paytmParams.body = {
          mid: process.env.TEST_MERCHANT_ID,
          orderId: data.ORDERID,
        };

        checksum
          .generateSignature(
            JSON.stringify(paytmParams.body),
            process.env.TEST_MERCHANT_KEY
          )
          .then(function (checksum) {
            paytmParams.head = {
              signature: checksum,
            };

            var post_data = JSON.stringify(paytmParams);

            var options = {
              /* for Staging */
              hostname: "securegw-stage.paytm.in",

              /* for Production */
              // hostname: 'securegw.paytm.in',

              port: 443,
              path: "/v3/order/status",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
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
                response = JSON.parse(response);
                  console.log("Response: ", response);
                  
                if (response.body.resultInfo.resultCode == "01") {
                  res.render("details", { 'head':'Success','data': response });
                } else {
                  res.render("details", { 'head':'Failure','data': response });
                  }
                  
                  // Update transaction table
                  var orderId = response.body.orderId
                  Transaction.findOne({ orderId }).exec((err, transaction) => {
                      if (err || !transaction) {
                          res.status(404).json({errorDetails: 'Could not retrieve transaction details.'})
                      } else {
                          transaction.status = response.body.resultInfo.resultStatus;
                          transaction.details = response.body.resultInfo.resultMsg;
                          transaction.txnId = response.body.txnId;
                          transaction.txnAmt = response.body.txnAmount;
                          transaction.gatewayName = response.body.gatewayName;
                          transaction.bankName = response.body.bankName;
                          transaction.bankTxnId = response.body.bankTxnId;
                          transaction.paymentMode = response.body.paymentMode;
                          transaction.txnDate = response.body.txnDate;
                      }
                      transaction.save((err, txn) => {
                          if (err) {
                              res.status(500).json({errorDetails:"Couldn't save your transaction details."})
                          } else {
                              console.log("Saved Transaction : \n",txn)
                          }
                      })

                  })

              });
            });

            // post the data
            post_req.write(post_data);
            post_req.end();
            console.log("Done");
          });
      } else {
        console.log("Checksum Mismatched");
      }
    });
};
