import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { minusItem, plusItem, setAuthCart } from "../../store/carts";
// import { setAuthCart } from "../../store/carts";
import { CHECKOUT__ROUTE, HOME_ROUTE } from "../../utils/consts";
import minus_cart from "../../assets/images/new_design/minus_cart.svg";
import plus_cart from "../../assets/images/new_design/plus_cart.svg";
import cart_item_remove from "../../assets/images/new_design/cart_item_remove.svg";

import "./Cart.css";

function Cart() {
  //   const [authCart, setAuthCart] = useState([]);
  //   const authCartLS = JSON.parse(localStorage.getItem("auth_cart_items"));
  const authCart = useSelector((s) => s.cartSlice.authCart);
  console.log("authCart", authCart);
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
    cartTotal,
  } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.userSlice.user);
  console.log("user", user);
  const token = JSON.parse(localStorage.getItem("token"));
  const isAuth = useSelector((s) => s.isAuthSlice.isAuth);
  console.log("isAuth", isAuth);
  let totalAuthCartPrice = 0;

  const user_id = localStorage.getItem("user_id");
  console.log("user_id", user_id);

  //   const auth_items = useSelector((s) => s.cartSlice.auth_items);

  useEffect(() => {
    const getAuthCart = async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/carts/` + user_id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
        })
        .then(({ data }) => {
          dispatch(setAuthCart(data.items));
          //   localStorage.setItem("auth_cart_items", JSON.stringify(data.items));

          console.log("Успешно", data);
          localStorage.setItem("cart_id", data.id);
        })
        .catch((e) => {
          console.log("Ошибка", e);
          //  navigate(HOME_ROUTE);
        });
    };
    getAuthCart();
  }, []);

  const deleteCartItem = (e, cart_id) => {
    const thisClicked = e.currentTarget;

    const data = {
      quantity: 0,
      product: cart_id,
    };
    axios
      .post(`http://127.0.0.1:8000/api/destroy-cart/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        console.log("Товар удален", res);
        thisClicked.closest(".cart__item").remove();
      })
      .catch((e) => {
        alert("Ошибка,", e);
      });
  };

  const ubdateCart = () => {
    const data = {
      product: authCart.map((i) => i.product.id),
      quantity: authCart.map((i) => i.quantity),
    };
    axios
      .post(`http://127.0.0.1:8000/api/cart-item/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        console.log("Успешно обновлено");

        console.log("Success", res);
      })
      .catch((e) => {
        console.log("Ошибка при обновлении корзины", e);
      });
  };

  //   if (isEmpty) {
  //     return <p>Ваша корзина пустая! </p>;
  //   }
  //   if (token && authCart.length <= 0) {
  //     return <p>Ваша КОРЗИНА пустая!</p>;
  //   }
  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__top">
          <div className="cart__top--left">
            <div className="cart__top--titles">
              <span>Корзина</span>
              <div className="cart__top--radio">
                <p>
                  <input type={"radio"} />
                  <label>Доставка</label>
                </p>
                <p>
                  <input type={"radio"} />
                  <label>Самовывоз</label>
                </p>
              </div>
            </div>
            <div className="cart__top--contents">
              {token
                ? authCart &&
                  authCart.map((obj) => {
                    totalAuthCartPrice += obj.product.price * obj.quantity;
                    return (
                      <div className="cart__item">
                        <div className="cart__img">
                          <img src={obj.product.image} alt="No img" />
                        </div>
                        <div>
                          <div className="cart__item--data">
                            <div className="cart__name">
                              {obj.product.title}
                            </div>
                            <div className="cart__counter">
                              <button
                                onClick={() => dispatch(minusItem(obj.id))}
                              >
                                <img src={minus_cart} alt="No img" />
                              </button>
                              <span>{obj.quantity}</span>
                              <button
                                onClick={() => dispatch(plusItem(obj.id))}
                              >
                                <img src={plus_cart} alt="No img" />
                              </button>
                            </div>
                            <div className="cart__price">
                              <span>{obj.product.itemTotal}$</span>
                            </div>
                          </div>
                          <div className="cart__item--remove">
                            <span
                              onClick={(e) => deleteCartItem(e, obj.product.id)}
                            >
                              <img src={cart_item_remove} alt="No img" />
                            </span>
                          </div>
                          <div className="cart__item--bottomData">
                            <p>Выберите способ получения товара:</p>
                            <span>Код: 1701503</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : items.map((obj) => {
                    return (
                      <div className="cart__item">
                        <div className="cart__img">
                          <img src={obj.image} alt="No img" />
                        </div>
                        <div>
                          <div className="cart__item--data">
                            <div className="cart__name">{obj.title}</div>
                            <div className="cart__counter">
                              <button
                                onClick={() =>
                                  updateItemQuantity(
                                    obj.id,
                                    obj.quantity - (obj.quantity > 1 ? 1 : 0)
                                  )
                                }
                              >
                                <img src={minus_cart} alt="No img" />
                              </button>
                              <span>{obj.quantity}</span>
                              <button
                                onClick={() =>
                                  updateItemQuantity(obj.id, obj.quantity + 1)
                                }
                              >
                                <img src={plus_cart} alt="No img" />
                              </button>
                            </div>
                            <div className="cart__price">
                              <span>{obj.itemTotal}$</span>
                            </div>
                          </div>
                          <div className="cart__item--remove">
                            <span onClick={() => removeItem(obj.id)}>
                              <img src={cart_item_remove} alt="No img" />
                            </span>
                          </div>
                          <div className="cart__item--bottomData">
                            <p>Выберите способ получения товара:</p>
                            <span>Код: 1701503</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className="cart__top--right">
            <div>
              <div className="cart__total">
                <ul>
                  <li>
                    <p>Всего товаров</p>
                    {isAuth ? (
                      <span>{authCart.length}</span>
                    ) : (
                      <span>{totalUniqueItems}</span>
                    )}
                  </li>
                  <li>
                    <p>Cумма</p>
                    {isAuth ? (
                      <span>{totalAuthCartPrice.toFixed(2)}</span>
                    ) : (
                      <span>{cartTotal}</span>
                    )}
                  </li>
                  <li>
                    <p>Итого:</p>
                    {isAuth ? (
                      <span>{totalAuthCartPrice.toFixed(2)}</span>
                    ) : (
                      <span>{cartTotal}</span>
                    )}
                  </li>
                </ul>
              </div>
              <div className="cart__total--buttons">
                <button>Перейти к оформлению</button>
                <button>Счет на оплату</button>
              </div>
            </div>
          </div>
        </div>
        <div className="cart__bottom">
          <div className="cart__checkout">
            <div className="cart__checkout--pickup">
              <div className="cart__checkout--title">
                <span>Контактное лицо</span>
              </div>
              <div className="cart__checkout--fields">
                <p>
                  <label className="cart__checkout--label-1">ФИО</label>
                  <input className="cart__checkout--input-1" type="text" />
                  <p className="p-checkbox">
                    <input type="checkbox" />
                    <label className="cart__checkout--label-2">
                      Требуется подтверждение с оператором
                    </label>
                  </p>
                </p>
                <p>
                  <label className="cart__checkout--label-1">Телефон</label>
                  <input className="cart__checkout--input-1" type="text" />
                </p>
                <p>
                  <label className="cart__checkout--label-1">E-mail</label>
                  <input className="cart__checkout--input-1" type="text" />

                  <p className="p-checkbox">
                    <input type="checkbox" />
                    <label className="cart__checkout--label-2">
                      Юридическое лицо
                    </label>
                  </p>
                  <p className="p-checkbox">
                    <input type="checkbox" />
                    <label className="cart__checkout--label-2">
                      Зарегистрировать меня как пользователя сайта при создании
                      заказа
                    </label>
                  </p>
                </p>
              </div>
              <div className="cart__checkout--button">
                <button>Отправить</button>
              </div>
            </div>
            <div className="cart__checkout--delivery">
              <div className="cart__checkout--title">
                <span>Оформление заказа (Доставка)</span>
              </div>
              <div className="cart__checkout--fields">
                <p>
                  <label className="cart__checkout--label-1">Адрес:</label>
                  <input className="cart__checkout--input-1" type="text" />
                </p>
                <p className="cart__checkout--flex-fields">
                  <p>
                    <label className="cart__checkout--label-1">Подъезд</label>
                    <input className="cart__checkout--input-2" type="text" />
                  </p>
                  <p>
                    <label className="cart__checkout--label-1">Этаж</label>
                    <input className="cart__checkout--input-2" type="text" />
                  </p>{" "}
                  <p>
                    <label className="cart__checkout--label-1">Домофон</label>
                    <input className="cart__checkout--input-2" type="text" />
                  </p>
                </p>
                <p>
                  <label className="cart__checkout--label-1">
                    Комментарий к заказу:
                  </label>
                  <input className="cart__checkout--input-1" type="text" />
                </p>
                <p>
                  <label className="cart__checkout--label-1">
                    Выберите дату доставки:
                  </label>
                  <input className="cart__checkout--input-1" type="text" />
                </p>
                <p>
                  <label className="cart__checkout--label-1">
                    Наличие лифта
                  </label>
                  <RadioGroup>
                    <FormControlLabel
                      value="not"
                      control={<Radio />}
                      label="Нет"
                    />
                    <FormControlLabel
                      value="p"
                      control={<Radio />}
                      label="Пассажирский"
                    />
                    <FormControlLabel
                      value="g"
                      control={<Radio />}
                      label="Грузовой"
                    />
                    <FormControlLabel
                      value="pg"
                      control={<Radio />}
                      label="Пассажирский и грузовой"
                    />
                    {/* <p className="p-radio">
                      <input type="radio" />
                      <label>Нет</label>
                    </p>
                    <p className="p-radio">
                      <input type="radio" />
                      <label>Пассажирский</label>
                    </p>{" "}
                    <p className="p-radio">
                      <input type="radio" />
                      <label>Грузовой</label>
                    </p>{" "}
                    <p className="p-radio">
                      <input type="radio" />
                      <label>Пассажирский и грузовой</label>
                    </p> */}
                  </RadioGroup>
                </p>
              </div>
              <div className="cart__checkout--button">
                <button>Отправить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

//  <div className="cart">
//    <div className="cart__container">
//      <div
//        style={{ width: "100%" }}
//        className="cart__content"
//        style={{
//          display: "flex",
//          flexWrap: "wrap",
//          justifyContent: "space-between",
//        }}
//      >
//        {isAuth
//          ? authCart &&
//            authCart.map((obj) => {
//              totalAuthCartPrice += obj.product.price * obj.quantity;
//              return (
//                <div key={obj.product.id} className="cart__item">
//                  <div className="cart__img">
//                    <img src={obj.product.image} alt="No img" />
//                  </div>
//                  <div className="cart__title">{obj.product.title}</div>
//                  <div className="cart__price">{obj.product.price} $</div>
//                  <div className="cart__counter">
//                    <span onClick={() => dispatch(minusItem(obj.id))}>-</span>
//                    <span onClick={() => dispatch(plusItem(obj.id))}>+</span>
//                  </div>
//                  <div className="cart__quantity">{obj.quantity} шт</div>
//                  <div className="cart__totalItemPrice">
//                    {obj.product.itemTotal} $
//                  </div>
//                  <div
//                    className="cart__item-remove"
//                    onClick={(e) => deleteCartItem(e, obj.product.id)}
//                  >
//                    Удалить товар
//                  </div>
//                </div>
//              );
//            })
//          : items.map((obj) => {
//              return (
//                <div key={obj.id} className="cart__item">
//                  <div className="cart__img">
//                    <img src={obj.image} alt="No img" />
//                  </div>
//                  <div className="cart__title">{obj.title}</div>
//                  <div className="cart__price">{obj.price} $</div>
//                  <div className="cart__counter">
//                    <span
//                      onClick={() =>
//                        updateItemQuantity(
//                          obj.id,
//                          obj.quantity - (obj.quantity > 1 ? 1 : 0)
//                        )
//                      }
//                    >
//                      -
//                    </span>
//                    <span
//                      onClick={() =>
//                        updateItemQuantity(obj.id, obj.quantity + 1)
//                      }
//                    >
//                      +
//                    </span>
//                  </div>
//                  <div className="cart__quantity">{obj.quantity} шт</div>
//                  <div className="cart__totalItemPrice">
//                    {obj.itemTotal} $
//                  </div>
//                  <div
//                    className="cart__item-remove"
//                    onClick={() => removeItem(obj.id)}
//                  >
//                    Удалить товар
//                  </div>
//                </div>
//              );
//            })}
//      </div>
//      <div
//        style={{ margin: "100px 0" }}
//        onClick={() => emptyCart()}
//        className="cart__remove-all"
//      >
//        Удалить все товары
//      </div>
//      <div className="cart__sumOrders">
//        <div className="cart__sumOrders--itogo">
//          <span>Итого:</span>
//          {isAuth ? (
//            <span>{totalAuthCartPrice} $</span>
//          ) : (
//            <span>{cartTotal} $</span>
//          )}
//        </div>

//        <Link to={CHECKOUT__ROUTE}>
//          <button>Оформить заказ</button>
//        </Link>
//      </div>
//    </div>
//  </div>;
