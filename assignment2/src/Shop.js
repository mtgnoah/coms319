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
          <div className="row">{el.desc}</div>
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
        <a href={`/checkout/`}>Checkout</a>
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
          {/**<button onClick={showHideResults}>Checkout</button>*/}
        </div>
      <div className = "category-section fixed">
        <h2 className="text-3x1 font-extrabold tracking-tight text-gray-600 category-title">
          Cart ({cart.length})
        </h2>
        <div className = "row">
          <div>{listCart}</div>
        </div>
        <div className = "row">
          <div className = "col">
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
      </div>
  }
  else{
    render_products(ProductsShown);
  }
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
    }
    else{
      setProductsCategory(ProductsShown);
    }
    render_cart(cart);
  }
  return (
      <div className="flex fixed flex-row">
        <div className="ml-5 p-10 xl:basis-4/5">
          {showCatalog && render_products(ProductsCategory)}
          {showCart && render_cart(cart)}
        </div>
      </div>
  );
}

export default Shop;
