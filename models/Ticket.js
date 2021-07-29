const mongoose = require("mongoose");
const moment = require('moment-timezone');
const dateThailand = moment(Date.now()).tz("Asia/Bangkok");

const TicketSchema = new mongoose.Schema(
    {
      ticketType: { type: String, required: true, unique: true },
      price: { type: Number, required: true},
      amountLimitPerDay: { type: Number, required: true},
      minimumBuying: { type: Number, required: true},
      isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Ticket", TicketSchema);