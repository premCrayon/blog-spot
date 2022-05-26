const mongoose = require("mongoose");

const replaySchema = mongoose.Schema({
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
    // chat_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "message",
    // },
    is_active: {
        type: Boolean,
        required: true,
    },
    is_read: {
        type: Boolean,
        required: true,
    },

});
// replaySchema.virtual("chat", {
//     ref: "message",
//     localField: "chat_id",
//     foreignField: "_id",
// });

module.exports = mongoose.model("replay", replaySchema);
