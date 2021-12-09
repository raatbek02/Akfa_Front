import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { CHECKOUT__ROUTE } from "../../utils/consts";

function Cart() {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
    cartTotal,
  } = useCart();

  if (isEmpty) {
    return <p>Ваша корзина пустая! </p>;
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
          {items.map((obj) => {
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
          })}
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
            <span>{cartTotal} $</span>
          </div>

          <Link to={CHECKOUT__ROUTE}>
            <button>Оформить заказ</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
