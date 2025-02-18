import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Button, IconButton } from "@mui/material";
import { AddCircleOutline, Delete, RemoveCircleOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItemToCart, deleteItemFromCart } from "./cartSlice";

export default function ShoppingCartPage()  {
  const { cart, status } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

    
  if (cart==null) {
    return (<>Sepetini ürüb yok</>)
  }

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      {status=="pending" ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : (
        <>
          <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
            Sepetiniz
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ürün Resmi</TableCell>
                <TableCell>Ürün Adı</TableCell>
                <TableCell>Fiyat</TableCell>
                <TableCell>Adet</TableCell>
                <TableCell>Toplam</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.cartItems.map((item:any) => (
                <TableRow key={item.productId}>
                  <TableCell>
                    <img style={{height:60}} src={`http://localhost:5182/images/${item.imageUrl}`}  alt={item.name} width="50" height="50" />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price} TL</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <LoadingButton onClick={()=>dispatch(addItemToCart({productId: item.productId}))}>
                      <AddCircleOutline />
                    </LoadingButton>
                    {item.price * item.quantity} TL</TableCell>
                    <LoadingButton onClick={()=>dispatch(deleteItemFromCart({productId: item.productId}))}>
                      <RemoveCircleOutline />
                    </LoadingButton>
                  
                  <TableCell align="right"><IconButton color="error" onClick={()=>dispatch(deleteItemFromCart({productId: item.productId,quantity: item.quantity}))}><Delete/></IconButton></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="contained" color="primary" sx={{ display: "block", margin: "10px auto" }}>
            Satın Al
          </Button>
        </>
      )}
    </TableContainer>
  );
};

