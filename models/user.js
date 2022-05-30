const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
// This plugin powers passport.serializeUser and passport.deserialize User.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);