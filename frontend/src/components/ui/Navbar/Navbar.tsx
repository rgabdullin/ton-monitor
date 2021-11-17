import React from "react";
import {
  Toolbar,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { publicRoutes } from "../../router/routes";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { getText } from "../../helpers";
import { ReactComponent as ReactLogo } from "./icon.svg";
import styles from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  const location = useLocation().pathname;
  const [currentRoute, setCurrentRoute] = React.useState("");
  React.useEffect(() => {
    setCurrentRoute(location);
  }, []);
  const onChangeHandler = (
    event: React.MouseEvent<HTMLElement>,
    newRoute: string
  ) => {
    newRoute && setCurrentRoute(newRoute);
  };
  return (
    <Toolbar className={styles.toolbar}>
      <Typography
        component="h1"
        variant="h4"
        noWrap
        className={styles.toolbarTitle}
      >
        <ReactLogo className={styles.logo} />
      </Typography>
      <Typography
        component="h1"
        variant="h4"
        noWrap
        className={styles.toolbarTitle}
      >
        {getText("navbar.title")}
      </Typography>
      <ToggleButtonGroup
        value={currentRoute}
        exclusive
        onChange={onChangeHandler}
        style={{ marginLeft: "auto" }}
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
    </Toolbar>
  );
};

export default Navbar;
