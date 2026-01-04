import History from "../models/History.js";

export async function saveHistory({
  method,
  url,
  headers,
  body,
  responseStatus,
  responseTime,
}) {
  return await History.create({
    method,
    url,
    headers,
    body,
    responseStatus,
    responseTime,
  });
}

export async function getAllHistory() {
  return await History.find().sort({ createdAt: -1 });
}

export async function getHistoryById(id) {
  return await History.findById(id);
}

export async function deleteHistory(id) {
  return await History.findByIdAndDelete(id);
}

export async function clearHistory() {
  return await History.deleteMany();
}
