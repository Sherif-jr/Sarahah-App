import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { userToken, loading } = useContext(UserContext);
  const allowed = userToken !== null;
  console.log(userToken);

  console.log(userToken !== null);

  if (loading) {
    console.log("loading...");
    return (
      <div className="d-flex justify-content-center my-5">
        <i className="fas fa-spin fa-spinner fa-10x"></i>
      </div>
    );
  }
  if (!allowed) {
    console.log(allowed);
    return <Navigate to="/auth/login" />;
  }
  return children;
};

const GuestRoute = ({ children }) => {
  const { userToken, loading } = useContext(UserContext);
  console.log(userToken);

  const guest = userToken === null;
  if (loading) {
    console.log("loading...");
    return (
      <div className="d-flex justify-content-center my-5">
        <i className="fas fa-spin fa-spinner fa-10x"></i>
      </div>
    );
  }
  if (guest) {
    return children;
  } else {
    return <Navigate to="/messages/my-messages" />;
  }
};

export default ProtectedRoute;
export { ProtectedRoute, GuestRoute };
