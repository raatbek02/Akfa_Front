import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import "../App.css";
import { $host } from "../http";

function AppRouter() {
  const [bg, setbg] = useState({});

  useEffect(() => {
    $host.get(`api/bg`).then(({ data }) => {
      setbg(data[0]);
    });
  }, []);
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

      <div className="appRouter__bg">
        <img
          src="https://www.teahub.io/photos/full/19-199007_medicine-background.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default AppRouter;

// 1)"https://www.teahub.io/photos/full/6-67633_apple-backgrounds-best-hd-wallpapers-mcintosh.jpg"
// 2) "https://www.teahub.io/photos/full/57-573828_cool-apple-logo-wallpapers-2-data-src-w.jpg"
// 3) https://www.teahub.io/photos/full/19-199007_medicine-background.jpg
// 4) "https://www.teahub.io/photos/full/1-13480_1920x1200-wallpaper-summer-scene-design-ideas-summer.jpg"
// 5)https://www.teahub.io/photos/full/19-197024_backgrounds-medical-hd-best-free-medicine-wallpapers-medicine.jpg
