const mongoose = require("mongoose");
const moment = require('moment-timezone');
const dateThailand = moment(Date.now()).tz("Asia/Bangkok");

const TransactionSchema = new mongoose.Schema(
    {
      ticket: { type: String, required: true},
      buyer: { type: String, required: true},
      buyAmount: { type: Number, required: true},
      price: { type: Number, required: true},
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Transaction", TransactionSchema);