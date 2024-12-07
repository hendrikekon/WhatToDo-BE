const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    token:[String]
},{timestamps: true})

// // Validasi Email
userSchema.path('email').validate(function(value) {
    const EMAIL_RE = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
    return EMAIL_RE.test(value);
}, attr => `${attr.value} harus merupakan email yang valid!`);

//cek Email sudah terdaftar atau belum
userSchema.path('email').validate(async function(value) {
    try{
        const count = await this.model('User').countDocuments({email: value})
        return !count;
    }catch(err){
        throw err;
    }
}, attr => `${attr.value} Sudah terdaftar`)

//hash Password
const HASH_ROUND = 10;
userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    }
    next();
});

// userSchema.pre('findOneAndUpdate', function(next) {
//     const update = this.getUpdate();
//     if (update.password) {
//         update.password = bcrypt.hashSync(update.password, HASH_ROUND);
//         this.setUpdate(update);
//     }
//     next();
// });


module.exports = model('User', userSchema);