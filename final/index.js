const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Order = require("./dataSchema.js");
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

app.post("/api/cart", async (req, resp) => {
    query = {};
    const formData = new Order({
        quantity: 0,
    });
    try {
        const result = await Order.create(formData);
        const messageResponse = { "result": result._id };
        resp.send(JSON.stringify(messageResponse));
    }
    catch (err) {
        console.log("Error while adding a new Order");
    }
    //console.log(allProducts);
});
app.get("/:id", async (req, resp) => {
    const id = req.params.id;
    const query = { _id: id };
    const oneProduct = await Order.findOne(query);
    console.log(oneProduct);
    resp.send(oneProduct);
})
app.post("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: id };
    try {
        const oneProduct = await Order.findOneAndDelete(query);
        console.log(oneProduct);
        const messageResponse = { message: `Order ${id} deleted correctly` };
        res.send(JSON.stringify(messageResponse));
    }
    catch (err) {
        console.log("Error while deleting a Order");
    }
})

app.post("/updateQuantity", async (req, res) => {
    const id = req.body._id;
    const query = { _id: id };
    const pquantity = req.body.quantity;

    const formData = new Order({
        _id: id,
        quantity: pquantity
    });
    try {
        const oneProduct = await Order.findOneAndUpdate(query, formData);
        console.log(oneProduct);
        const messageResponse = { message: `Order updated correctly` };
        res.send(JSON.stringify(messageResponse));
    }
    catch (err) {
        console.log("Error while updating a Order");
    }
})




app.post("/insert", async (req, res) => {
    console.log(req.body);
    const p_id = req.body._id;
    const pquantity = req.body.title;

    const formData = new Order({
        _id: p_id,
        quantity: pquantity,
    });
    try {
        await Order.create(formData);
        const messageResponse = { message: `Order ${p_id} added correctly` };
        res.send(JSON.stringify(messageResponse));
    }
    catch (err) {
        console.log("Error while adding a new Order");
    }
})