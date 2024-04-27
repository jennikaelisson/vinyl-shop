import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import Navigation from "./Navigation";

import headerImage from "../images/header.png"; 

const Header = () => {
    const {cart} = useCart();

    return <div>
               <div>
                <p className="align-right"><Link
							to="/cart"
							className="btn button link-color d-none d-md-inline"
						>
Cart						</Link> {cart.length}</p>
        </div>
<img src={headerImage} alt="Header logo" /><Navigation />
        </div>
}

export default Header;