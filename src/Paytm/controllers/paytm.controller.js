const https = require("https");
const checksum = require("../helpers/checksum");
const User = require("../../model/users.model");
const Transaction = require("../model/transaction.model");
const jwt = require('jsonwebtoken')

exports.paytmController = (req, res) => {
  const token = req.headers.authorization.split(" "); // extracting token from header
  const { _id } = jwt.decode(token[1]); // decoding _id from token
  User.findOne({ _id }).exec((err, user) => {
    // searching for _id in database
    if (err || !user) {
      // if user not found
      return res.status(404).json({
        errorDetails: "User doesn't exist.",
      });
    } else {
      var dict = {
        MTSE: "20",
        PUZZLE: "30",
        FHS: "20",
        CHESS: "30",
        RANG: "50",
      };
      
      var formID = req.query.formId
      console.log(formID)
      var price = dict[formID];
      console.log(price, typeof(price))

      var paytmParams = {};

      var orderID = "MTSE" + new Date().getFullYear() + new Date().getTime();

      paytmParams.body = {
        requestType: "Payment",
        mid: process.env.TEST_MERCHANT_ID,
        websiteName: process.env.WEBSITE,
        orderId: orderID,
        callbackUrl: process.env.CALLBACK_URL,
        txnAmount: {
          value: String(price),
          currency: "INR",
        },
        userInfo: {
          custId: user._id,
        },
      };
      console.log(paytmParams.body.txnAmount.value,typeof(paytmParams.body.txnAmount.value))

      /*
       * Generate checksum by parameters we have in body
       */
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
            path: `/theia/api/v1/initiateTransaction?mid=${process.env.TEST_MERCHANT_ID}&orderId=${orderID}`,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": post_data.length,
            },
          };
          var response = "";
          var post_req = https.request(options, function (post_res) {
            post_res.on("data", function (chunk) {
              response += chunk;
            });

            post_res.on("end", function () {
              var result = JSON.parse(response);
              console.log("Response: ", result);

              // Saving txn token in database
              var transaction = new Transaction({
                userId: user._id,
                txnToken: result.body.txnToken,
                orderId: orderID,
                formId: formID
              });
              transaction.save((err, transaction) => {
                if (err) {
                  console.log("Save error", errorHandler(err));
                  return res.status(500).json({
                    errorDetails: errorHandler(err),
                  });
                } else {
                  console.log('Transaction saved successfully',transaction)
                }
              })

              res.writeHead(200, { "Content-Type": "text/html" });
              res.write(`<html>
                                    <head>
                                        <title>Show Payment Page</title>
                                    </head>
                                    <body>
                                        <center>
                                            <h1>Please do not refresh this page...</h1>
                                        </center>
                                        <form method="post" action="https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${process.env.TEST_MERCHANT_ID}&orderId=${orderID}" name="paytm">
                                            <table border="1">
                                                <tbody>
                                                    <input type="hidden" name="mid" value="${process.env.TEST_MERCHANT_ID}">
                                                        <input type="hidden" name="orderId" value="${orderID}">
                                                        <input type="hidden" name="txnToken" value="${result.body.txnToken}">
                                             </tbody>
                                          </table>
                                                        <script type="text/javascript"> document.paytm.submit(); </script>
                                       </form>
                                    </body>
                                 </html>`);
              res.end();
            });
          });

          post_req.write(post_data);
          post_req.end();
        });
    }
  });
};
