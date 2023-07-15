const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 4,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel