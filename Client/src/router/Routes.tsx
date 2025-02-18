import { createBrowserRouter, Navigate } from "react-router";
import App from "../components/App";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import { ContactPage } from "@mui/icons-material";
import CatalogPage from "../pages/catalog/CatologPage";
import ProductDetailsPage from "../pages/catalog/ProductDetailsPage";
import ShoppingCartPage from "../pages/cart/ShoppingCartPage";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <App />,
        children: [
            {path:"",element:<HomePage />},
            {path:"about",element:<AboutPage />},
            {path:"contact",element:<ContactPage />},
            {path:"catalog",element:<CatalogPage />},
            {path:"cart",element:<ShoppingCartPage />},
            {path:"catalog/:id",element:<ProductDetailsPage />}
        ]
    }
])