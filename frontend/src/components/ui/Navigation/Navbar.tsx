import React from "react";
import { AppBar, Toolbar, Typography, List, ListItem } from "@mui/material";
import { publicRoutes } from "../../router/routes";
import { Link as RouterLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <AppBar position="absolute">
      <Toolbar>
        {publicRoutes.map((item, index) => (
          <span key={item.path}>
            <ListItem
              button
              key={item.path}
              component={RouterLink}
              to={item.path}
            >
              {item.text}
            </ListItem>
          </span>
        ))}
        <Typography
          component="h1"
          variant="h6"
          noWrap
          style={{ marginLeft: "auto" }}
        >
          TON page
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
