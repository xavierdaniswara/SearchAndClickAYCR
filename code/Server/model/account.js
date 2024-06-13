const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');

const accSchema = new mongoose.Schema({
    id: {type: String, default: uuidv4, unique: true},
    firstname: {type: String, required: true, unique: false},
    lastname: {type: String, required: true, unique: false},
    phonum: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    pawd: {type: String, required: true},
});
const Account = mongoose.model('Account', accSchema);

module.exports = {Account};