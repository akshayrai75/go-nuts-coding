import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { USER_ROLES } from "../constants";

function ProtectedRoute() {
  const user = JSON.parse(sessionStorage.getItem("user")) || {};

  let loc = useLocation();
  let location = loc.pathname;
  if (user.id && location === "/") {
    if (user.role === USER_ROLES.ADMIN) {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/ar-view" />;
    }
  } else if (!user.id && location !== "/" && location !== "/register") {
    // save the location so that after login user can be redirected to the same page
    return <Navigate to="/" state={{ from: location }} />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
