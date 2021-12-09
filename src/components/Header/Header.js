import React, { useState } from "react";
import "./Header.css";
import search from "../../assets/images/search.png";
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
          </div>
          <div className="header__right">
            <div className="header__logo">
              <Link to="/">
                <span>akfa</span>{" "}
              </Link>
            </div>
            <div className="header__sign">
              <div className="header__search">
                <img src={search} alt="No img" />
              </div>
              <div className="header__btn">
                <button onClick={() => setModalAuth(true)}>sign up</button>
              </div>
              <Link to={CART_ROUTE}>
                <span>K</span>
              </Link>
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
