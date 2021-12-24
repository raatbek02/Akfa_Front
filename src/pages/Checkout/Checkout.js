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
    entrance: "",
    floor: "",
    intercom: "",
    note: "",
    date: "",
    radio: "",
  });
  console.log("checkoutInput.radio", checkoutInput.radio);
  // const [checkboxes, setCheckboxes] = useState({
  //    is_conf_required: false,
  //    is_entity: false,
  //  });
  const [checkboxes, setCheckboxes] = useState([]);
  //   const [radio, setRadio] = useState(1);
  //   console.log("radio", radio);
  console.log(checkboxes);
  console.log(checkboxes.is_conf_required);

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
  const handleCheckbox = (e) => {
    e.persist();

    setCheckboxes({ ...checkboxes, [e.target.name]: e.target.checked });
  };
  const handleRadios = (e) => {
    e.persist();

    setCheckoutInput({ ...checkoutInput, radio: e.target.value });
  };

  const submitAuthOrder = async (e) => {
    const auth_items = [];
    const pickupData = {
      cart_id: cart_id,
      user: user.id,
      first_name: checkoutInput.firstName,
      phone_number: checkoutInput.phoneNumber,
      email: checkoutInput.email,

      is_conf_required: checkboxes.is_conf_required,
      is_entity: checkboxes.is_entity,

      items: auth_items,
    };
    const isDeliveryData = {
      cart_id: cart_id,
      user: user.id,
      first_name: checkoutInput.firstName,
      phone_number: checkoutInput.phoneNumber,
      email: checkoutInput.email,
      address: checkoutInput.address,
      entrance: checkoutInput.entrance,
      floor: checkoutInput.floor,
      intercom: checkoutInput.intercom,
      note: checkoutInput.note,
      // date: checkoutInput.date,

      is_conf_required: checkboxes.is_conf_required,
      is_entity: checkboxes.is_entity,
      radio: checkoutInput.radio,

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
      .post(`api/order/`, isDelivery ? isDeliveryData : pickupData, {
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

      is_conf_required: checkboxes.is_conf_required,
      is_entity: checkboxes.is_entity,

      items: itemss,
    };
    const isDeliveryData = {
      first_name: checkoutInput.firstName,
      phone_number: checkoutInput.phoneNumber,
      email: checkoutInput.email,
      address: checkoutInput.address,
      entrance: checkoutInput.entrance,
      floor: checkoutInput.floor,
      intercom: checkoutInput.intercom,
      note: checkoutInput.note,
      // date: checkoutInput.date,

      is_conf_required: checkboxes.is_conf_required,
      is_entity: checkboxes.is_entity,
      radio: checkoutInput.radio,

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
              <input
                onChange={handleCheckbox}
                type="checkbox"
                name="is_conf_required"
                defaultChecked={
                  checkboxes.is_conf_required === 1 ? true : false
                }
              />
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
              <input
                onChange={handleCheckbox}
                type="checkbox"
                name="is_entity"
                defaultChecked={checkboxes.is_entity === 1 ? true : false}
              />
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
                <input
                  onChange={handleInput}
                  className="checkout--input-2"
                  type="text"
                  value={checkoutInput.floor}
                  name="floor"
                />
              </p>
              <p>
                <label className="checkout--label-1">Этаж</label>
                <input
                  onChange={handleInput}
                  className="checkout--input-2"
                  type="text"
                  value={checkoutInput.entrance}
                  name="entrance"
                />
              </p>{" "}
              <p>
                <label className="checkout--label-1">Домофон</label>
                <input
                  onChange={handleInput}
                  className="checkout--input-2"
                  type="text"
                  value={checkoutInput.intercom}
                  name="intercom"
                />
              </p>
            </p>
            <p>
              <label className="checkout--label-1">Комментарий к заказу:</label>
              <input
                onChange={handleInput}
                className="checkout--input-1"
                type="text"
                value={checkoutInput.note}
                name="note"
              />
            </p>
            <p>
              <label className="checkout--label-1">
                Выберите дату доставки:
              </label>
              <input
                type="date"
                className="checkout--input-1"
                placeholder="dd-mm-yyyy"
              />
            </p>
            <p>
              <label className="checkout--label-1">Наличие лифта</label>
              <p className="p-radio">
                <input
                  onChange={handleRadios}
                  type="radio"
                  id="radio-1"
                  name="p-radio-inputs"
                  value={4}
                />
                <label for="radio-1">Нет</label>
              </p>
              <p className="p-radio">
                <input
                  onChange={handleRadios}
                  type="radio"
                  id="radio-2"
                  name="p-radio-inputs"
                  value={1}
                />
                <label for="radio-2">Пассажирский</label>
              </p>
              <p className="p-radio">
                <input
                  onChange={handleRadios}
                  type="radio"
                  id="radio-3"
                  name="p-radio-inputs"
                  value={2}
                />
                <label for="radio-3">Грузовой</label>
              </p>
              <p className="p-radio">
                <input
                  onChange={handleRadios}
                  type="radio"
                  id="radio-4"
                  name="p-radio-inputs"
                  value={3}
                />
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
}

export default Checkout;
