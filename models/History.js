const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  method: String,
  url: String,
  headers: Object,
  body: Object,
  responseStatus: Number,
  responseTime: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("History", HistorySchema);
