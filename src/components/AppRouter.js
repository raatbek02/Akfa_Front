import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";

function AppRouter() {
  const isAuth = useSelector((state) => state.isAuthSlice.isAuth);
  console.log("IsAuuuuuuth", isAuth);
  //   const isAuth = false;
  return (
    <div>
      <Routes>
        {isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={Component} />
          ))}

        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}
      </Routes>
    </div>
  );
}

export default AppRouter;