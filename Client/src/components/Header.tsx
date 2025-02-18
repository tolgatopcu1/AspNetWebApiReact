import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router";
import Container from "@mui/material/Container";
import { useCartContext } from "../context/CartContext";
import { useAppSelector } from "../hooks/hooks";

interface Link {
  title: string;
  path: string;
}

interface NavbarProps {
  cartItemCount?: number;
}

const links: Link[] = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
  { title: "Catalog", path: "/catalog" },
];

const Navbar: React.FC<NavbarProps> = ({ cartItemCount = 0 }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const {cart} = useAppSelector(state => state.cart);

  const itemCount = cart?.cartItems.reduce((total,item)=>total + item.quantity,0 )
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Brand Name */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", display: "flex", alignItems: "center" }}
          >
            MyBrand
          </Typography>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }: { isActive: boolean }) => ({
                  textDecoration: "none",
                  color: isActive ? "#FFD700" : "white",
                  fontWeight: isActive ? "bold" : "normal",
                  transition: "color 0.3s ease",
                })}
              >
                <Typography
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "#FFD700",
                    },
                  }}
                >
                  {link.title}
                </Typography>
              </NavLink>
            ))}
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {links.map((link) => (
                <MenuItem key={link.path} onClick={handleMenuClose}>
                  <NavLink
                    to={link.path}
                    style={({ isActive }: { isActive: boolean }) => ({
                      textDecoration: "none",
                      color: isActive ? "#FFD700" : "black",
                      fontWeight: isActive ? "bold" : "normal",
                      transition: "color 0.3s ease",
                    })}
                  >
                    {link.title}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Shopping Cart Icon */}
          <IconButton
            size="large"
            color="inherit"
            aria-label="cart"
            component={NavLink}
            to="/cart"
          >
            <Badge badgeContent={itemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;