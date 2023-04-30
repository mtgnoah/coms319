import logo from './logo.svg';
import './App.css';
import {useState, useEffect } from "react";
function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);

  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);


  const [deleteId, setDeleteId] = useState(0);


  const [addNewProduct, setAddNewProduct] = useState({
_id: 0,
title: "",
price: 0.0,
description: "",
category: "",
image: "http://127.0.0.1:4000/images/",
rating: {rate: 0.0, count: 0}
  });


  const [addUpdateProduct, setUpdateProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: 0.0, count: 0 }
  });

  function getAllProducts() {
    fetch("http://localhost:4000/")
    .then((response) => response.json())
    .then((data) => {
      console.log("Show Catalog of Products");
      console.log(data);
      setProduct(data);
      console.log(product);
    });
    setViewer1(!viewer1);
  }

  function getOneProduct(id) {
    console.log(id);
    if(id >= 1 && id <= 20){
      fetch("http://localhost:4000/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Show one product: ", id);
        console.log(data);
        const dataArr = [];
        dataArr.push(data);
        setOneProduct(dataArr);
      });
      setViewer2(!viewer2);
    }
    else{
      console.log("Wrong number of Product id.");
    }
  }

  function deleteOneProduct(id) {
    console.log(id);
    if(id >= 1 && id <= 20){
      fetch("http://localhost:4000/delete/" + id, {
        method: "DELETE",
        headers: {"Content-type": "application/json"},
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Deleted one product: ", id);
        console.log(data);
        if(data){
          const value = Object.values(data);
          alert(value);
        }
      });
    }
    else{
      console.log("Wrong number of Product id.");
    }
  }


  function handleChange(evt) {
    const value = evt.target.value;
    const name = evt.target.name;
    switch (name){
      case "_id":
        setAddNewProduct({...addNewProduct, _id: value});
        break;
      case "title":
        setAddNewProduct({...addNewProduct, title: value});
        break;
      case "price":
        setAddNewProduct({...addNewProduct, price: value});
        break;
      case "description":
        setAddNewProduct({...addNewProduct, description: value});
        break
      case "category":
        setAddNewProduct({...addNewProduct, category: value});
        break;
      case "image":
        setAddNewProduct({...addNewProduct, image: value});
        break;
      case "rate":
        setAddNewProduct({...addNewProduct, rating: {rate: value}});
        break;
      case "count":
        const temp = addNewProduct.rating.rate;
        setAddNewProduct({...addNewProduct, rating : {rate: temp, count: value}});
        break;
    }
  }

  function handleUpdateChange(evt) {
    const value = evt.target.value;
    const name = evt.target.name;
    switch (name) {
      case "_id":
        setUpdateProduct({ ...addUpdateProduct, _id: value });
        break;
      case "title":
        setUpdateProduct({ ...addUpdateProduct, title: value });
        break;
      case "price":
        setUpdateProduct({ ...addUpdateProduct, price: value });
        break;
      case "description":
        setUpdateProduct({ ...addUpdateProduct, description: value });
        break
      case "category":
        setUpdateProduct({ ...addUpdateProduct, category: value });
        break;
      case "image":
        setUpdateProduct({ ...addUpdateProduct, image: value });
        break;
      case "rate":
        setUpdateProduct({ ...addUpdateProduct, rating: { rate: value } });
        break;
      case "count":
        const temp = addUpdateProduct.rating.rate;
        setUpdateProduct({ ...addUpdateProduct, rating: { rate: temp, count: value } });
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);

    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(addNewProduct),
    })
    .then((response => response.json()))
    .then((data) =>{
      console.log("Post a new Product Completed");
      console.log(data);
      setAddNewProduct({_id: 0,
        title: "",
        price: 0.0,
        description: "",
        category: "",
        image: "http://127.0.0.1:4000/images/",
        rating: { rate: 0.0, count: 0 }});
      if(data){
        const value = Object.values(data);
        alert(value);
      }
    })
  }

  function handleUpdate(e) {
    e.preventDefault();
    console.log(e.target.value);

    fetch("http://localhost:4000/update", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(addUpdateProduct),
    })
      .then((response => response.json()))
      .then((data) => {
        console.log("Post a update Product Completed");
        console.log(data);
        setUpdateProduct({_id: 0,
        title: "",
        price: 0.0,
        description: "",
        category: "",
        image: "http://127.0.0.1:4000/images/",
        rating: { rate: 0.0, count: 0 }});
        if (data) {
          const value = Object.values(data);
          alert(value);
        }
      })
  }


  const showAllItems = product.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate: {el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  const showOneItem = oneProduct.map((el) => (
    <div key = {el._id}>
      <img src={el.image} width = {30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate: {el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  return (
    <div>
      <h1>Catalog of Products</h1>

      <button onClick ={() => getAllProducts()}>Show All Products</button>

      <input type="text" id="message" name="message" placeholder="id" onChange={((e) => getOneProduct(e.target.value))} />

      <h1>Show all available Products.</h1>
      <hr></hr>
      {viewer1 && <div>Products {showAllItems}</div>}
      <hr></hr>
      <h1>Show one Product by Id: </h1>
      {viewer2 && <div>Product: {showOneItem}</div>}
      <hr></hr>
      <h1> Add a new Product: </h1>
      <form action="">
        <input type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
        <input type="text" placeholder="title?" name="title" value={addNewProduct.title} onChange={handleChange} />
        <input type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} />
        <input type="text" placeholder="description?" name="description" value={addNewProduct.description} onChange={handleChange} />
        <input type="text" placeholder="category?" name="category" value={addNewProduct.category} onChange={handleChange} />
        <input type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} />
        <input type="number" placeholder='rate?' name="rate" value={addNewProduct.rating.rate} onChange={handleChange} />
        <input type="number" placeholder="count?" name="count" value={addNewProduct.rating.count} onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
      </form>
      <hr></hr>
      <h1> Update a Product: </h1>
      <form action="">
        <input type="number" placeholder="id?" name="_id" value={addUpdateProduct._id} onChange={handleUpdateChange} />
        <input type="text" placeholder="title?" name="title" value={addUpdateProduct.title} onChange={handleUpdateChange} />
        <input type="number" placeholder="price?" name="price" value={addUpdateProduct.price} onChange={handleUpdateChange} />
        <input type="text" placeholder="description?" name="description" value={addUpdateProduct.description} onChange={handleUpdateChange} />
        <input type="text" placeholder="category?" name="category" value={addUpdateProduct.category} onChange={handleUpdateChange} />
        <input type="text" placeholder="image?" name="image" value={addUpdateProduct.image} onChange={handleUpdateChange} />
        <input type="number" placeholder='rate?' name="rate" value={addUpdateProduct.rating.rate} onChange={handleUpdateChange} />
        <input type="number" placeholder="count?" name="count" value={addUpdateProduct.rating.count} onChange={handleUpdateChange} />
        <button type="submit" onClick={handleUpdate}>
          submit update
        </button>
      </form>
      <hr></hr>
      <h1>Delete Product by ID: </h1>
      <button onClick={() => deleteOneProduct(deleteId)}>Delete Product by ID</button>
      <input type="number" id="message" name="message" placeholder="id" onChange={((e) => setDeleteId(e.target.value))} />
      <hr></hr>
    </div>
  );
}

export default App;
