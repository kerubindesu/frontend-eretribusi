import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const navigate = useNavigate();

  const { refreshError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (refreshError) navigate("/auth");
  }, [refreshError, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default RequireAuth;
