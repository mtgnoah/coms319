import "./App.css";
import React, { useState, useEffect } from "react";
import { Products } from "./Products";

import "./shop.css";

export function Shop() {
  const [ProductsCategory, setProductsCategory] = useState(Products);
  const [cart, setCart] = useState([]);
  const [showCatalog, setShowCatalog] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [ProductsShown, setProductsShown] = useState(Products);
  const [showResults, setShowResults] = useState(false);

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  };

  const cartItems = cart.map((el) => (
    <div key={el.id}>
      <img className="img-fluid" src={el.image} width={30} />
      {el.title}
      ${el.price}
    </div>
  ));

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  const listItems = ProductsCategory.map((el) => (
    // PRODUCT
    <div className="row border-top border-bottom" key={el.id}>
      <div className="row main align-items-center">
        <div className="col-2">
          <img className="img-fluid" src={el.image} />
        </div>
        <div className="col">
          <div className="row text-muted">{el.name}</div>
          <div className="row">{el.desc}</div>
        </div>
        <div className="col">
          <button
            type="button"
            variant="light"
            onClick={() => removeFromCart(el)}
          >
            {" "}
            -{" "}
          </button>{" "}
          <button type="button" variant="light" onClick={() => addToCart(el)}>
            {" "}
            +{" "}
          </button>
        </div>
        <div className="col">
          ${el.price} <span className="close">&#10005;</span>
          {howManyofThis(el.id)}
        </div>
      </div>
    </div>
  ));
  const running = [];
  const listCart = ProductsCategory.map((el) => (
    <div className="row border-top border-bottom" key={el.id}>
      <div className="row main align-items-center">
        <div className="col-2">
          <img className="img-fluid" src={el.image} />
        </div>
        <div className="col">
          <div className="row text-muted">{el.name}</div>
        </div>
        <div className="col">
          ${el.price} <span className="close">&#10005;</span>
          {howManyofThis(el.id)}
        </div>
        <div className = "col">
          ${el.price * howManyofThis(el.id)}
        </div>
        </div>
    </div>
  ));
  const render_products = (ProductsCategory) => {
    
    return <div className="flex fixed flex-row">
    <div className="px-6 py-4">
      <div className="py-10">
        <input type="search" value={query} onChange={handleChange} />
        <button onClick={showHideCart}>Checkout</button>
      </div>
      <div className="category-section fixed">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
          Products ({ProductsCategory.length})
        </h2>
        <div className = "row">
            <div>{listItems}</div>
        </div>
      </div>
    </div>
    </div>
        }
    const render_cart = (cart) => {
      if(showCart){
        return <div className="flex fiexed flex-row">
        <div className = "px-6 py-4">
          <button onClick={showHideCart}>Return</button>
          <button onClick={showHideResults}>Checkout</button>
        </div>
      <div className = "category-section fixed">
        <h2 className="text-3x1 font-extrabold tracking-tight text-gray-600 category-title">
          Cart ({cart.length})
        </h2>
        <div className = "row">
          <div>{listCart}</div>
        </div>
        <div className = "row">
          <div className = "col-2">
            Total:
          </div>
          <div className = "col">

          </div>
          <div className = "col">
            {cart.length}
          </div>
          <div className = "col">
            ${cartTotal}
          </div>
        </div>
      </div>
      {render_form()}
      </div>
     
  }
  else{
    render_products(ProductsShown);
  }
}
const render_form = () => {
  return (
    <form className="row g-3" id="checkout-form">

          <div className="col-md-6">
            <label for="inputName" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="inputName" onChange={(e) => setFullName(e.target.value)}/>
            <div className="valid-feedback">
              Looks good!
            </div>
            <div className="invalid-feedback">
              Must be like, "John Doe"
            </div>
          </div>

          <div className="col-md-6">
            <label for="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4" onChange={(e) => setEmail(e.target.value)}/>
            <div className="valid-feedback">
              Looks good!
            </div>
            <div className="invalid-feedback">
              Must be like, "abc@xyz.efg"
            </div>
          </div>

          <div className="col-12">
            <label for="inputCard" className="form-label">Card</label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><i class="bi-credit-card-fill"></i></span>
              <input type="text" id="inputCard" className="form-control" placeholder="XXXX-XXXX-XXXX-XXXX"
                aria-label="Username" aria-describedby="basic-addon1" onChange={cardChange}/>
              <div className="valid-feedback">
                Looks good!
              </div>
              <div className="invalid-feedback">
                Must be like, "7777-7777-7777-7777"
              </div>
            </div>
          </div>

          <div className="col-12">
            <label for="inputAddress" className="form-label">Address</label>
            <input name="Address" type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" onChange={addressChange}/>
          </div>
          <div className="col-12">
            <label for="inputAddress2" className="form-label">Address 2</label>
            <input name="Address2" type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
          </div>
          <div className="col-md-6">
            <label for="inputCity" className="form-label">City</label>
            <input name="City" type="text" className="form-control" id="inputCity" onChange={addressChange}/>
          </div> 
          <div className="col-md-4">
            <label for="inputState" className="form-label">State</label>
            <select name="State" id="inputState" className="form-select" onChange={addressChange}>
              <option selected>Choose...</option>
              <option> Iowa </option>
              <option>Illinois</option>
              <option>Minnesota</option>
            </select>
          </div>
          <div className="col-md-2">
            <label for="inputZip" className="form-label">Zip</label>
            <input name="Zip" type="text" className="form-control" id="inputZip" onChange={addressChange} />
          </div>
    </form>
  )
}

const render_results = (order) => {
  console.log("here");
  return <div className="flex fiexed flex-row">
  <div className = "px-6 py-4">
    <button onClick={showHideCart}>Return</button>
    <button onClick={showHideProducts}>Finish</button>
  </div>
<div className = "category-section fixed">
  <h2 className="text-3x1 font-extrabold tracking-tight text-gray-600 category-title">
    Cart ({cart.length})
  </h2>
  <div className = "row">
    <div>{listCart}</div>
  </div>
  <div className = "row">
    <div className = "col-2">
      Total:
    </div>
    <div className = "col">
      ${cartTotal}
    </div>
    </div>
    <div className = "row">
        Name : {fullName}
    </div>
    <div className = "row">
      Email: {email}
    </div>
    <div className = "row">
      Card: {showCard(card)}
    </div>
    <div className = "row">
      Address: {address.Address}
      </div>
      <div className = "row">
      City: {address.City}
      </div>
      <div className = "row">
      State: {address.State}
      </div>
      <div className = "row">
      Zip: {address.Zip}
    </div>
    </div>
    </div>
}

const order = {name: "", email: "", card: ""};
let validate = function(){
  let val = true;
    if (!email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9] {1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
      console.log("bad email");
      val = false;
    }
    else {
    order.email = email
    }
    if (fullName.length == 0)
    {
      console.log("bad Name");
      val = false
    }
    else{
    order.name = fullName
    }
    if (!card.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/))
    {
      console.log(card);
      console.log("bad Card");
      val = false
    }
    else{
    order.card = card
    }
    return val;
    }


const showCard = (card) => {
  let newCard = "X"
  for(var i = 1; i < card.length - 4; i++){
    if(isNumeric(card[i])){
      newCard += "X";
    }
    else{
      newCard += "-";
    }
  }
  for(var i = card.length - 4; i < card.length; i++){
    newCard += card[i];
  }
  return newCard
}
const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [card, setCard] = useState("");
const [address, setAddress] = useState({});

function isNumeric (n) {return !isNaN(parseFloat(n)) && isFinite(n)}

const cardChange = (e) => {
  if(!e.target.value) {
    return e.preventDefault();
  }
  else {
    e.target.value = e.target.value.replace(/-/g, '');
    let newVal = '';
    for (var i = 0, nums = 0; i < e.target.value.length; i++){
      if(nums != 0 && nums % 4 == 0) {
          newVal += '-'
      }
      newVal += inputCard.value[i]
      if(isNumeric(e.target.value[i])){
          nums++;
      }
  }
  e.target.value = newVal;
  console.log(e.target.value);
  setCard(e.target.value);
  }
}

const addressChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  setAddress(address => ({...address, [name]:value})) 
}

  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log(
      "in handleChange, Target Value : ",
      e.target.value,
      " Query Value :",
      query
    );
    const results = ProductsShown.filter((eachProduct) => {
      if (e.target.value === "") {
        return ProductsShown;
      }
      return eachProduct.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setProductsCategory(results);
  };

  function showHideCart(){
    setShowCart(!showCart);
    setShowCatalog(!showCatalog);
    if(!showCart){
      const results = ProductsShown.filter((el) => {return cart.includes(el)});
      setProductsCategory(results);
      render_cart(cart);
    }
    else{
      setProductsCategory(ProductsShown);
      render_products(ProductsCategory);
    }
  }

  function showHideResults(){
    console.log(validate());

    if(validate()){
      setShowCart(!showCart);
      setShowResults(!showResults);
      render_results(order);
    }
  }
  function showHideProducts() {
    setShowResults(!showResults);
    setShowCatalog(!showCatalog);
    if(!showCatalog){
      setCart([]);
      setProductsCategory(ProductsShown);
      render_products(ProductsShown);
    }
  }
  return (
      <div className="flex fixed flex-row">
        <div className="ml-5 p-10 xl:basis-4/5">
          {showCatalog && render_products(ProductsCategory)}
          {showCart && render_cart(cart)}
          {showResults && render_results(order)}
        </div>
      </div>
  );
}

export default Shop;
