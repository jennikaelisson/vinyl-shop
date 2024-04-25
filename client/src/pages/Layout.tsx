import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/main.scss";


const Layout = () => {

	return (
		<>
			<Header />

			<Outlet />

			<Footer />
		</>
	);
};

export default Layout;