import React, { useState } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
import { toast } from "react-toastify";
import { PRODUCT_PAGE_ROUTE } from "../../utils/consts";
import { getCompareProducts } from "../../store/compare";
import "./SearchPage.css";

import product_cart_logo from "../../assets/images/new_design/product_cart_logo.svg";
import product_compare_logo from "../../assets/images/new_design/product_compare_logo.svg";
import lupa_page from "../../assets/images/new_design/lupa_page.png";
import { $host } from "../../http";

function SearchPage() {
  const [count, setCount] = useState(1);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  const isAuth = useSelector((state) => state.isAuthSlice.isAuth);
  const searchedProducts = useSelector(
    (state) => state.searchData.searched_products
  );
  const compare_products_local = useSelector(
    (state) => state.compareSlice.compare_products
  );

  const successAdded = () => toast.success("Товар добавлен в корзину!");
  const successCompareAdded = () =>
    toast.success("Товар добавлен в сравнения!");
  const warnCompareAdded = () =>
    toast.warn("Максимальное количество товаров для сравнения-4!");

  const addAuthCart = async (e, id) => {
    e.stopPropagation();
    const data = {
      product: id,
      quantity: count,
    };

    await $host
      .post(`api/cart-item_product/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        successAdded();

        console.log("Success", res);
      })
      .catch((e) => {
        console.log("Ошибка", e);
      });
    //  e.preventDefault();
  };

  const addLocalCart = (e, id, count) => {
    e.stopPropagation();
    successAdded();

    addItem(id, count);
  };

  const addCompareProducts = (e, el, id) => {
    e.stopPropagation();
    dispatch(getCompareProducts({ el, id }));

    if (compare_products_local.length < 4) {
      successCompareAdded();
    } else {
      warnCompareAdded();
    }
  };

  return (
    <div className="searchPage">
      <div className="searchPage__container">
        <div className="searchPage__title">
          <h2>
            <span>Результаты поиска</span>
          </h2>
          <div className="searchPage__title--img">
            <img src={lupa_page} alt="No img" />
          </div>
        </div>

        <div className="product__content">
          {searchedProducts &&
            searchedProducts.map((el) => {
              return (
                <div
                  key={el.id}
                  onClick={() => navigate(`${PRODUCT_PAGE_ROUTE}/${el.id}`)}
                  className="product__item"
                >
                  <div className="product__img">
                    <img src={el.image} alt="No img" />
                  </div>
                  <div className="product__item--content">
                    <div className="product__name">{el.title}</div>
                    <div className="product__price">
                      <span>{el.price} $</span>
                      <span> есть</span>
                    </div>

                    <div className="product__buttons">
                      {isAuth ? (
                        <div
                          onClick={(e) => addAuthCart(e, el.id)}
                          className="product__cart-button"
                        >
                          <img src={product_cart_logo} alt="No img" />

                          <span>В корзину</span>
                        </div>
                      ) : (
                        <div
                          onClick={(e) => addLocalCart(e, el)}
                          className="product__cart-button"
                        >
                          <img src={product_cart_logo} alt="No img" />

                          <span>В корзину</span>
                        </div>
                      )}

                      <div
                        onClick={(e) => addCompareProducts(e, el, el.id)}
                        className="product__compare-button"
                      >
                        <img src={product_compare_logo} alt="No img" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
