import React from "react";
import { Navigate, Outlet } from "react-router";
import useUserAuthStatus from "./../hooks/useUserAuthStatus";

const AuthenticatedPage = () => {
  const { userLoggedIn, checkUserStatus } = useUserAuthStatus();

  if (checkUserStatus) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }

  return userLoggedIn ? <Outlet /> : <Navigate to="/signIn" />;
};

export default AuthenticatedPage;
