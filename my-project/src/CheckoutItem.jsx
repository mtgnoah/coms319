import React from 'react'
import { Products } from "./Products";
import { useShoppingCart } from "./ShoppingCartContext";


function CheckoutItem({ itemId, quantity }) {
    const { removeFromCart } = useShoppingCart()
    const item = Products.find(i => i.id === itemId)
    if (item == null) return null

    const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
        currency: "USD",
        style: "currency",
    })

    function formatCurrency(number) {
        return CURRENCY_FORMATTER.format(number)
    }

    return (
        <li key={item.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={item.image}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            {item.name}
                        </h3>
                        <p className="ml-4">{formatCurrency(item.price * quantity)}</p>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {quantity}</p>
                    <div> {formatCurrency(item.price)}</div>

                    <div className="flex">
                        <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => removeFromCart(itemId)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CheckoutItem