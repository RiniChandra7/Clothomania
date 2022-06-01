import {CartItemContainer, ItemDetails} from './cart-item.styles.jsx';

const CartItem = ({cartItem}) => {
    const {name, qty, imageUrl, price} = cartItem;

    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <span className='name'>{name}</span>
                <span className='price'>
                    {qty} x ${price}
                </span>
            </ItemDetails>
        </CartItemContainer>
    );
}

export default CartItem;