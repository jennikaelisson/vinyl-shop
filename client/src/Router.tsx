import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./Home";
import Errorpage from "./pages/ErrorPage";
import Admin from "./pages/Admin";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister";
import ProductList from "./pages/ProductList";
import SeventiesList from "./pages/SeventiesList";
import SixtiesList from "./pages/SixtiesList";
import Cart from "./pages/Cart";
import Confirmation from "./pages/Confirmation";


export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
				index: true,
			},
			{
				path: "/register",
				element: <CustomerRegister />,
			},
			{
				path: "/login",
				element: <CustomerLogin />,
			},
			{
				path: "/admin",
				element: <Admin />,
			},
			{
				path: "/products",
				element: <ProductList />,
			},
			{
				path: "/60s",
				element: <SixtiesList />,
			},
			{
				path: "/70s",
				element: <SeventiesList
				 />,
			},{
				path: "/cart",
				element: <Cart
				 />,
			},
			{
				path: "/confirmation",
				element: <Confirmation
				 />,
			},
		],
	},
	{
		path: "*",
		element: <Errorpage />,
	},
]);
