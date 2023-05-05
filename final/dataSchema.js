const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    quantity: { type: Number },
},
    {
        collection: "finalCatalog"
    })

const Order = mongoose.model('Order', ReactFormDataSchema)
module.exports = Order