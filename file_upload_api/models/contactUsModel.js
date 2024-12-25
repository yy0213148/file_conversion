const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    message: {
        type: String,
        require: false,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const contactUs = mongoose.model('contactUs', contactUsSchema)
module.exports = contactUs;
