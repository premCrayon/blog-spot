const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
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
module.exports = mongoose.model("User", UserSchema)