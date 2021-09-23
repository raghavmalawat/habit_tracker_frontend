import { Redirect, Route, Switch } from "react-router-dom";

import Login from "./views/login";
import ForgotPassword from "./views/forgotPassword";
import UpdatePassword from "./views/updatePassword";

const authRoutes = {
  ROOT: "/",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  PASSWORD_RESET: "/password/reset",
  PASSWORD_UPDATE: "/password/update"
};

const AuthRouter = () => {
  return (
    <Switch>
      <Redirect
        exact
        path={authRoutes.DASHBOARD}
        to={authRoutes.DASHBOARD}
      />
      <Route path="/" exact={true} component={Login} />
      <Route path={authRoutes.LOGIN} exact={true} component={Login} />
      <Route
        path={authRoutes.PASSWORD_RESET}
        exact={true}
        component={ForgotPassword}
      />
      <Route
        path={authRoutes.PASSWORD_UPDATE}
        exact={true}
        component={UpdatePassword}
      />

      <Route>
        <h1>404</h1>
      </Route>
    </Switch>
  );
};

export { AuthRouter, authRoutes };
