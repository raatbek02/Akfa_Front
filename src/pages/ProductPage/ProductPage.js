import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";

import { useCart } from "react-use-cart";
import SwiperCore, { Thumbs } from "swiper";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

import Description from "./Description";
import Kits from "./Kits";
import { getCompareProducts } from "../../store/compare";
import Char from "./Char";
import "./ProductPage.css";
import product_cart_logo from "../../assets/images/new_design/product_cart_logo.svg";
import product_compare_logo from "../../assets/images/new_design/product_compare_logo.svg";
import minus_cart from "../../assets/images/new_design/minus_cart.svg";
import plus_cart from "../../assets/images/new_design/plus_cart.svg";
import depp from "../../assets/images/new_design/depp.png";
import home from "../../assets/images/new_design/home.png";

import { $host } from "../../http";
import { CONTACTS_ROUTE } from "../../utils/consts";
import { Link } from "react-router-dom";

SwiperCore.use([Thumbs]);

function ProductPage(props) {
  const [description, setDescription] = useState(true);
  const [characteristic, setСharacteristic] = useState(false);
  const [oneProduct, setOneProduct] = useState({});
  const [managerData, setManagerData] = useState([]);
  const [count, setCount] = useState(1);
  const [kits, setKits] = useState(false);
  const [sorting, setSorting] = React.useState("");
  const [mainImg, setMainImg] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSorting(event.target.value);
  };

  const { id } = useParams();
  const { addItem } = useCart();

  const dispatch = useDispatch();
  //   const user = useSelector((state) => state.userSlice.user);
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

  let text = "122 312 312";
  let res = text.replace(/\s+/g, "");
  console.log("res", res);
  useEffect(() => {
    const getOneProduct = async () => {
      await $host
        .get(`api/products/${id}`)
        .then(({ data }) => {
          setOneProduct(data);
          setMainImg(data.main_photo);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getOneProduct();
  }, []);

  useEffect(() => {
    const getManagerData = async () => {
      await $host.get(`api/manager/`).then(({ data }) => {
        setManagerData(data);
      });
    };
    getManagerData();
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

    await $host
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

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="loading--block">
        <CircularProgress color="error" />
      </div>
    );
  }

  return (
    <div className="productPage">
      <div className="productPage__container">
        <div className="productPage__path">
          <div
            onClick={() => navigate("/")}
            className="productPage__path--icon"
          >
            <img src={home} alt="No img" />
          </div>{" "}
          <div>
            {oneProduct.category} / {oneProduct.subcategory}
          </div>
        </div>
        <div className="productPage__content">
          <div className="productPage__top">
            <div className="productPage__top--data desktop">
              <div className="productPage__top--data-left ">
                <div className="productPage__top--restImages">
                  <div>
                    <div
                      onClick={() => setMainImg(oneProduct.main_photo)}
                      className="restimage"
                    >
                      <img src={oneProduct.main_photo} alt="" />
                    </div>
                    <div
                      onClick={() => setMainImg(oneProduct.photo_1)}
                      className="restimage"
                    >
                      <img src={oneProduct.photo_1} alt="" />
                    </div>{" "}
                    <div
                      onClick={() => setMainImg(oneProduct.photo_2)}
                      className="restimage"
                    >
                      <img src={oneProduct.photo_2} alt="" />
                    </div>{" "}
                    <div
                      onClick={() => setMainImg(oneProduct.photo_3)}
                      className="restimage"
                    >
                      <img src={oneProduct.photo_3} alt="" />
                    </div>{" "}
                    <div
                      onClick={() => setMainImg(oneProduct.photo_4)}
                      className="restimage"
                    >
                      <img src={oneProduct.photo_4} alt="" />
                    </div>
                  </div>
                </div>
                <div className="productPage__top--mainImage">
                  <div>
                    <img src={mainImg} alt="" />
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
                    <span>{oneProduct.discount_price}$</span>
                  </div>
                  <div className="productPage__top--availibility">
                    <span style={{ color: "#343E63", fontWeight: "700" }}>
                      Доступность
                    </span>
                    {oneProduct.is_done ? ": На складе" : ": Нет"}
                  </div>
                  {/* <div className="productPage__top--additionalInfo">
                    Доп информация
                  </div> */}
                </div>
                <div className="productPage__top--cartButtons">
                  <span>
                    <Link to={CONTACTS_ROUTE}>
                      Подробнее про условия доставки
                    </Link>
                  </span>
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

            <div className="productPage__top--data mobile">
              <div className="productPage__top--data-left">
                <div className="productPage__top--mainImage">
                  <div>
                    <img src={mainImg} alt="" />
                  </div>
                  <p>Код товара: AR-Mammo</p>
                </div>

                <div className="productPage__top--restImages">
                  <div>
                    <div
                      className="restimage"
                      onClick={() => setMainImg(oneProduct.main_photo)}
                    >
                      <img src={oneProduct.main_photo} alt="" />
                    </div>
                    <div
                      className="restimage"
                      onClick={() => setMainImg(oneProduct.photo_1)}
                    >
                      <img src={oneProduct.photo_1} alt="" />
                    </div>{" "}
                    <div
                      className="restimage"
                      onClick={() => setMainImg(oneProduct.photo_2)}
                    >
                      <img src={oneProduct.photo_2} alt="" />
                    </div>{" "}
                    <div
                      className="restimage"
                      onClick={() => setMainImg(oneProduct.photo_3)}
                    >
                      <img src={oneProduct.photo_3} alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="productPage__top--data-right">
                <div className="mid">
                  {" "}
                  <div className="productPage__top--title">
                    {oneProduct.title}
                  </div>
                  <div className="productPage__top--price">
                    <span>{oneProduct.discount_price}$</span>
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
                  <div className="productPage__top--deliveryInfo">
                    Подробнее про условия доставки
                  </div>
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
                  </div>
                </div>

                <div className="productPage__top--cartButtons">
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

            <div className="productPage__top--contact">
              {managerData &&
                managerData.map((el) => (
                  <>
                    <div>
                      <div className="productPage__top--contactInfo">
                        <div className="productPage__top--contactImg">
                          <img src={el.avatar} alt="No img" />
                        </div>
                        <div className="productPage__top--contactTitle">
                          {el.title}
                        </div>
                        <ul>
                          <li>Менеджер по консультацию</li>
                          <li>{el.phone_number}</li>
                          <li>{el.email}</li>
                        </ul>
                      </div>
                      {/* <span style={{ fontWeight: "500", color: "#000" }}>
                  Доп информация
                </span> */}
                    </div>
                    <div className="productPage__top--contactChat">
                      <a
                        href={`https://wa.me/${String(el.phone_number).replace(
                          /\s+/g,
                          ""
                        )}`}
                        target={"_blank"}
                        rel="noreferrer"
                      >
                        <p>
                          Перейти на <span>Whatsapp</span>
                        </p>
                      </a>

                      <div className="productPage__top--contactButton">
                        <a
                          href={`https://wa.me/${String(
                            el.phone_number
                          ).replace(/\s+/g, "")}`}
                          target={"_blank"}
                          rel="noreferrer"
                        >
                          <button>Перейти в чат</button>
                        </a>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>

          <div className="productPage__bottom">
            <div className="productPage__bottom--toggles desktop">
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

            <div className="productPage__bottom--toggles mobile">
              <FormControl sx={{ m: 1, minWidth: 150 }} color="error">
                <InputLabel id="demo-simple-select-autowidth-label">
                  О товаре
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={sorting}
                  onChange={handleChange}
                  autoWidth
                  label=" О товаре"
                >
                  <MenuItem
                    value={1}
                    onClick={() => {
                      setDescription(true);
                      setСharacteristic(false);
                      setKits(false);
                    }}
                    className={description ? "active" : ""}
                  >
                    О товаре
                  </MenuItem>
                  <MenuItem
                    value={2}
                    onClick={() => {
                      setDescription(false);
                      setСharacteristic(true);
                      setKits(false);
                    }}
                    className={characteristic ? "active" : ""}
                  >
                    Характеристики
                  </MenuItem>{" "}
                  <MenuItem
                    value={3}
                    onClick={() => {
                      setDescription(false);
                      setСharacteristic(false);
                      setKits(true);
                    }}
                    className={kits ? "active" : ""}
                  >
                    Комплекты
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="productPage__bottom--content">
              {description ? (
                <div className="productPage__description">
                  <Description oneProduct={oneProduct} />
                </div>
              ) : characteristic ? (
                <div>{<Char oneProduct={oneProduct} />}</div>
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
