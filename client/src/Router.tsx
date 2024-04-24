import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./Home";
import Errorpage from "./pages/ErrorPage";
import Admin from "./pages/Admin";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister";
import ProductList from "./components/ProductList";


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
		],
	},
	{
		path: "*",
		element: <Errorpage />,
	},
]);
