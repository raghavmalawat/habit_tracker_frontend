import * as React from "react";
import { Route } from "react-router-dom";
import { history } from "./history";
import { authOperations } from "../features/auth/state";
import { authRoutes } from "../features/auth/authRoutes";

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const ProtectedRoute = ({ component: Component, ...otherProps }: IProps) => {
  const checkAuthentication = authOperations.checkAuthentication;
  if (checkAuthentication()) {
    return <Route component={Component} {...otherProps} />;
  } else {
    history.push(authRoutes.LOGIN);
  }
  return null;
};

export { ProtectedRoute };
