import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
// import { setAuthCart } from "../../store/carts";
import { CHECKOUT__ROUTE, HOME_ROUTE } from "../../utils/consts";

function Cart() {
  const [authCart, setAuthCart] = useState([]);
	const authCartLS = JSON.parse(localStorage.getItem('auth_cart_items'));
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
  let totalAuthCartPrice = 0;

  //   const auth_items = useSelector((s) => s.cartSlice.auth_items);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/carts/` + user.id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then(({ data }) => {
        setAuthCart(data.items);
        localStorage.setItem("auth_cart_items", JSON.stringify(data.items));

        console.log("Успешно", data);
      })
      .catch((e) => {
        console.log("Ощибка", e);
        navigate(HOME_ROUTE);
      });
  }, []);

  const handleDecrement = (cart_id) => {
    setAuthCart((authCart) =>
      authCart.map((item) =>
        cart_id === item.id
          ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
          : item
      )
    );
  };
  const handleIncrement = (cart_id) => {
    setAuthCart((authCart) =>
      authCart.map((item) =>
        cart_id === item.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

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
        alert("Ощибка,", e);
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
  if (token && authCart > 0) {
    return <p>Ваша КОРЗИНА пустая!</p>;
  }
  return (
    <div className="cart">
      <div className="cart__container">
        <div
          style={{ width: "100%" }}
          className="cart__content"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* {token
            ? auth_items.items.map((obj) => {
                return (
                  <div key={obj.id} className="cart__item">
                    <div className="cart__img">
                      <img src={obj.image} alt="No img" />
                    </div>
                    <div className="cart__title">{obj.title}</div>
                    <div className="cart__price">{obj.price} $</div>
                    <div className="cart__counter">
                      <span
                        onClick={() =>
                          updateItemQuantity(obj.id, obj.quantity - 1)
                        }
                      >
                        -
                      </span>
                      <span
                        onClick={() =>
                          updateItemQuantity(obj.id, obj.quantity + 1)
                        }
                      >
                        +
                      </span>
                    </div>
                    <div className="cart__quantity">{obj.quantity} шт</div>
                    <div className="cart__totalItemPrice">
                      {obj.itemTotal} $
                    </div>
                    <div
                      className="cart__item-remove"
                      onClick={() => removeItem(obj.id)}
                    >
                      Удалить товар
                    </div>
                  </div>
                );
              })
            : items.map((obj) => {
                return (
                  <div key={obj.id} className="cart__item">
                    <div className="cart__img">
                      <img src={obj.image} alt="No img" />
                    </div>
                    <div className="cart__title">{obj.title}</div>
                    <div className="cart__price">{obj.price} $</div>
                    <div className="cart__counter">
                      <span
                        onClick={() =>
                          updateItemQuantity(obj.id, obj.quantity - 1)
                        }
                      >
                        -
                      </span>
                      <span
                        onClick={() =>
                          updateItemQuantity(obj.id, obj.quantity + 1)
                        }
                      >
                        +
                      </span>
                    </div>
                    <div className="cart__quantity">{obj.quantity} шт</div>
                    <div className="cart__totalItemPrice">
                      {obj.itemTotal} $
                    </div>
                    <div
                      className="cart__item-remove"
                      onClick={() => removeItem(obj.id)}
                    >
                      Удалить товар
                    </div>
                  </div>
                );
              })} */}

          {authCart &&
            authCart.map((obj) => {
              totalAuthCartPrice += obj.product.price * obj.quantity;
              return (
                <div key={obj.product.id} className="cart__item">
                  <div className="cart__img">
                    <img src={obj.product.image} alt="No img" />
                  </div>
                  <div className="cart__title">{obj.product.title}</div>
                  <div className="cart__price">{obj.product.price} $</div>
                  <div className="cart__counter">
                    <span onClick={() => handleDecrement(obj.id)}>-</span>
                    <span onClick={() => handleIncrement(obj.id)}>+</span>
                  </div>
                  <div className="cart__quantity">{obj.quantity} шт</div>
                  <div className="cart__totalItemPrice">
                    {obj.product.itemTotal} $
                  </div>
                  <div
                    className="cart__item-remove"
                    onClick={(e) => deleteCartItem(e, obj.product.id)}
                  >
                    Удалить товар
                  </div>
                </div>
              );
            })}

          {/* {items.map((obj) => {
            return (
              <div key={obj.id} className="cart__item">
                <div className="cart__img">
                  <img src={obj.image} alt="No img" />
                </div>
                <div className="cart__title">{obj.title}</div>
                <div className="cart__price">{obj.price} $</div>
                <div className="cart__counter">
                  <span
                    onClick={() => updateItemQuantity(obj.id, obj.quantity - 1)}
                  >
                    -
                  </span>
                  <span
                    onClick={() => updateItemQuantity(obj.id, obj.quantity + 1)}
                  >
                    +
                  </span>
                </div>
                <div className="cart__quantity">{obj.quantity} шт</div>
                <div className="cart__totalItemPrice">{obj.itemTotal} $</div>
                <div
                  className="cart__item-remove"
                  onClick={() => removeItem(obj.id)}
                >
                  Удалить товар
                </div>
              </div>
            );
          })} */}
        </div>
        <div
          style={{ margin: "100px 0" }}
          onClick={() => emptyCart()}
          className="cart__remove-all"
        >
          Удалить все товары
        </div>
        <div className="cart__sumOrders">
          <div className="cart__sumOrders--itogo">
            <span>Итого:</span>
            <span>{totalAuthCartPrice} $</span>
          </div>

          <Link to={CHECKOUT__ROUTE}>
            <button>Оформить заказ</button>
          </Link>
          <button onClick={() => ubdateCart()}>Оформить и отправить </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
