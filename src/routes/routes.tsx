import { Router, Route } from "react-router-dom";
import { history } from "./history";
import { AuthRouter } from "../features/auth/authRoutes";

const AppRouter = () => {
  return (
    <Router history={history}>
      <AuthRouter />
    </Router>
  );
};

export { AppRouter };