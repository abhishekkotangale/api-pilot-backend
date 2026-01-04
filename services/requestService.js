const History = require("../models/History");

async function saveHistory({ method, url, headers, body, responseStatus, responseTime }) {
  return await History.create({
    method,
    url,
    headers,
    body,
    responseStatus,
    responseTime
  });
}

async function getAllHistory() {
  return await History.find().sort({ createdAt: -1 });
}

async function getHistoryById(id) {
  return await History.findById(id);
}

async function deleteHistory(id) {
  return await History.findByIdAndDelete(id);
}

async function clearHistory() {
  return await History.deleteMany();
}

module.exports = {
  saveHistory,
  getAllHistory,
  getHistoryById,
  deleteHistory,
  clearHistory
};
