import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";

import {ReactComponent as Logo} from '../../assets/crown.svg';
import { UserContext } from '../../components/contexts/user.context';
import { CartContext } from "../../components/contexts/cart.context";

import './navigation.styles.scss';

import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <Logo className="logo" />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>
                {
                    currentUser ?
                    (<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>) :
                    (
                        <Link className="nav-link" to="/signin">
                            SIGN-IN
                        </Link>
                    )
                }
                <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
    );
  }

export default Navigation;