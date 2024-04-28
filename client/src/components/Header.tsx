import { Link } from "react-router-dom";
import Navigation from "./Navigation";

import headerImage from "../images/banner2.png";
import cartImage from "../images/Cart.png";


const Header = () => {
//   const { cart } = useCart();

  return (
    <>
      
      <div>
        <p className="align-right no-margin">
          <Link to="/cart" className="btn button link-color d-none d-md-inline">
          <img src={cartImage} alt="Cart" className="retro-buttons"/>
          </Link>
          {/* {cart.length} */}
        </p>
      </div>
      <Link to={"/"}><img src={headerImage} alt="Header logo" /></Link>
      <Navigation />
    </>
  );
};

export default Header;
