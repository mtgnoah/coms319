const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    _id: {type: Number},
    name: {type: String},
    price: {type: String},
    desc: {type: String},
    category: {type: String},
    image: {type: String},
    rating: {
        rate: {type: Number}, 
        count: {type: Number}
    }
},
{
    collection: "finalCatalog"
})

const Shoe = mongoose.model('Shoe', ReactFormDataSchema)
module.exports = Shoe