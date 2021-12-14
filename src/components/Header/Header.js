import React, { useState } from "react";
import "./Header.css";
import cart_logo from "../../assets/images/cart_logo.svg";
import compare_logo from "../../assets/images/compare_logo.svg";
import login_logo from "../../assets/images/login_logo.svg";
import red_dot from "../../assets/images/new_design/red_dot.svg";


import catalog_logo from "../../assets/images/catalog_logo.svg";

import { Link, NavLink } from "react-router-dom";
import Modal from "../UI/Modal/Modal";
import Auth from "../Auth/Auth";
import {
  ABOUT_ROUTE,
  CART_ROUTE,
  CONTACTS_ROUTE,
  DELIVERY_ROUTE,
  HOME_ROUTE,
  NEWS_ROUTE,
} from "../../utils/consts";

const list = [
  {
    name: "Главная",
    path: HOME_ROUTE,
  },
  {
    name: "О нас",
    path: ABOUT_ROUTE,
  },
  {
    name: "Новости",
    path: NEWS_ROUTE,
  },
  {
    name: "Доставка и оплата",
    path: DELIVERY_ROUTE,
  },
  {
    name: "Контакты",
    path: CONTACTS_ROUTE,
  },
];

function Header() {
  const [modalAuth, setModalAuth] = useState(false);
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <div className="header__left">
            <ul>
              {list.map((obj, index) => {
                return (
                  <li>
                    <NavLink to={obj.path}>
                      <li key={index}>{obj.name}</li>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <div className="header__catalog">
              Каталог{" "}
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 11H21"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11 15H21"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11 19H21"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="header__right">
            <div className="header__logo">
              <Link to="/">
                <span>akfa</span>{" "}
              </Link>
            </div>
            <div className="header__assets">
              <div className="header__assets-top">
                <div className="header__cart">
                  <Link to={CART_ROUTE}>
                    <img src={cart_logo} alt="No img" />
                    <p>Корзина</p>
                  </Link>
                </div>

                <div className="header__compare">
                  <img src={compare_logo} alt="No img" />
                  <p>Сравнения</p>
                </div>

                <div
                  onClick={() => setModalAuth(true)}
                  className="header__login"
                >
                  <img src={login_logo} alt="No img" />
                  <p>Войти</p>
                </div>
              </div>
              <div className="header__assets-bottom">
                <input type="search" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal active={modalAuth} setActive={setModalAuth}>
        <Auth />
      </Modal>
    </header>
  );
}

export default Header;
