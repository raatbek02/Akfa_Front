import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useCart } from "react-use-cart";
import productRest from "../../assets/images/productPage_rest.png";
import review_profile from "../../assets/images/review_profile.png";
import productPage_star from "../../assets/images/productPage_star.png";
import product_cart_logo from "../../assets/images/new_design/product_cart_logo.svg";
import product_compare_logo from "../../assets/images/new_design/product_compare_logo.svg";
import arrowBellow from "../../assets/images/new_design/arrowBellow.svg";
import minus_cart from "../../assets/images/new_design/minus_cart.svg";
import plus_cart from "../../assets/images/new_design/plus_cart.svg";
import depp from "../../assets/images/new_design/depp.png";

import "./ProductPage.css";
import { $host } from "../../http";
import { Link } from "react-router-dom";
import { CART_ROUTE } from "../../utils/consts";
import { useDispatch, useSelector } from "react-redux";
import { setAuthCart } from "../../store/carts";
import Description from "./Description";
import Kits from "./Kits";
import { toast } from "react-toastify";
import { getCompareProducts } from "../../store/compare";

const restImages = [];
for (let i = 0; i < 5; i++) {}

function ProductPage(props) {
  const [description, setDescription] = useState(true);
  const [characteristic, setСharacteristic] = useState(false);
  const [oneProduct, setOneProduct] = useState({});
  const [count, setCount] = useState(1);
  const [kits, setKits] = useState(false);

  const { id } = useParams();
  const { addItem, items, totalItems, totalUniqueItems, emptyCart } = useCart();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
  const isAuth = useSelector((state) => state.isAuthSlice.isAuth);
  const token = JSON.parse(localStorage.getItem("token"));

  const compare_products_local = useSelector(
    (state) => state.compareSlice.compare_products
  );

  const successAdded = () => toast.success("Товар добавлен в корзину!");
  const successCompareAdded = () =>
    toast.success("Товар добавлен в сравнения!");
  const warnCompareAdded = () =>
    toast.warn("Максимальное количество товаров для сравнения-4!");

  console.log("oneProduct", oneProduct);

  useEffect(() => {
    const getOneProduct = async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/products/${id}`)
        .then(({ data }) => setOneProduct(data));
    };
    getOneProduct();
  }, []);

  const plusCount = () => {
    setCount(count + 1);
  };
  const minusCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const addAuthCart = async () => {
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
        successAdded();

        console.log("Success", res);
      })
      .catch((e) => {
        console.log("Ошибка", e);
      });
    //  e.preventDefault();
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
    <div className="productPage">
      <div className="productPage__container">
        <div className="productPage__path">
          {oneProduct.category} / {oneProduct.subcategory}
        </div>
        <div className="productPage__content">
          <div className="productPage__top">
            <div className="productPage__top--data">
              <div className="productPage__top--data-left">
                <div className="productPage__top--restImages">
                  <div>
                    <img src={oneProduct.photo_1} alt="No img" />
                    <img src={oneProduct.photo_2} alt="No img" />
                    <img src={oneProduct.photo_3} alt="No img" />
                    <img src={oneProduct.photo_4} alt="No img" />
                    <img src={oneProduct.photo_5} alt="No img" />
                  </div>
                  <span style={{ marginLeft: "5px" }}>
                    <img src={arrowBellow} alt="No img" />
                  </span>
                </div>
                <div className="productPage__top--mainImage">
                  <div>
                    <img src={oneProduct.main_photo} alt="No img" />
                  </div>
                </div>
              </div>
              <div className="productPage__top--data-right">
                <div>
                  {" "}
                  <div className="productPage__top--title">
                    {oneProduct.title}
                  </div>
                  <div className="productPage__top--price">
                    <span>{oneProduct.price}$</span>
                  </div>
                  <div className="productPage__top--availibility">
                    <span style={{ color: "#343E63", fontWeight: "700" }}>
                      Доступность
                    </span>
                    : На складе
                  </div>
                  <div className="productPage__top--additionalInfo">
                    Доп информация
                  </div>
                </div>
                <div className="productPage__top--cartButtons">
                  <span>Подробнее про условия доставки</span>
                  <div>
                    <div className="productPage__top--counter">
                      <button onClick={minusCount}>
                        <img src={minus_cart} alt="No img" />
                      </button>
                      <span>{count}</span>
                      <button onClick={plusCount}>
                        <img src={plus_cart} alt="No img" />
                      </button>
                    </div>
                    {isAuth ? (
                      <div
                        onClick={() => addAuthCart()}
                        className="productPage__top-addCart"
                      >
                        <img src={product_cart_logo} alt="No img" />
                        <span> В корзину</span>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          addItem(oneProduct, count);
                          successAdded();
                        }}
                        className="productPage__top-addCart"
                      >
                        <img src={product_cart_logo} alt="No img" />
                        <span> В корзину</span>
                      </div>
                    )}
                    <div
                      onClick={(e) =>
                        addCompareProducts(e, oneProduct, oneProduct.id)
                      }
                      className="productPage__top-compareBtn"
                    >
                      <img src={product_compare_logo} alt="No img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="productPage__top--contact">
              <div>
                <div className="productPage__top--contactInfo">
                  <div className="productPage__top--contactImg">
                    <img src={depp} alt="No img" />
                  </div>
                  <div className="productPage__top--contactTitle">
                    Джони Депп
                  </div>
                  <ul>
                    <li>Менеджер по консультацию</li>
                    <li>+ 996 777 555 555</li>
                    <li>Depp@gmail.com</li>
                  </ul>
                </div>
                <span style={{ fontWeight: "500", color: "#000" }}>
                  Доп информация
                </span>
              </div>
              <div className="productPage__top--contactChat">
                <p>
                  Перейти на <span>Whatsapp</span>
                </p>
                <div className="productPage__top--contactButton">
                  <button>Перейти в чат</button>
                </div>
              </div>
            </div>
          </div>

          <div className="productPage__bottom">
            <div className="productPage__bottom--toggles">
              <ul>
                <li
                  onClick={() => {
                    setDescription(true);
                    setСharacteristic(false);
                    setKits(false);
                  }}
                  className={description ? "active" : ""}
                >
                  О товаре
                </li>
                <li
                  onClick={() => {
                    setDescription(false);
                    setСharacteristic(true);
                    setKits(false);
                  }}
                  className={characteristic ? "active" : ""}
                >
                  Характеристики
                </li>
                <li
                  onClick={() => {
                    setDescription(false);
                    setСharacteristic(false);
                    setKits(true);
                  }}
                  className={kits ? "active" : ""}
                >
                  Комплекты
                </li>
              </ul>
            </div>

            <div className="productPage__bottom--content">
              {description ? (
                <div className="productPage__description">
                  <Description />
                </div>
              ) : characteristic ? (
                <div>Характеристика</div>
              ) : kits ? (
                <div>{<Kits oneProduct={oneProduct} />}</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
