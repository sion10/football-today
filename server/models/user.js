const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    fbId: {type: String, index: true},
    token: String,
    email: String,
    password: String,
    name: String,
    picture: Object,
    pictureBig:  {type: Object, default: 'https://www.webpagefx.com/data/marketing-persona-generator/img/placeholder.png' },
    predictions: [{type: Schema.Types.ObjectId, ref: 'Tip'}],
    points: {type: Number, default: 1},
    rank: {type: Number, default: 1 }
}); 

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
};

UserSchema.pre('save', function saveHook(next) {
    const user = this;

    // proceed further only if the password is modified or the user is new
    if (!user.isModified('password')) return next();


    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) { return next(saltError); }

        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if (hashError) { return next(hashError); }

            // replace a password string with hash value
            user.password = hash;

            return next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);