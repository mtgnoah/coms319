const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Cart = require("./dataSchema.js");
app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.use("/images", express.static("images"));
mongoose.connect("mongodb://127.0.0.1:27017/finaldata",
    {
        dbName: "finaldata",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

const port = process.env.PORT || "4000";
const host = "localhost";
app.listen(port, () => {
    console.log(`App listening at http://%s:%s`, host, port);
});

app.post("/cart", async (req, res) => {
    try {
        const newCart = await Cart.create({
            status: "active",
            items: [],
            bill: 0,
        });
        const msg = { "_id": newCart._id };
        return res.status(201).send(msg);
    } catch (error) {
        console.log(error);
        res.status(500).send("Cart creation went wrong");    
    }
});

app.get("/cart/:id", async (req, res) => {
    const cartId = req.params.id;


    try {
        const cart = await Cart.findOne({ _id: cartId });
        if (cart && cart.items.length >= 0) {
            res.status(200).send(cart);
        } else {
            res.send(null);
        }
    } catch (error) {
        res.status(500).send();
    }
});

app.get("/cart/:id/quantity/:itemid", async (req, res) => {
    const cartId = req.params.id;
    const itemId = req.params.itemid;

    try {
        const cart = await Cart.findOne({ _id: cartId });
        const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
        let product = cart.items[itemIndex];
        const msg = { "quantity": product.quantity };
        res.status(200).send(msg);
    } catch (error) {
        res.status(500).send();
    }
});

//add cart
app.post("/cart/increaseQuantity", async (req, res) => {
    const { itemId, price, name, cartId } = req.body;

    const quantity = 1;

    try {
        const cart = await Cart.findOne({ _id: cartId });
        //const item = await CartItem.findOne({ _id: itemId });

        if (!item) {
            res.status(404).send({ message: "item not found" });
            return;
        }

        //If cart already exists for user,
        if (cart) {
            const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
            //check if product exists or not

            if (itemIndex > -1) {
                let product = cart.items[itemIndex];
                product.quantity += 1;

                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)

                cart.items[itemIndex] = product;
                await cart.save();
                res.status(200).send(cart);
            } else {
               
                cart.items.push({ itemId, name, quantity, price });
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)

                await cart.save();
                res.status(200).send(cart);
            }
        } else {
            //no cart exists, create one
            const newCart = await Cart.create({
                owner,
                items: [{ itemId, name, quantity, price }],
                bill: quantity * price,
            });
            return res.status(201).send(newCart);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
});


app.delete("/cart/decreaseQuantity", async (req, res) => {
    const cartId = req.query.cartId;
    const itemId = req.query.itemId;
    try {
        let cart = await Cart.findOne({ _id: cartId });

        const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);

        if (itemIndex > -1) {
            let product = cart.items[itemIndex];
            product.quantity -= 1;
            cart.bill -= item.price;
            
            cart.bill = cart.items.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
            }, 0)

            cart.items[itemIndex] = product;
            await cart.save();
            res.status(200).send(cart);
        } else {
            res.status(404).send("item not found");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
});

//delete item in cart

app.delete("/cart/delete", async (req, res) => {
    const cartId =  req.query.cartId;
    const itemId = req.query.itemId;
    try {
        let cart = await Cart.findOne({ _id: cartId });

        const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);

        if (itemIndex > -1) {
            let item = cart.items[itemIndex];
            cart.bill -= item.quantity * item.price;
            if (cart.bill < 0) {
                cart.bill = 0
            }
            cart.items.splice(itemIndex, 1);
            cart.bill = cart.items.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
            }, 0)
            cart = await cart.save();

            res.status(200).send(cart);
        } else {
            res.status(404).send("item not found");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
});

app.post('/checkout', async (req, res) => {
    try {
        let cartId = req.body.cartId

        //find cart by id and then just deletes it
        let cart = await Cart.findOne({ _id: cartId })
        if (cart) {
            const data = await Cart.findByIdAndDelete({ _id: cart.id })
            return res.status(201).send({ status: 'Payment successful' })

        } else {
            res.status(400).send('No cart found')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('invalid request')
    }
})
