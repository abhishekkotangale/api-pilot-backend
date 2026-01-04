import sendHttpRequest from "../utils/sendRequest.js";
import {
  saveHistory,
  getAllHistory,
  getHistoryById,
  deleteHistory,
  clearHistory,
} from "../services/requestService.js";

// Send a request and save history
const sendRequest = async (req, res) => {
  console.log({ req: req.body });
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
    responseTime: result.responseTime,
  });

  // 3. Return result + history id
  res.json({ ...result, historyId: history._id });
};

// Get all history
const getHistory = async (req, res) => {
  const data = await getAllHistory();
  res.json(data);
};

// Get single history by ID
const getSingleHistory = async (req, res) => {
  const item = await getHistoryById(req.params.id);
  res.json(item);
};

// Delete single history by ID
const deleteSingleHistory = async (req, res) => {
  await deleteHistory(req.params.id);
  res.json({ message: "History deleted" });
};

// Clear all history
const clearAllHistory = async (req, res) => {
  await clearHistory();
  res.json({ message: "All history cleared" });
};

// Simple authentication check
const authenticate = async (req, res) => {
  res.status(200).json({ authenticate: true });
};

export default {
  sendRequest,
  getHistory,
  getSingleHistory,
  deleteSingleHistory,
  clearAllHistory,
  authenticate,
};
