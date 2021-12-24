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
  COMPARE__ROUTE,
  CONTACTS_ROUTE,
  DELIVERY_ROUTE,
  HOME_ROUTE,
  NEWS_ROUTE,
} from "../../utils/consts";
import CatalogModal from "../UI/Modal/CatalogModal";
import Category from "../Main/Category/Category";
import { useDispatch, useSelector } from "react-redux";
import { setModalCatalog } from "../../store/modalCatalog";

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
  //   const [modalCatalog, setModalCatalog] = useState(false);

  const dispatch = useDispatch();
  //   const modalCatalog = useSelector((s) => s.modalCatalog.modalCatalog);

  return (
    <header className="header">
      <div className="header__wrapper">
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
              <div
                className="header__catalog"
                onClick={() => dispatch(setModalCatalog(!false))}
              >
                Каталог
                <img src={catalog_logo} alt="No img" />
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
                    <Link to={COMPARE__ROUTE}>
                      <img src={compare_logo} alt="No img" />
                      <p>Сравнения</p>
                    </Link>
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
        <CatalogModal>{<Category />}</CatalogModal>
      </div>
    </header>
  );
}

export default Header;
