const mongoose = require('mongoose');

// const CartItemDataSchema = new mongoose.Schema({
//     id: { type: Number },
//     quantity: { type: Number },
// },
//     {
//         collection: "cartItemCatalog"
//     })

// const CartItem = mongoose.model('CartItem', CartItemDataSchema)

const cartSchema = new mongoose.Schema({
    status: { type: String },
    items: [{
        itemId: {
            type: Number,
        },
        name: String,
        quantity: {
            type: Number,
            min: 1,
            default: 1
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    collection: "cartCatalog"
})


const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart