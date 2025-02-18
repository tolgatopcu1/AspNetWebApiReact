import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Box, CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import requests from "../api/requests";
import { CartContext, useCartContext } from "../context/CartContext";
import { useAppDispatch } from "../hooks/hooks";
import { setCart } from "../pages/cart/cartSlice";

function App() {

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    requests.Cart.get()
      .then(c=>dispatch(setCart(c)))
      .finally(()=>setLoading(false))
  },[])
    
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
  
}


export default App
