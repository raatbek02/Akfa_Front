import React from "react";
import Banner from "./Banner/Banner";
import Logo from "./Logo/Logo";
import News_blog from "./News_blog/News_blog";
import Products from "./Products/Products";

function Main() {
  return (
    <main>
      <Banner />
      <Logo />
      <Products />
      <News_blog />
    </main>
  );
}

export default Main;
