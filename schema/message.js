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
    users: Array,
    senders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
     },
//   user: {
//     type: mongoose.Schema.ObjectId,
//     ref: "User",
//     required: true,
//   },
});
messageSchema.virtual("User", {
  ref: "User",
  localField: "senders",
  foreignField: "_id",
});



module.exports = mongoose.model("message", messageSchema);
