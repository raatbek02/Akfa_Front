import React, { useEffect, useState } from "react";
import "./Kits.css";
import product_cart_logo from "../../assets/images/new_design/product_cart_logo.svg";
import product_compare_logo from "../../assets/images/new_design/product_compare_logo.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import { useCart } from "react-use-cart";



function Kits({ oneProduct }) {
  const [kitsProducts, setKitsProducts] = useState([]);
  const [count, setCount] = useState(1);
  const { addItem, items, totalItems, totalUniqueItems, emptyCart } = useCart();
  const isAuth = useSelector((state) => state.isAuthSlice.isAuth);
  const token = JSON.parse(localStorage.getItem("token"));

  console.log("kitsProducts", kitsProducts);

  useEffect(() => {
    const getOneProduct = async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/products?kits=${oneProduct.kits}`)
        .then(({ data }) => setKitsProducts(data));
    };
    getOneProduct();
  }, []);

  const addAuthCart = async (e, id) => {
    e.stopPropagation();
    const data = {
      product: id,
      quantity: count,
    };

    await axios
      .post(`http://127.0.0.1:8000/api/cart-item_product/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        setCount(count);

        console.log("Success", res);
      })
      .catch((e) => {
        console.log("Ошибка", e);
      });
    //  e.preventDefault();
  };

  const addLocalCart = (e, id, count) => {
    e.stopPropagation();

    addItem(id, count);
  };

  return (
    <div className="kits">
      <div className="kits__container">
        <div className="kits__content">
          {kitsProducts.results &&
            kitsProducts.results.map((el) => {
              return (
                <div
                  // onClick={() => navigate(`${PRODUCT_PAGE_ROUTE}/${el.id}`)}
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

                    <div
                      onClick={(e) => addAuthCart(e, el.id)}
                      className="product__buttons"
                    >
                      {isAuth ? (
                        <div className="product__cart-button">
                          <img src={product_cart_logo} alt="No img" />

                          <span>В корзину</span>
                        </div>
                      ) : (
                        <div
                          onClick={(e) => addLocalCart(e, el, count)}
                          className="product__cart-button"
                        >
                          <img src={product_cart_logo} alt="No img" />

                          <span>В корзину</span>
                        </div>
                      )}

                      <div className="product__compare-button">
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

export default Kits;
