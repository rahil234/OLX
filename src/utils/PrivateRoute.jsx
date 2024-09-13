import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ element }) => {
  const { user, setIsVisible } = useContext(AuthContext);

  return user ? (
    element
  ) : (
    <>
      {setIsVisible(true)}
      <Navigate to="/" />
    </>
  );
};

export default PrivateRoute;
