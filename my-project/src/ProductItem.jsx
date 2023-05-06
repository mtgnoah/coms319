import { React, useState, useEffect } from "react"


import { useShoppingCart } from "./ShoppingCartContext"


function ProductItem({ image, id, price, desc, name }) {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
    } = useShoppingCart()

    const [quantity, setQuantity] = useState(0);


    useEffect(() => {
        const getQuantity = async () => {
            const q = await getItemQuantity(id);
            setQuantity(q);
        };
        getQuantity();
    }, [getItemQuantity, id]);


    return (
        <div className="group relative">
            <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    src={image}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        {name}
                    </h3>
                    <p className="text-sm font-medium text-gray-900">{price}</p>
                </div>
                <div className="mt-1">
                    {quantity === 0 ? (
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => increaseCartQuantity(id)}>
                            + Add To Cart
                        </button>
                    ) : (
                        <div
                            className="d-flex align-items-center flex-column"
                        >
                            <div
                                className="d-flex align-items-center justify-content-center"
                            >
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => decreaseCartQuantity(id)}>-</button>
                                <div>
                                        <span className="fs-3">{quantity}</span> in cart
                                </div>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => increaseCartQuantity(id)}>+</button>
                            </div>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => removeFromCart(id)}
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductItem