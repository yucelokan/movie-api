const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://admin:123abc@ds121636.mlab.com:21636/heroku_dc2bvwj5', { useNewUrlParser: true });
    mongoose.connection.on('open', () =>{
        console.log('mongo db: connected')
    })

    mongoose.connection.on('error', (err) =>{
        console.log('mongo db error: ',err)
    })

    mongoose.Promise = global.Promise
}