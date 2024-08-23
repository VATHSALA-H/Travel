
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({ element: Component, ...rest }) {
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const location = useLocation();

  if (!user_data?.access) {
    return <Navigate to={`/auth/login?next=${location.pathname}`} />;
  }

  return <Component {...rest} />;
}

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  rest: PropTypes.object,
};

export default PrivateRoute;

