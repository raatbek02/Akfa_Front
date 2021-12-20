import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "react-use-cart";
import { $host } from "../../http";
import { setAuthCart } from "../../store/carts";
import "./Checkout.css";

function Checkout({ isDelivery }) {
  const [checkoutInput, setCheckoutInput] = useState({
    firstName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const cart_id = localStorage.getItem("cart_id");
  const dispatch = useDispatch();
  const user = useSelector((s) => s.userSlice.user);
  const authCart = useSelector((s) => s.cartSlice.authCart);
  const isAuth = useSelector((s) => s.isAuthSlice.isAuth);

  console.log("authCart checkout", authCart);

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

  const submitAuthOrder = async (e) => {
    const auth_items = [];
    const data = {
      cart_id: cart_id,
      user: user.id,
      first_name: checkoutInput.firstName,
      phone_number: checkoutInput.phoneNumber,
      address: checkoutInput.address,
      items: auth_items,
    };
    authCart.map((item) => {
      let obj = {
        product: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      };
      auth_items.push(obj);
    });
    await $host
      .post(`api/order/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        console.log("auth_cart успешно отправлено в order", res);
        //   dispatch(setAuthCart([]));
      })
      .catch((e) => {
        console.log("Ошибка auth_cart ", e);
      });
  };

  const submitLocalOrder = async (e) => {
    e.preventDefault();

    const itemss = [];

    const pickupData = {
      first_name: checkoutInput.firstName,
      phone_number: checkoutInput.phoneNumber,
      email: checkoutInput.email,
      items: itemss,
    };
    const isDeliveryData = {
      first_name: checkoutInput.firstName,
      phone_number: checkoutInput.phoneNumber,
      email: checkoutInput.email,
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
      .post(`api/order/`, isDelivery ? isDeliveryData : pickupData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Успешно", res);
        //   emptyCart();
      })
      .catch((e) => {
        console.log("Ошибка", e);
      });
  };

  return (
    <div className="checkout">
      <div className="checkout--pickup">
        <div className="checkout--title">
          <span>Контактное лицо</span>
        </div>
        <form className="checkout--fields">
          <p>
            <label className="checkout--label-1">ФИО</label>
            <input
              onChange={handleInput}
              className="checkout--input-1"
              type="text"
              value={checkoutInput.firstName}
              name="firstName"
            />
            <p className="p-checkbox">
              <input type="checkbox" />
              <label className="checkout--label-2">
                Требуется подтверждение с оператором
              </label>
            </p>
          </p>
          <p>
            <label className="checkout--label-1">Телефон</label>
            <input
              onChange={handleInput}
              className="checkout--input-1"
              type="number"
              value={checkoutInput.phoneNumber}
              name="phoneNumber"
            />
          </p>
          <p>
            <label className="checkout--label-1">E-mail</label>
            <input
              onChange={handleInput}
              className="checkout--input-1"
              type="text"
              value={checkoutInput.email}
              name="email"
            />

            <p className="p-checkbox">
              <input type="checkbox" />
              <label className="checkout--label-2">Юридическое лицо</label>
            </p>
            <p className="p-checkbox">
              <input type="checkbox" />
              <label className="checkout--label-2">
                Зарегистрировать меня как пользователя сайта при создании заказа
              </label>
            </p>
          </p>
        </form>
        {!isDelivery ? (
          <div className="checkout--button">
            {isAuth ? (
              <button onClick={submitAuthOrder}>Отправить</button>
            ) : (
              <button onClick={submitLocalOrder}>Отправить</button>
            )}
          </div>
        ) : null}
      </div>
      {isDelivery ? (
        <div className="checkout--delivery">
          <div className="checkout--title">
            <span>Оформление заказа (Доставка)</span>
          </div>
          <form className="checkout--fields">
            <p>
              <label className="checkout--label-1">Адрес:</label>
              <input
                onChange={handleInput}
                className="checkout--input-1"
                type="text"
                value={checkoutInput.address}
                name="address"
              />
            </p>
            <p className="checkout--flex-fields">
              <p>
                <label className="checkout--label-1">Подъезд</label>
                <input className="checkout--input-2" type="text" />
              </p>
              <p>
                <label className="checkout--label-1">Этаж</label>
                <input className="checkout--input-2" type="text" />
              </p>{" "}
              <p>
                <label className="checkout--label-1">Домофон</label>
                <input className="checkout--input-2" type="text" />
              </p>
            </p>
            <p>
              <label className="checkout--label-1">Комментарий к заказу:</label>
              <input className="checkout--input-1" type="text" />
            </p>
            <p>
              <label className="checkout--label-1">
                Выберите дату доставки:
              </label>
              <input className="checkout--input-1" type="text" />
            </p>
            <p>
              <label className="checkout--label-1">Наличие лифта</label>
              <p className="p-radio">
                <input
                  type="radio"
                  id="radio-1"
                  name="p-radio-inputs"
                  defaultChecked
                />
                <label for="radio-1">Нет</label>
              </p>
              <p className="p-radio">
                <input type="radio" id="radio-2" name="p-radio-inputs" />
                <label for="radio-2">Пассажирский</label>
              </p>
              <p className="p-radio">
                <input type="radio" id="radio-3" name="p-radio-inputs" />
                <label for="radio-3">Грузовой</label>
              </p>
              <p className="p-radio">
                <input type="radio" id="radio-4" name="p-radio-inputs" />
                <label for="radio-4">Пассажирский и грузовой</label>
              </p>
            </p>
          </form>
          <div className="checkout--button">
            {isAuth ? (
              <button onClick={submitAuthOrder}>Отправить</button>
            ) : (
              <button onClick={submitLocalOrder}>Отправить</button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );

  //   return (
  //     <div className="checkout">
  //       <div className="checkout__container">
  //         <div
  //           className="checkout__content"
  //           style={{
  //             display: "flex",
  //             justifyContent: "space-between",
  //             padding: 30,
  //           }}
  //         >
  //           <div className="checkout__fields">
  //             <form>
  //               <p>
  //                 <label>FirstName:</label>
  //                 <input
  //                   onChange={handleInput}
  //                   value={checkoutInput.firstName}
  //                   type="text"
  //                   name="firstName"
  //                   placeholder="FirstName"
  //                 />
  //                 <small>{error.firstName}</small>
  //               </p>
  //               <p>
  //                 <label>PhoneNumber:</label>
  //                 <input
  //                   onChange={handleInput}
  //                   value={checkoutInput.phoneNumber}
  //                   type="text"
  //                   name="phoneNumber"
  //                   placeholder="PhoneNumber"
  //                 />
  //                 <small>{error.phoneNumber}</small>
  //               </p>{" "}
  //               <p>
  //                 <label>Address:</label>
  //                 <input
  //                   onChange={handleInput}
  //                   value={checkoutInput.address}
  //                   type="text"
  //                   name="address"
  //                   placeholder="Address"
  //                 />
  //                 <small>{error.address}</small>
  //               </p>
  //             </form>
  //           </div>
  //           <div className="checkout__cartInfo">
  //             <table>
  //               <thead>
  //                 <tr>
  //                   <th>Product</th>
  //                   <th>Price</th>
  //                   <th>Qty</th>
  //                   <th>Total</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {items.map((obj) => {
  //                   return (
  //                     <tr>
  //                       <td>{obj.title}</td>
  //                       <td>{obj.price}</td>
  //                       <td>{obj.quantity}</td>
  //                       <td>{obj.itemTotal}</td>
  //                     </tr>
  //                   );
  //                 })}
  //               </tbody>
  //             </table>
  //             <div>
  //               <p style={{ textAlign: "center" }}>Итого: {cartTotal} $</p>
  //               <p style={{ textAlign: "center" }}>Количества: {totalItems}</p>
  //             </div>
  //           </div>
  //           <div>
  //             {isAuth ? (
  //               <button onClick={submitAuthOrder}>Оформить заказ</button>
  //             ) : (
  //               <button onClick={submitLocalOrder}>Оформить заказ</button>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
}

export default Checkout;
