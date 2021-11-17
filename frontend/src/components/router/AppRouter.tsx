import { Redirect, Route, Switch } from "react-router-dom";
import { publicRoutes } from "./routes";

const AppRouter = () => {
  return (
    <Switch>
      {publicRoutes.map((route) => (
        <Route
          component={route.component}
          path={route.path}
          exact={route.exact}
          key={route.text}
        />
      ))}
      <Redirect to="/" />
    </Switch>
  );
};

export default AppRouter;
