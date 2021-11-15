import { Redirect, Route, Switch } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";

const AppRouter = () => {
  return (
    <Switch>
      {publicRoutes.map((route) => (
        <Route
          component={route.component}
          path={route.path}
          exact={route.exact}
          key={route.path}
        />
      ))}
      <Redirect to="/main" />
    </Switch>
  );
};

export default AppRouter;
