import React from "react";
import "./Header.css";
import search from "../../assets/images/search.png";
import { Link, NavLink } from "react-router-dom";

const list = [
  {
    name: "Главная",
    path: "/",
  },
  {
    name: "О нас",
    path: "/about",
  },
  {
    name: "Новости",
    path: "/news",
  },
  {
    name: "Доставка и оплата",
    path: "/delivery",
  },
  {
    name: "Контакты",
    path: "/contacts",
  },
];

function Header() {
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
                <button>sign up</button>
              </div>
            </div>
          </div>

          {/* <div className="header__menu">
            <ul>
              <li>Главная</li>
              <li>О нас</li>
              <li>Новости</li>
              <li>Доставка и оплата</li>
              <li>Контакты</li>
            </ul>
          </div>
          <div className="header__logo">
            <img src={akfa} alt="No img" />
          </div>
          <div className="header__sign">
            <div className="header__search">
              <img src={search} alt="No img" />
            </div>
            <div className="header__btn">
              <button>sign up</button>
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
