import mongoose from "mongoose";


// Schema for all transaction details
const transactionSchema = new mongoose.Schema(
  {
    userId: { type: String },
    txnToken: { type: String },
    formId: { type: String },
    orderId: { type: String },
    status: { type: String },
    details: { type: String },
    txnId: { type: String },
    txnAmt: { type: String },
    gatewayName: { type: String },
    bankName: { type: String },
    bankTxnId: { type: String },
    paymentMode: { type: String },
    txnDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transactions", transactionSchema);
