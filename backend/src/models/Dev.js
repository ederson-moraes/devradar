const mongoose = require('mongoose')

const DevSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    github_username: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: false,
    },
    avatar_url: {
        type: String,
        required: true,
    },
    techs: {
        type: [String],
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
        },
    },
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
})

module.exports = mongoose.model('Dev', DevSchema)