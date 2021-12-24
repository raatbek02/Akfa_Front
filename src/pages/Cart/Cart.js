import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import {
  minusItem,
  plusItem,
  removeAuthCartItem,
  setAuthCart,
} from "../../store/carts";
// import { setAuthCart } from "../../store/carts";
import minus_cart from "../../assets/images/new_design/minus_cart.svg";
import plus_cart from "../../assets/images/new_design/plus_cart.svg";
import cart_item_remove from "../../assets/images/new_design/cart_item_remove.svg";

import "./Cart.css";
import Checkout from "../Checkout/Checkout";

function Cart() {
  const [isDelivery, setIsDelivery] = useState(true);
  //   const [radioPickup, setRadioPickup] = useState(false);

  //   console.log("radioDelivery", radioDelivery);
  //   console.log("radioPickup", radioPickup);

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
    //  if (isAuth) {
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
    //  }
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

  //   useEffect(() => {});

  const plusUbdateCart = (id) => {
    const data = {
      cart_item: id,
    };
    axios
      .post(`http://127.0.0.1:8000/api/cart-update/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        console.log("Успешно обновлено", res);
      })
      .catch((e) => {
        console.log("Ошибка при обновлении корзины", e);
      });
    console.log("Отправлено");
  };

  const minusUbdateCart = (id) => {
    const data = {
      cart_item: id,
    };
    axios
      .post(`http://127.0.0.1:8000/api/cart-update/?minus`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        console.log("Успешно обновлено", res);
      })
      .catch((e) => {
        console.log("Ошибка при обновлении корзины", e);
      });
    console.log("Отправлено");
  };

  //   if (isAuth) {
  //     if (!authCart) {
  //       return <p>Ваша КОРЗИНА пустая!</p>;
  //     }
  //   } else {
  //     if (isEmpty) {
  //       return <p>Ваша корзина пустая! </p>;
  //     }
  //   }
  return (
    <div className="cart">
      <div className="cart__container">
        {items.length ? (
          <>
            <div className="cart__top">
              <div className="cart__top--left">
                <div className="cart__top--titles">
                  <span>Корзина</span>
                  <div className="cart__top--radio">
                    <p
                      onClick={() => {
                        setIsDelivery(true);
                      }}
                    >
                      <input
                        type={"radio"}
                        id="radio-top-1"
                        name="radio-top-inputs"
                        defaultChecked
                      />
                      <label for="radio-top-1">Доставка</label>
                    </p>
                    <p
                      onClick={() => {
                        setIsDelivery(false);
                      }}
                    >
                      <input
                        type={"radio"}
                        id="radio-top-2"
                        name="radio-top-inputs"
                      />
                      <label for="radio-top-2">Самовывоз</label>
                    </p>
                  </div>
                </div>
                <div className="cart__top--contents">
                  {isAuth
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
                                    onClick={() => {
                                      dispatch(minusItem(obj.id));
                                      minusUbdateCart(obj.id);
                                    }}
                                  >
                                    <img src={minus_cart} alt="No img" />
                                  </button>
                                  <span>{obj.quantity}</span>
                                  <button
                                    onClick={() => {
                                      dispatch(plusItem(obj.id));
                                      plusUbdateCart(obj.id);
                                    }}
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
                                  onClick={(e) => {
                                    deleteCartItem(e, obj.product.id);
                                    // dispatch(
                                    //   removeAuthCartItem(obj.id)
                                    // );
                                  }}
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
                                        obj.quantity -
                                          (obj.quantity > 1 ? 1 : 0)
                                      )
                                    }
                                  >
                                    <img src={minus_cart} alt="No img" />
                                  </button>
                                  <span>{obj.quantity}</span>
                                  <button
                                    onClick={() =>
                                      updateItemQuantity(
                                        obj.id,
                                        obj.quantity + 1
                                      )
                                    }
                                  >
                                    <img src={plus_cart} alt="No img" />
                                  </button>
                                </div>
                                <div className="cart__price">
                                  <span>{obj.itemTotal.toFixed(2)}$</span>
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
                          <span>{authCart && authCart.length}</span>
                        ) : (
                          <span>{totalUniqueItems}</span>
                        )}
                      </li>
                      <li>
                        <p>Cумма</p>
                        {isAuth ? (
                          <span>{totalAuthCartPrice.toFixed(2)}</span>
                        ) : (
                          <span>{cartTotal.toFixed(2)}</span>
                        )}
                      </li>
                      <li>
                        <p>Итого:</p>
                        {isAuth ? (
                          <span>{totalAuthCartPrice.toFixed(2)}</span>
                        ) : (
                          <span>{cartTotal.toFixed(2)}</span>
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
              <Checkout isDelivery={isDelivery} />
            </div>
          </>
        ) : (
          <p>Пустая корзина</p>
        )}
      </div>
    </div>
  );
}

export default Cart;
