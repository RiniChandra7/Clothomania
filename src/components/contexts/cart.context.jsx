import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, addedProd) => {
    const existingItem = cartItems.find(
        (cartItem) => cartItem.id === addedProd.id
    );

    if (existingItem) {
        return cartItems.map(
            (cartItem) => 
                cartItem.id === addedProd.id
                ? {...cartItem, qty: cartItem.qty + 1}
                : cartItem
        );
    }

    return [...cartItems, {...addedProd, qty: 1}];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (totalItems, cartItem) => totalItems + cartItem.qty,
            0
        );
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (addedProd) => {
        setCartItems(addCartItem(cartItems, addedProd));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}