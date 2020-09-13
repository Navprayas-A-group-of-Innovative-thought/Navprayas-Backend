import mongoose from "mongoose";
import "mongoose-type-email";
import Email from "mongoose-type-email";

// Schema for all transaction details
const transactionSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: Email,
    trim: true,
    unique: false,
  },
  orderId: { type: String },
  status: { type: String },
  txnId: { type: String },
  txnDetails: { type: String },
  txnAmt: { type: String },
  gatewayName: { type: String },
  bankName: { type: String },
  bankTxnId: { type: String },
  paymentMode: { type: String },
  txnDate: { type: Date },
});
