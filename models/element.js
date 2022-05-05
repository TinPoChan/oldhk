const mongoose = require('mongoose')

const elementSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    url_original: {
        type: String,
        required: true
    },
    url_colored: {
        type: String,
    },
    url_now: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    year: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    external_url: {
        type: String,
    }
})

elementSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Element = mongoose.model('Element', elementSchema)

module.exports = Element