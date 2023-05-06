const mongoose = require('mongoose');
const uuid = require('node-uuid');


// const CartItemDataSchema = new mongoose.Schema({
//     id: { type: Number },
//     quantity: { type: Number },
// },
//     {
//         collection: "cartItemCatalog"
//     })

// const CartItem = mongoose.model('CartItem', CartItemDataSchema)

const cartSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v1 },
    status: { type: String },
    items: [{
        itemId: {
            type: Number,
        },
        quantity: {
            type: Number,
            min: 0,
            default: 1
        },
    }]
}, {
    collection: "cartCatalog"
})


const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart