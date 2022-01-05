import React, { useEffect, useState } from "react";
import "./Header.css";
import cart_logo from "../../assets/images/cart_logo.svg";
import compare_logo from "../../assets/images/compare_logo.svg";
import login_logo from "../../assets/images/login_logo.svg";
import red_dot from "../../assets/images/new_design/red_dot.svg";
import lupa from "../../assets/images/new_design/lupa.svg";

import catalog_logo from "../../assets/images/catalog_logo.svg";

import { Link, NavLink, useNavigate } from "react-router-dom";
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
  SEARCH__ROUTE,
} from "../../utils/consts";
import CatalogModal from "../UI/Modal/CatalogModal";
import Category from "../Main/Category/Category";
import { useDispatch, useSelector } from "react-redux";
import { setModalCatalog } from "../../store/modalCatalog";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { addSearchProducts } from "../../store/searchData";

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
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [activeCatalog, setActiveCatalog] = useState();
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const navigate = useNavigate();
  console.log("searchData", searchData);
  //   const [modalCatalog, setModalCatalog] = useState(false);
  console.log("activeCatalog", activeCatalog);

  const dispatch = useDispatch();
  const modalCatalog = useSelector((s) => s.modalCatalog.modalCatalog);

  document.body.style.overflow = activeMobileMenu ? "hidden " : "auto ";

  //   const getSearchData = async () => {
  //     await
  //   }
  const searchHandler = async (e) => {
    if (search && e.key === "Enter") {
      await axios
        .get(`http://localhost:8000/api/products/?search=${search}`)
        .then(({ data }) => {
          setSearchData(data);
          dispatch(addSearchProducts(data.results));
          setSearch("");
          navigate(SEARCH__ROUTE);
        });
    }
  };

  //   const searchHandler_2 = async (e) => {
  //     await axios
  //       .get(`http://localhost:8000/api/products/?search=${encodeURI(search)}`)
  //       .then(({ data }) => {
  //         setSearchData(data);
  //       });
  //   };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content computer">
          <div className="header__left">
            <ul>
              {list.map((obj, index) => {
                return (
                  <li key={index + 1}>
                    <NavLink to={obj.path}>
                      <li key={index}>{obj.name}</li>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <div
              className="header__catalog"
              onClick={() => {
                dispatch(setModalCatalog(!false));
              }}
            >
              <span>Каталог</span>

              <div
                className={
                  modalCatalog
                    ? "header__catalog--icon _active"
                    : "header__catalog--icon"
                }
              >
                <span></span>
              </div>
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
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => searchHandler(e)}
                />
                <img
                  // onClick={() => searchHandler_2()}
                  src={lupa}
                  alt="No img"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="header__content mobile">
          <div className="header__mobile--top">
            <div className="header__logo">
              <Link to="/">
                <span>akfa</span>{" "}
              </Link>
            </div>
            <div className="header__mobile--middle">
              <div className="header__assets-bottom">
                <input type="text" />
                <img src={lupa} alt="No img" />
              </div>
              <div
                className="header__catalog"
                onClick={() => dispatch(setModalCatalog(!false))}
              >
                Каталог
                {modalCatalog ? (
                  <i class="far fa-times-circle"></i>
                ) : (
                  <img src={catalog_logo} alt="No img" />
                )}
              </div>
            </div>
            <nav
              className={
                activeMobileMenu
                  ? "header__mobile--menu _active"
                  : "header__mobile--menu"
              }
            >
              <ul>
                {list.map((obj, index) => {
                  return (
                    <li
                      onClick={() => setActiveMobileMenu(false)}
                      key={index + 3}
                    >
                      <NavLink to={obj.path}>
                        <li key={index}>{obj.name}</li>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>

              <div className="header__assets ">
                <div className="header__cart item">
                  <Link
                    to={CART_ROUTE}
                    onClick={() => setActiveMobileMenu(false)}
                  >
                    <span>Корзина</span>
                    <img src={cart_logo} alt="No img" />
                  </Link>
                </div>

                <div className="header__compare item">
                  <Link
                    to={COMPARE__ROUTE}
                    onClick={() => setActiveMobileMenu(false)}
                  >
                    <span>Сравнения</span>
                    <img src={compare_logo} alt="No img" />
                  </Link>
                </div>

                <div
                  onClick={() => setModalAuth(true)}
                  className="header__login item"
                >
                  <span>Войти</span>
                  <img src={login_logo} alt="No img" />
                </div>
              </div>
            </nav>
            <div
              onClick={() => setActiveMobileMenu(!activeMobileMenu)}
              className={
                activeMobileMenu
                  ? "header__mobile--button _active"
                  : "header__mobile--button"
              }
            >
              <span></span>
            </div>
          </div>
          <div className="header__mobile--bottom"></div>
        </div>
      </div>
      <Modal active={modalAuth} setActive={setModalAuth}>
        <Auth />
      </Modal>
      <CatalogModal>{<Category />}</CatalogModal>
    </header>
  );
}

export default Header;
