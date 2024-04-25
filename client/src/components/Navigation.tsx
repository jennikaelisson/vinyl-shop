import { NavLink } from "react-router-dom";

const Navigation = () => {
    return <> <nav>
    <ul>
      <li>
        <NavLink to={"/"}>Home</NavLink>
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
        <NavLink to={"/cart"}>Cart</NavLink>
      </li><li>
        <NavLink to={"/login"}>Login</NavLink>
      </li>
    </ul>
  </nav>
    </>
}

export default Navigation;