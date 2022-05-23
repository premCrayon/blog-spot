const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

})
messageSchema.virtual("User", {
    ref: "User",
    localField: "friend",
    foreignField: "_id",
});
module.exports = mongoose.model("User", UserSchema)