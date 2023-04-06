import './App.css';
import React, { useState, useEffect } from "react";
import { Products } from "./Products"

import './shop.css';

export function Shop() {

   
    const [ProductsCategory, setProductsCategory] = useState(Products);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);


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
                    <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                    <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                </div>
                <div className="col">
                    ${el.price} <span className="close">&#10005;</span>{howManyofThis(el.id)}
                </div>
            </div>
        </div>
    ));
    const render_products = (ProductsCategory) => {
        return <div className='category-section fixed'>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>
            <a href={`/checkout/`}>Checkout</a>
            <div className="row">
                <div>{listItems}</div>
            </div>
        </div>
    }
    return (
        <div className="flex fixed flex-row">
            <div className="ml-5 p-10 xl:basis-4/5">
                {render_products(ProductsCategory)}
                <div>Items in Cart :</div>
                <div>{cartItems}</div>
                <div>Order total to pay :{cartTotal}</div>
            </div>
        </div>
    );
}

export default Shop;
