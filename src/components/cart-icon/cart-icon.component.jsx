import {ShoppingIcon, ItemCount, CartIconContainer} from './cart-icon.styles.jsx';

import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen} = useContext(CartContext);
    const {cartCount, setCartCount} = useContext(CartContext);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleCart}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;