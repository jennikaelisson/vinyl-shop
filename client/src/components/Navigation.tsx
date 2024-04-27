import { NavLink } from "react-router-dom";
import hImage from "../images/Contact.png";

const Navigation = () => {
    return <> <nav>
    <ul>
      <li>
        <NavLink to={"/"}><img src={homeImage} alt="Home" /></NavLink>
      </li>
      <NavLink to={"/products"}>All products</NavLink>

       {/* <li>
        <NavLink to={"/portfolio"}>Portfolio</NavLink>
      </li> */}
      <li>
        <NavLink to={"/60s"}>60s</NavLink>
      </li>
      <li>
        <NavLink to={"/70s"}>70s</NavLink>
      </li> 
      
      <li>
        <NavLink to={"/login"}>Login</NavLink>
      </li>
    </ul>
  </nav>
    </>
}

export default Navigation;