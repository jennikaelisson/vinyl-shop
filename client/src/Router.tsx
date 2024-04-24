import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./Home";
import Errorpage from "./pages/ErrorPage";
import Admin from "./pages/Admin";


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
			// {
			// 	path: "/book",
			// 	element: <Book />,
			// },
			// {
			// 	path: "/contact",
			// 	element: <Contact />,
			// },
			{
				path: "/admin",
				element: <Admin />,
			},
		],
	},
	{
		path: "*",
		element: <Errorpage />,
	},
]);
