const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
  },
   post: {
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
});
blogSchema.virtual("User", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
});
module.exports = mongoose.model("blog", blogSchema);
