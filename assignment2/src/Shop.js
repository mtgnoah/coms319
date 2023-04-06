import './App.css';
import React, { useState } from "react";
import { Products } from "./Products"

export function Shop() {

   
    const [ProductsCategory, setProductsCategory] = useState(Products);

    const render_products = (ProductsCategory) => {
        return <div className='category-section fixed'>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>
            <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{
                maxHeight: '800px', overflowY:
                    'scroll'
            }}>
                {/* Loop Products */}
                {ProductsCategory.map((product, index) => (
                    <div key={index} className="group relative shadow-lg" >
                        <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                            <img
                                alt="Product Image"
                                src={product.image}
                                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                            />
                        </div>
                        <div className="flex justify-between p-3">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                    <p style={{ fontSize: '16px', fontWeight: '600' }}>{product.name}</p>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">Description: {product.desc}</p>
                            </div>
                            <p className="text-sm font-medium text-green-600">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    }
    return (
        <div className="flex fixed flex-row">
            <div className="ml-5 p-10 xl:basis-4/5">
                {render_products(ProductsCategory)}
            </div>
        </div>
    );
}

export default Shop;
