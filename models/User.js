const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{type: String, required: true, unique: true},
    firstname: { type: String, required: true, unique: true },
    lastname: { type: String, required: true },
    favoritecolor: { type: String, required: true },
    birthdate: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
