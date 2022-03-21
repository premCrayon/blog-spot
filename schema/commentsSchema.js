const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now,
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
commentsSchema.virtual("User", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
});
commentsSchema.virtual("blog", {
  ref: "blog",
  localField: "post",
  foreignField: "_id",
});



module.exports = mongoose.model("comments", commentsSchema);
