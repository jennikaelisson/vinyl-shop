import { NavLink } from "react-router-dom";
import homeImage from "../images/Home.png";
import allImage from "../images/All.png";
import sixtiesImage from "../images/60s.png";
import seventiesImage from "../images/70s.png";
import loginImage from "../images/Login.png";


const Navigation = () => {
    return <> <nav>
    <ul className="no-padding-btm">
      <li>
        <NavLink to={"/"}><img src={homeImage} alt="Home" className="retro-buttons" /></NavLink>
      </li>
      <NavLink to={"/products"}><img src={allImage} alt="All" className="retro-buttons" /></NavLink>

       {/* <li>
        <NavLink to={"/portfolio"}>Portfolio</NavLink>
      </li> */}
      <li>
        <NavLink to={"/60s"}><img src={sixtiesImage} alt="60s" className="retro-buttons" /></NavLink>
      </li>
      <li>
        <NavLink to={"/70s"}><img src={seventiesImage} alt="70s" className="retro-buttons" /></NavLink>
      </li> 
      
      <li>
        <NavLink to={"/login"}><img src={loginImage} alt="Login" className="retro-buttons"  /></NavLink>
      </li>
    </ul>
  </nav>
    </>
}

export default Navigation;