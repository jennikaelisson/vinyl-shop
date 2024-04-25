import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import Navigation from "./Navigation";

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
 <h1>VINYL</h1><Navigation />
        </div>
}

export default Header;