import './cart-dropdown.styles.jsx';

import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';

import {
    CartDropdownContainer,
    EmptyMessage,
    CartItems,
  } from './cart-dropdown.styles';


const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const nav = useNavigate();

    const checkoutHandler = () => {
        nav('/checkout')
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
                ) : (
                <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={checkoutHandler}>CHECKOUT</Button>
        </CartDropdownContainer>
    );
}

export default CartDropdown;