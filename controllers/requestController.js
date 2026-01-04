const sendHttpRequest = require("../utils/sendRequest");
const {
  saveHistory,
  getAllHistory,
  getHistoryById,
  deleteHistory,
  clearHistory
} = require("../services/requestService");

exports.sendRequest = async (req, res) => {

  console.log({req : req.body})
  const { url, method, headers, body } = req.body;

  // 1. Make the actual request
  const result = await sendHttpRequest({ url, method, headers, body });

  // 2. Save to DB
  const history = await saveHistory({
    method,
    url,
    headers,
    body,
    responseStatus: result.status,
    responseTime: result.responseTime
  });

  // 3. Return result + history id
  res.json({ ...result, historyId: history._id });
};

exports.getHistory = async (req, res) => {
  const data = await getAllHistory();
  res.json(data);
};

exports.getSingleHistory = async (req, res) => {
  const item = await getHistoryById(req.params.id);
  res.json(item);
};

exports.deleteSingleHistory = async (req, res) => {
  await deleteHistory(req.params.id);
  res.json({ message: "History deleted" });
};

exports.clearAllHistory = async (req, res) => {
  await clearHistory();
  res.json({ message: "All history cleared" });
};


exports.authenticate = async (req, res) => {

  res.status(200).json({ authenticate: true });
};
