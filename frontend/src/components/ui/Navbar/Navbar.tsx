import React from "react";
import {
  Toolbar,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
} from "@mui/material";
import { publicRoutes } from "../../router/routes";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { getText } from "../../helpers";
import { ReactComponent as ReactLogo } from "./icon.svg";
import styles from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  const [currentRoute, setCurrentRoute] = React.useState(
    useLocation().pathname
  );
  const onChangeHandler = (
    event: React.MouseEvent<HTMLElement>,
    newRoute: string
  ) => {
    newRoute && setCurrentRoute(newRoute);
  };
  return (
    <Toolbar className={styles.toolbar}>
      <Grid container>
        <Grid item xs={12} md={5}>
          <Typography
            component="h1"
            variant="h4"
            noWrap
            className={styles.toolbarTitle}
          >
            <ReactLogo className={styles.logo} />
            {getText("navbar.title")}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7} style={{ textAlign: "end" }}>
          <ToggleButtonGroup
            value={currentRoute}
            exclusive
            onChange={onChangeHandler}
            className={styles.toggleButtonGroup}
          >
            {publicRoutes.map((item, index) => (
              <ToggleButton
                value={item.path}
                component={RouterLink}
                to={item.path}
                key={item.path}
                className={styles.toggleButton}
              >
                {item.text}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default Navbar;
