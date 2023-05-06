import { createContext, useContext, useState, useEffect } from "react"
import CheckoutPopout from './CheckoutPopout';
import { useLocalStorage } from "./useLocalStorage"

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage("shopping-cart", [])

    const [cartId, setCartId] = useState("");

    useEffect(() => {
        async function fetchCartItems() {
            try {
                const response = await fetch("http://localhost:4000/cart", {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                })
                const data = await response.json();
                console.log("FIRST");
                setCartId(data._id);

            } catch (error) {
                console.error(error);
            }
        }
        fetchCartItems();
    }, []);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    async function getItemQuantity(itemId) {
        try {
            const response = await fetch("http://localhost:4000/cart/" + cartId + "/quantity/" + itemId);
            const data = await response.json();
           // console.log(data);
            return data.quantity;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    async function increaseCartQuantity(id) {
        try {
            const msg = { "cartId": cartId, "itemId": id }
            const response = await fetch("http://localhost:4000/cart/increaseQuantity", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(msg),
            });
            const data = await response.json();
            setCartItems(data.items);

        } catch (error) {
            console.error(error);
        }
    }

    async function decreaseCartQuantity(id) {
        //TODO so here I will want to call /cart/decreaseQuantity and then setCartItems with that result
        try {
            const msg = { "cartId": cartId, "itemId": id }
            const response = await fetch("http://localhost:4000/cart/decreaseQuantity", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(msg),
            });
            const data = await response.json();
            setCartItems(data.items);

        } catch (error) {
            console.error(error);
        }
    }

    async function removeFromCart(id) {
        try {
            const response = await fetch(`http://localhost:4000/cart/${cartId}/delete/${id}`, {
                method: "DELETE",
                headers: { "Content-type": "application/json" },
            });
            const data = await response.json();
            setCartItems(data.items);
        } catch (error) {
            console.error(error);
        }
    }

    async function checkout() {
        try {
            setIsOpen(false)
            const msg = {"cartId": cartId}
            const response = await fetch("http://localhost:4000/checkout", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(msg),
            });
            console.log(response);

            setCartItems([]);
            alert("Checkout Successful!");

            window.location.reload(false);

            // const res = await fetch("http://localhost:4000/cart", {
            //         method: "POST",
            //         headers: { "Content-type": "application/json" },
            //     })
            // const data = await res.json();
            // setCartId(data._id);

        } catch (error) {
            console.error(error);
        }
    }



    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                checkout,
                cartItems,
                cartQuantity
            }}
        >
            {children}
            <CheckoutPopout isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}
