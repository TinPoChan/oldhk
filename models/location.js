const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    name_zh: {
        type: String,
        required: true
    },
    name_en: {
        type: String,
    },
    district_zh: {
        type: String
    },
    district_en: {
        type: String
    },
    area_zh: {
        type: String
    },
    area_en: {
        type: String
    },
    region_zh: {
        type: String
    },
    region_en: {
        type: String
    },
    exist: {
        type: Boolean,
        default: true
    },
    ref: {
        type: String,
    }
})

locationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Location = mongoose.model('Location', locationSchema)

module.exports = Location