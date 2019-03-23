const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DirectorSchema = new Schema({
    name: {
        type: String,
        maxlength: [60, '{PATH} alanı, {MAXLENGTH} den KÜÇÜK olmalıdır.'],
        minlength: [2, '{PATH} alanı {VALUE}, {MINLENGTH} BÜYÜK olmalıdır.']
    },
    surname: {
        type: String,
        maxlength: [60, '{PATH} alanı, {MAXLENGTH} den KÜÇÜK olmalıdır.'],
        minlength: [2, '{PATH} alanı {VALUE}, {MINLENGTH} BÜYÜK olmalıdır.']
    },
    bio: {
        type: String,
        maxlength: [200, '{PATH} alanı, {MAXLENGTH} den KÜÇÜK olmalıdır.'],
        minlength: [5, '{PATH} alanı {VALUE}, {MINLENGTH} BÜYÜK olmalıdır.']
    }
})

module.exports = mongoose.model('director', DirectorSchema)