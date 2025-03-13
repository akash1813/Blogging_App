const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    content:{
        type: String,
        required: true,
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog",   // here blog is current blog
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",   // here user is current user
    }

},{timestamps: true});

const Comment = mongoose.model("comment",commentSchema);

module.exports = Comment;