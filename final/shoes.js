const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Shoe = require("./shoeData.js");
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
    console.log(`App listening at http://%s%s`, host, port);
});
//Inital
app.get("/", async(req, resp) => {
    query = {};
    allProducts = await Shoe.find(query);
    resp.send(allProducts);
})
//findone

app.get("/:id", async(req, resp) => {
    const id = req.params.id;
    const query = {_id: id};
    const oneProduct = await Shoe.findOne(query);
    console.log(oneProduct);
    resp.send(oneProduct);
})

app.get("/type/:category", async(req, resp) => {
    const type = req.params.category;
    console.log(type);
    const query = {category: type};
    const Products = await Shoe.find(query);
    console.log(Products);
    resp.send(Products);
})
