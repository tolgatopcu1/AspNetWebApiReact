import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { IProduct } from "../../Model/IProduct";
import { NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItemToCart, setCart } from "../cart/cartSlice";

interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(state => state.cart);
  if (status == "pending") {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  return (

    <Card
      sx={{
        maxWidth: 300,
        margin: 'auto',
        borderRadius: 4,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      {/* Ürün Görseli */}
      <CardMedia
        component="img"
        height="240"
        image={`http://localhost:5182/images/${product.imageUrl}`}
        alt={product.name}
        sx={{
          objectFit: 'contain',
          borderRadius: '4px 4px 0 0',
        }}
      />
      <CardContent
        sx={{
          textAlign: 'center',
          padding: 2,
          backgroundColor: '#ffffff',
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        }}
      >
        {/* Ürün Adı */}
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 500,
            color: '#2c3e50',
            marginBottom: 1,
          }}
        >
          {product.name}
        </Typography>

        {/* Ürün Fiyatı */}
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 700,
            color: '#e74c3c',
            fontSize: '1.2rem',
          }}
        >
          {(product.price/10).toFixed(2)} ₺
        </Typography>

        {/* Butonlar */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
          mt={2}
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              backgroundColor: '#3498db',
              '&:hover': {
                backgroundColor: '#2980b9',
              },
            }}
            onClick={() => dispatch(addItemToCart({productId: product.id}))}
            startIcon={<AddShoppingCart/>}
          >
            Add to Cart
          </Button>
          <Button
            component={NavLink}
            to={`/catalog/${product.id}`}
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{
              color: '#34495e',
              borderColor: '#34495e',
              '&:hover': {
                backgroundColor: '#ecf0f1',
              },
            }}
            startIcon={<SearchIcon/>}
          >
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
