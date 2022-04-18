import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import "../App.css";

function AppRouter() {
  const isAuth = useSelector((state) => state.isAuthSlice.isAuth);
  return (
    <div
      // style={{
      //   background: "#FAFAF2",
      // }}
      className="appRouter"
    >
      <Routes primary={false}>
        {isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route primary={false} key={path} path={path} element={Component} />
          ))}

        {publicRoutes.map(({ path, Component }) => (
          <Route primary={false} key={path} path={path} element={Component} />
        ))}
      </Routes>
    </div>
  );
}

export default AppRouter;

// 1)"https://www.teahub.io/photos/full/6-67633_apple-backgrounds-best-hd-wallpapers-mcintosh.jpg"
// 2) "https://www.teahub.io/photos/full/57-573828_cool-apple-logo-wallpapers-2-data-src-w.jpg"
// 3) https://www.teahub.io/photos/full/19-199007_medicine-background.jpg
// 4) "https://www.teahub.io/photos/full/1-13480_1920x1200-wallpaper-summer-scene-design-ideas-summer.jpg"
// 5)https://www.teahub.io/photos/full/19-197024_backgrounds-medical-hd-best-free-medicine-wallpapers-medicine.jpg
