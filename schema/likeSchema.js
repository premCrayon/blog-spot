const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  createTime: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});
likeSchema.virtual("User", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
});
module.exports = mongoose.model("like", likeSchema);
