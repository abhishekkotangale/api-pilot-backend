import mongoose from "mongoose";

const SavedRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    request: {
      method: { type: String, required: true },
      url: { type: String, required: true },
      headers: { type: Array, default: [] },
      body: { type: mongoose.Schema.Types.Mixed },
    },

    response: {
      status: Number,
      time: Number,
      size: Number,
      headers: Object,
      body: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SavedRequest", SavedRequestSchema);
