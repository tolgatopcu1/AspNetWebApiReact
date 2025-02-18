import { Grid } from "@mui/material";
import { IProduct } from "../../Model/IProduct";
import Product from "./Product";
interface Props{
  products:IProduct[]
}
export default function ProductList({products}:Props) {
  return (
    <Grid container spacing={3} padding={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={3} key={product.id}>
          <Product key={product.id} product={product}/>
        </Grid>
      ))}
    </Grid>
  )
}