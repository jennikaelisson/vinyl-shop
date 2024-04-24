import { useCart } from "../Context/CartContext";
import Navigation from "./Navigation";

const Header = () => {
    const {cart} = useCart();

    return <div>
        <h1>VINYL</h1><Navigation />
        <p>Cart: {cart.length}</p>
        </div>
}

export default Header;