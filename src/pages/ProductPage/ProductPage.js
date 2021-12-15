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

const restImages = [];
for (let i = 0; i < 5; i++) {
  restImages.push(productRest);
}

function ProductPage(props) {
  const [description, setDescription] = useState(true);
  const [characteristic, setСharacteristic] = useState(false);
  const [kits, setKits] = useState(false);

  const [oneProduct, setOneProduct] = useState({});
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const { addItem, items, totalItems, totalUniqueItems, emptyCart } = useCart();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
  const isAuth = useSelector((state) => state.isAuthSlice.isAuth);

  const token = JSON.parse(localStorage.getItem("token"));

  //   const id2 = props.match.params.id;
  //   console.log("id2", id2);
  // console.log(oneProduct);
  console.log("items", items);
  console.log("totalItems", totalItems);
  console.log("totalUniqueItems", totalUniqueItems);

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
  //   const showDescHandler = () => {
  //     setShow(true);
  //   };
  //   const showReviewsHandler = () => {
  //     setShow(false);
  //   };

  const addAuthCart = async () => {
    const data = {
      product: id,
      quantity: count,
    };

    await axios
      .post(`http://127.0.0.1:8000/api/cart-item/`, data, {
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
                    {restImages.map((el) => {
                      return <img src={oneProduct.image} alt="No img" />;
                    })}
                  </div>
                  <span style={{ marginLeft: "5px" }}>
                    <img src={arrowBellow} alt="No img" />
                  </span>
                </div>
                <div className="productPage__top--mainImage">
                  <div>
                    <img src={oneProduct.image} alt="No img" />
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
                        onClick={() => addItem(oneProduct, count)}
                        className="productPage__top-addCart"
                      >
                        <img src={product_cart_logo} alt="No img" />
                        <span> В корзину</span>
                      </div>
                    )}
                    <div className="productPage__top-compareBtn">
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
                <div>Комплекты</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

// <div className="productPage__left">
//   <p className="productPage__name">{oneProduct.title}</p>

//   <span>Код товара: {oneProduct.title}</span>

//   <div className="productPage__img">
//     <img src={oneProduct.image} alt="No img" />
//   </div>
//   <div className="productPage__restImg">
//     {restImages.map((el) => {
//       return <img src={oneProduct.image} alt="No img" />;
//     })}
//   </div>
// </div>
// <div className="productPage__right">
//   <div className="productPage__right--block">
//     <div className="productPage__price">{oneProduct.price} $</div>
//     <div className="productPage__right--content">
//       <div className="productPage__right--left">
//         <p>Доступность: На складе</p>
//         <p>Доступность: На складе</p>
//         <div className="productPage__rating">Rating</div>
//       </div>
//       <div className="productPage__right--right">
//         <div className="productPage__quantity">
//           <span>кол-во</span>
//           <div className="productPage__counter">
//             <div className="productPage__counter--num">{count}</div>
//             <div className="productPage__counter--buttons">
//               <button onClick={plusCount}>
//                 <svg
//                   width="10"
//                   height="11"
//                   viewBox="0 0 10 11"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <line
//                     x1="4.95459"
//                     y1="1.40918"
//                     x2="4.95459"
//                     y2="9.90918"
//                     stroke="#3F3D56"
//                     stroke-linecap="round"
//                   />
//                   <line
//                     x1="9.13623"
//                     y1="5.72742"
//                     x2="0.63623"
//                     y2="5.72742"
//                     stroke="#3F3D56"
//                     stroke-linecap="round"
//                   />
//                 </svg>
//               </button>
//               <button onClick={minusCount}>
//                 <svg
//                   width="10"
//                   height="2"
//                   viewBox="0 0 10 2"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <line
//                     x1="9.13623"
//                     y1="1"
//                     x2="0.63623"
//                     y2="0.999999"
//                     stroke="#3F3D56"
//                     stroke-linecap="round"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//         <Link to={CART_ROUTE}>
//           <div style={{ fontSize: "25px" }}>КОРЗИНА</div>
//         </Link>
//         <div className="productPage__buttons">
//           {isAuth ? (
//             <button onClick={() => addAuthCart()}>В корзину</button>
//           ) : (
//             <p onClick={() => addItem(oneProduct, count)}>
//               Дообавить
//             </p>
//           )}

//           <button>Купить</button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
