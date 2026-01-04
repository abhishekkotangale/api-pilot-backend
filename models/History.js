import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
  method: String,
  url: String,
  headers: Object,
  body: Object,
  responseStatus: Number,
  responseTime: Number,
  createdAt: { type: Date, default: Date.now }
});

const History = mongoose.model("History", HistorySchema);

export default History;
