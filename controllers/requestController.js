import sendHttpRequest from "../utils/sendRequest.js";
import History from "../models/History.js";

const sendRequest = async (req, res) => {
  try {
    const { url, method, headers, body } = req.body;

    const result = await sendHttpRequest({
      url,
      method,
      headers,
      body,
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Request failed" });
  }
};

 const saveHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, request, response } = req.body;

    const saved = await History.create({
      userId,
      name,
      request,
      response,
    });

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save request" });
  }
};

 const getSavedHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    const data = await History.find({ userId }).sort({
      createdAt: -1,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch saved requests" });
  }
};

const deleteSavedHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    await History.deleteOne({ _id: id, userId });

    res.json({ message: "Saved request deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export default {
  sendRequest,
  saveHistory,
  getSavedHistory,
  deleteSavedHistory,
};
