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

const removeCartItem = (cartItems, removedProd) => {
    const existingItem = cartItems.find(
        (cartItem) => cartItem.id === removedProd.id
    );

    if (existingItem.qty === 1) {
        return cartItems.filter(cartItem => cartItem.id !== removedProd.id);
    }

    if (existingItem) {
        return cartItems.map(
            (cartItem) => 
                cartItem.id === removedProd.id
                ? {...cartItem, qty: cartItem.qty - 1}
                : cartItem
        );
    }
}

const clearCartItem = (cartItems, clearedProd) => {
    return cartItems.filter((cartItem) => cartItem.id !== clearedProd.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (totalItems, cartItem) => totalItems + cartItem.qty,
            0
        );
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.qty * cartItem.price,
            0
        );
        setCartTotal(newTotal);
    }, [cartItems]);

    const addItemToCart = (addedProd) => {
        setCartItems(addCartItem(cartItems, addedProd));
    }

    const removeItemFromCart = (removedProd) => {
        setCartItems(removeCartItem(cartItems, removedProd));
    }

    const clearItemFromCart = (clearedProd) => {
        setCartItems(clearCartItem(cartItems, clearedProd));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart,cartCount,clearItemFromCart,cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}