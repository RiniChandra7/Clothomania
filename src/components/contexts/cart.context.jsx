import { createContext, useEffect, useReducer, useState } from "react";

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

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
};
  
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};
  
const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};

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

    const [{cartCount, cartTotal, cartItems}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (cartItems) => {
        const newCartCount = cartItems.reduce(
            (totalItems, cartItem) => totalItems + cartItem.qty,
            0
        );

        const newTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.qty * cartItem.price,
            0
        );

        const payload = {
            cartItems,
            cartCount: newCartCount,
            cartTotal: newTotal,
        };

        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: payload});
    };

    const addItemToCart = (addedProd) => {
        const newCartItems = addCartItem(cartItems, addedProd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (removedProd) => {
        const newCartItems = removeCartItem(cartItems, removedProd);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (clearedProd) => {
        const newCartItems = clearCartItem(cartItems, clearedProd);
        updateCartItemsReducer(newCartItems);
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart,cartCount,clearItemFromCart,cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}