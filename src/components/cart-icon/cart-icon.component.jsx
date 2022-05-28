import {ReactComponent as Cart} from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen} = useContext(CartContext);
    const {cartCount, setCartCount} = useContext(CartContext);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <div className='cart-icon-container' onClick={toggleCart}>
            <Cart className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    );
}

export default CartIcon;