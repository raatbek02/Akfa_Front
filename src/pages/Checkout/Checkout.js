import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useCart } from "react-use-cart";
import { $host } from "../../http";
// import { setAuthCart } from "../../store/carts";
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
  const [checkboxes, setCheckboxes] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
  });

  //   const dispatch = useDispatch();
  //   const isAuth = useSelector((s) => s.isAuthSlice.isAuth);
  //   const token = JSON.parse(localStorage.getItem("token"));
  //   const user = useSelector((s) => s.userSlice.user);
  //   const cart_id = localStorage.getItem("cart_id");
  //   const authCart = useSelector((s) => s.cartSlice.authCart);

  const successSubmited = () => toast.success("Ваш заказ успешно отправлен!");

  const { items, emptyCart } = useCart();

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

  //   const submitAuthOrder = async (e) => {
  //     const auth_items = [];
  //     const pickupData = {
  //       cart_id: cart_id,
  //       user: user.id,
  //       first_name: checkoutInput.firstName,
  //       phone_number: checkoutInput.phoneNumber,
  //       email: checkoutInput.email,

  //       is_conf_required: checkboxes.is_conf_required,
  //       is_entity: checkboxes.is_entity,

  //       items: auth_items,
  //     };
  //     const isDeliveryData = {
  //       cart_id: cart_id,
  //       user: user.id,
  //       first_name: checkoutInput.firstName,
  //       phone_number: checkoutInput.phoneNumber,
  //       email: checkoutInput.email,
  //       address: checkoutInput.address,
  //       entrance: checkoutInput.entrance,
  //       floor: checkoutInput.floor,
  //       intercom: checkoutInput.intercom,
  //       note: checkoutInput.note,
  //       // date: checkoutInput.date,

  //       is_conf_required: checkboxes.is_conf_required,
  //       is_entity: checkboxes.is_entity,
  //       radio: checkoutInput.radio,

  //       items: auth_items,
  //     };

  //     authCart.map((item) => {
  //       let obj = {
  //         product: item.product.id,
  //         quantity: item.quantity,
  //         price: item.product.discount_price,
  //       };
  //       auth_items.push(obj);
  //     });
  //     await $host
  //       .post(`api/order/`, isDelivery ? isDeliveryData : pickupData, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Token " + token,
  //         },
  //       })
  //       .then((res) => {
  //         console.log("auth_cart успешно отправлено в order", res);
  //         //   dispatch(setAuthCart([]));
  //       })
  //       .catch((e) => {
  //         console.log("Ошибка auth_cart ", e);
  //       });
  //   };

  const submitLocalOrder = async () => {
    //  e.preventDefault();

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
        price: item.discount_price,
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
        successSubmited();
        emptyCart();
        //   emptyCart();
      })
      .catch((e) => {
        console.log("Ошибка", e);
      });
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="checkout" id="checkout">
      <form
        //   onSubmit={(e) =>
        //     isAuth
        //       ? handleSubmit(submitAuthOrder(e))
        //       : handleSubmit(submitLocalOrder(e))
        //   }
        onSubmit={handleSubmit(submitLocalOrder)}
      >
        <div className="checkout--pickup">
          <div className="checkout--title">
            <span>Контактное лицо</span>
          </div>
          <div className="checkout--fields">
            <p>
              <label className="checkout--label-1">ФИО</label>

              <div className="checkout--input-1">
                <input
                  {...register("firstName", {
                    required: true,
                  })}
                  onChange={handleInput}
                  type="text"
                  value={checkoutInput.firstName}
                  //  name="firstName"
                />
              </div>

              <div className="checkout__error">
                {errors?.firstName && <p>Поле обязательно к заполнению!</p>}
              </div>
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
              <div className="checkout--input-1">
                <input
                  {...register("phoneNumber", {
                    required: true,
                  })}
                  onChange={handleInput}
                  type="number"
                  value={checkoutInput.phoneNumber}
                  //  name="phoneNumber"
                />
              </div>

              <div className="checkout__error">
                {errors?.phoneNumber && <p>Поле обязательно к заполнению!</p>}
              </div>
            </p>
            <p>
              <label className="checkout--label-1">E-mail</label>
              <div className="checkout--input-1">
                <input
                  onChange={handleInput}
                  type="text"
                  value={checkoutInput.email}
                  name="email"
                />
              </div>

              <p className="p-checkbox">
                <input
                  onChange={handleCheckbox}
                  type="checkbox"
                  name="is_entity"
                  defaultChecked={checkboxes.is_entity === 1 ? true : false}
                />
                <label className="checkout--label-2">Юридическое лицо</label>
              </p>
              {/* <p className="p-checkbox">
                <input type="checkbox" />
                <label className="checkout--label-2">
                  Зарегистрировать меня как пользователя сайта при создании
                  заказа
                </label>
              </p> */}
            </p>
          </div>

          {/* {!isDelivery ? (
            <div className="checkout--button">
              {isAuth ? (
                <button onClick={submitAuthOrder}>Отправить</button>
              ) : (
                  <button onClick={submitLocalOrder}>Отправить</button>
                
              )}
            </div>
          ) : null} */}
          {!isDelivery ? (
            <div className="checkout--button">
              <button type="submit">Отправить</button>
            </div>
          ) : null}
        </div>
        {isDelivery ? (
          <div className="checkout--delivery">
            <div className="checkout--title">
              <span>Оформление заказа (Доставка)</span>
            </div>
            <div className="checkout--fields">
              <p>
                <label className="checkout--label-1">Адрес:</label>
                <div className="checkout--input-1">
                  <input
                    {...register("address", {
                      required: isDelivery ? true : false,
                    })}
                    onChange={handleInput}
                    type="text"
                    value={checkoutInput.address}
                    // name="address"
                  />
                </div>

                <div className="checkout__error">
                  {errors?.address && <p>Поле обязательно к заполнению!</p>}
                </div>
              </p>
              <p className="checkout--flex-fields">
                <p>
                  <label className="checkout--label-1">Подъезд</label>
                  <div className="checkout--input-2">
                    <input
                      onChange={handleInput}
                      type="text"
                      value={checkoutInput.floor}
                      name="floor"
                    />
                  </div>
                </p>
                <p>
                  <label className="checkout--label-1">Этаж</label>
                  <div className="checkout--input-2">
                    <input
                      onChange={handleInput}
                      type="text"
                      value={checkoutInput.entrance}
                      name="entrance"
                    />
                  </div>
                </p>{" "}
                <p>
                  <label className="checkout--label-1">Домофон</label>
                  <div className="checkout--input-2">
                    <input
                      onChange={handleInput}
                      type="text"
                      value={checkoutInput.intercom}
                      name="intercom"
                    />
                  </div>
                </p>
              </p>
              <p>
                <label className="checkout--label-1">
                  Комментарий к заказу:
                </label>
                <div className="checkout__textArea-p">
                  <textarea
                    onChange={handleInput}
                    className="checkout__textArea"
                    type=""
                    value={checkoutInput.note}
                    name="note"
                  />
                </div>
              </p>
              <p>
                <label className="checkout--label-1">
                  Выберите дату доставки:
                </label>
                <div className="checkout--input-1">
                  <input
                    // type="date"
                    type={"text"}
                    placeholder="dd-mm-yyyy"
                  />
                </div>
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
            </div>
            {/* <div className="checkout--button">
              {isAuth ? (
                <button onClick={submitAuthOrder}>Отправить</button>
              ) : (
                <button onClick={submitLocalOrder}>Отправить</button>
              )}
            </div> */}

            <div className="checkout--button">
              <button type="submit">Отправить</button>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default Checkout;
