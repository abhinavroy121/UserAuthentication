const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    username: {type:String, required:true, unique: true },
    name: {type:String, required:true},
    password: {type:String, required:true}, 
    email: {type:String, required:true, unique: true },
    gender: String,
    about: String
})

const UserAuth = mongoose.model('User',Schema);


module.exports = UserAuth;