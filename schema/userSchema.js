const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    username: {
        type: String,
        lowercase: true
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    }

})
UserSchema.virtual("message", {
    ref: "message",
    localField: "_id",
    foreignField: "senders",
});
module.exports = mongoose.model("User", UserSchema)