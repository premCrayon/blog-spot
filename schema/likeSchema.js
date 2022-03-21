const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  createTime: {
    type: Date,
    default: Date.now,
  },
  likedBy: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
   post: {
    type: mongoose.Schema.ObjectId,
    ref: "blog",
    required: true, 
  }
});
likeSchema.virtual("User", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
});
likeSchema.virtual("blog", {
  ref: "blog",
  localField: "post",
  foreignField: "_id",
});

module.exports = mongoose.model("like", likeSchema);
