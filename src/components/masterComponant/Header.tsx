import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: "Home", href: "/" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        background: "#FF6F61", 
        color: "#fff", 
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "0 20px", 
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link
            className="linkM"
            to={"/"}
            style={{
              textDecoration: "none",
              color: "#fff",
              marginLeft: 8,
              fontWeight: 500,
            }}
          >
            Community Page
          </Link>
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              style={{
                textDecoration: "none",
                color: "#fff",
                fontWeight: "bold",
                padding: "10px",
                borderRadius: "4px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FF5252"; // Hover effect
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = ""; // Reset hover effect
              }}
            >
              {item.label}
            </Link>
          ))}
        </Box>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.label}
              onClick={handleMenuClose}
              component="a"
              href={item.href}
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                padding: "10px 20px",
                textAlign: "center",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#FF5252", 
                },
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
