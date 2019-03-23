const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '{PATH} alanı zorunludur.'],
        maxlength: [20, '{PATH} alanı, {MAXLENGTH} karakterden KÜÇÜK olmalıdır.'],
        minlength: [3, '{PATH} alanı {VALUE}, {MINLENGTH} karakterden BÜYÜK olmalıdır.']
    },
    category: {
        type: String,
        maxlength: [30, '{PATH} alanı, {MAXLENGTH} karakterden KÜÇÜK olmalıdır.'],
        minlength: [3, '{PATH} alanı {VALUE}, {MINLENGTH} karakterden BÜYÜK olmalıdır.']
    },
    country: {
        type: String,
        maxlength: [30, '{PATH} alanı, {MAXLENGTH} karakterden KÜÇÜK olmalıdır.'],
        minlength: [3, '{PATH} alanı {VALUE}, {MINLENGTH} karakterden BÜYÜK olmalıdır.']
    },
    year: {
        type: Number,
        maxlength: [2040, '{PATH} alanı, {MAXLENGTH} den KÜÇÜK olmalıdır.'],
        minlength: [1900, '{PATH} alanı {VALUE}, {MINLENGTH} BÜYÜK olmalıdır.']
    },
    imdb_score: {
        type: Number,
        maxlength: [10, '{PATH} alanı, {MAXLENGTH} den KÜÇÜK olmalıdır.'],
        minlength: [0, '{PATH} alanı {VALUE}, {MINLENGTH} BÜYÜK olmalıdır.']
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('movie', MovieSchema)