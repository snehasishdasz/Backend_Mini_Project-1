const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // Reference to the User model
    },
    date:{
        type: Date,
        default: Date.now
    },
    content: String,
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
});

module.exports = mongoose.model('post', postSchema);