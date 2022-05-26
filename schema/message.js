const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
  },
  users: Array,
  senders: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recevier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  is_active: {
    type: Boolean,
    required: true,
  },
  is_read: {
    type: Boolean,
    required: true,
  },

});
messageSchema.virtual("user", {
  ref: "User",
  localField: "senders",
  foreignField: "_id",
});
messageSchema.virtual("Ruser", {
  ref: "User",
  localField: "recevier",
  foreignField: "_id",
});


module.exports = mongoose.model("message", messageSchema);
