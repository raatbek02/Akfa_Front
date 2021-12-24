import React from "react";
import "./Compare.css";

import product_cart_logo from "../../assets/images/new_design/product_cart_logo.svg";
import product_compare_logo from "../../assets/images/new_design/product_compare_logo.svg";
import { useSelector } from "react-redux";

function Compare() {
  //   const compare_products = useSelector(
  //     (state) => state.compareSlice.compare_products
  //   );
  const compare_products_local = JSON.parse(
    localStorage.getItem("compare_products")
  );

  return (
    <div className="compare">
      <div className="compare__container">
        <div className="compare__title">
          <h2>
            <span>Сравнение товаров</span>
          </h2>
        </div>
        {/* <div className="compare__categories">
          <ul>
            <li>Ветеринария</li>
            <li>Кардиология</li>
            <li>Анастазиология</li>
            <li>Гинекология</li>
          </ul>
        </div> */}

        <div className="compare__content">
          <div className="compare__left">
            <div className="compare__item--card">Товар</div>
            <div className="compare__item--field">Модель</div>{" "}
            <div className="compare__item--field">Производитель</div>{" "}
            <div className="compare__item--field">Описание</div>
            <div className="compare__item--field">Наличие</div>
            <div className="compare__item--field">Наличие</div>
          </div>
          <div className="compare__right">
            <div className="compare__products">
              {compare_products_local.map((el) => {
                return (
                  <div className="compare__item">
                    <div className="compare__item--card">
                      <div className="compare__img">
                        <img src={el.image} alt="No img" />
                      </div>
                      <div className="compare__item--content">
                        <div className="compare__name">{el.title}</div>
                        <div className="compare__price">
                          <span>{el.price} $</span>
                          {/* <span> есть</span> */}
                        </div>
                      </div>
                    </div>
                    <div className="compare__item--field">Модел</div>
                    <div className="compare__item--field">Модел 2</div>
                    <div className="compare__item--field">Модел 3</div>
                    <div className="compare__item--field">Модел 4</div>
                    <div className="compare__item--field">Модел 5</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compare;
