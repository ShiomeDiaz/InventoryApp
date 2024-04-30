import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const [cookies] = useCookies(["isAuthenticated", "token"]);

  if (cookies.token === undefined) {
    console.log(cookies.token);
    console.log("sera este mk?")
    return <Navigate to="/Login" />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};