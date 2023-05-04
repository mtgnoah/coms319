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
app.get("/allProducts", async(req, resp) => {
    query = {};
    allProducts = await Shoe.find(query);
    resp.send(allProducts);
})
//Search
app.get("/:name", async(req, resp) => {
    const name = req.params.name;
    const query = {name: name};
        const Products = await Shoe.find(query);
        console.log(Products);
        resp.send(Products);
});
//More info
app.get("/more/:id", async(req, resp) => {
    const id = req.params.id;
    const query = {_id: id};
    const one = await Shoe.findOne(query);
    console.log(one);
    resp.send(one);
})
