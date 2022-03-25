const mongoose = require("mongoose");

const savedSchema = mongoose.Schema({
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
  },
  is_active: {
    type: Boolean,
   }
});
savedSchema.virtual("User", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
});
savedSchema.virtual("blog", {
  ref: "blog",
  localField: "post",
  foreignField: "_id",
});

module.exports = mongoose.model("saves", savedSchema);
