import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";

import {ReactComponent as Logo} from '../../assets/crown.svg';
import { UserContext } from '../../components/contexts/user.context';
import { CartContext } from "../../components/contexts/cart.context";

import {NavigationContainer, NavLinks, LogoContainer, NavLink} from './navigation.styles.jsx';

import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <Logo className="logo" />
            </LogoContainer>
            <NavLinks>
                <NavLink to="/shop">
                    SHOP
                </NavLink>
                {
                    currentUser ?
                    (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) :
                    (
                        <NavLink to="/signin">
                            SIGN-IN
                        </NavLink>
                    )
                }
                <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    );
  }

export default Navigation;