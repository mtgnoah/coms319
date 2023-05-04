const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    _id: {type: Number},
    name: {type: String},
    price: {type: Number},
    desc: {type: String},
    type: {type: String},
    image: {type: String},
    rating: {
        rate: {type: Number}, 
        count: {type: Number}
    }
},
{
    collection: "finalCatalog"
})

const Shoe = mongoose.model('Product', ReactFormDataSchema)
module.exports = Shoe