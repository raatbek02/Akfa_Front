import axios from "axios";
import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { $host } from "../../http";

function Checkout() {
  const [checkoutInput, setCheckoutInput] = useState({
    firstName: "",
    phoneNumber: "",
    address: "",
  });
  const [error, setError] = useState([]);

  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
    cartTotal,
    totalItems,
  } = useCart();

  const handleInput = (e) => {
    e.persist();
    setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
  };

  const submitOrder = async (e) => {
    e.preventDefault();

    const itemss = [];

    const data = {
      first_name: checkoutInput.firstName,
      phone_number: checkoutInput.phoneNumber,
      address: checkoutInput.address,
      items: itemss,
    };
    items.map((item, i) => {
      let obj = {
        product: item.id,
        quantity: item.quantity,
        price: item.price,
      };
      itemss.push(obj);
    });
    await $host
      .post(`api/order/`, data, {
        "Content-Type": "application/json",
      })
      .then((res) => {
        console.log("Успешно", res);
        if (res.data.status === 200) {
          alert("Заказ успешно отправлено!");
          setError([]);
        } else if (res.data.status === 422) {
          alert("Все поля должны заполнены!");
          setError(res.data.errors);
        }
      })
      .catch((e) => {
        console.log("Ошибка", e);
      });
  };

  return (
    <div className="checkout">
      <div className="checkout__container">
        <div
          className="checkout__content"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 30,
          }}
        >
          <div className="checkout__fields">
            <form>
              <p>
                <label>FirstName:</label>
                <input
                  onChange={handleInput}
                  value={checkoutInput.firstName}
                  type="text"
                  name="firstName"
                  placeholder="FirstName"
                />
                <small>{error.firstName}</small>
              </p>
              <p>
                <label>PhoneNumber:</label>
                <input
                  onChange={handleInput}
                  value={checkoutInput.phoneNumber}
                  type="text"
                  name="phoneNumber"
                  placeholder="PhoneNumber"
                />
                <small>{error.phoneNumber}</small>
              </p>{" "}
              <p>
                <label>Address:</label>
                <input
                  onChange={handleInput}
                  value={checkoutInput.address}
                  type="text"
                  name="address"
                  placeholder="Address"
                />
                <small>{error.address}</small>
              </p>
            </form>
          </div>
          <div className="checkout__cartInfo">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((obj) => {
                  return (
                    <tr>
                      <td>{obj.title}</td>
                      <td>{obj.price}</td>
                      <td>{obj.quantity}</td>
                      <td>{obj.itemTotal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div>
              <p style={{ textAlign: "center" }}>Итого: {cartTotal} $</p>
              <p style={{ textAlign: "center" }}>Количества: {totalItems}</p>
            </div>
          </div>
          <div>
            <button onClick={submitOrder}>Оформить заказ</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;