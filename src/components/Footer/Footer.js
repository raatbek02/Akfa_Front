import React, { useEffect, useState } from "react";
// import axios from "axios";
import { toast } from "react-toastify";

import "./Footer.css";
import footer_map from "../../assets/images/footer_map.png";
import { $host } from "../../http";

function Footer() {
  const [backCallInput, setBackCallInput] = useState({
    name: "",
    phone: "",
  });
  const [contactData, setContactData] = useState([]);
  useEffect(() => {
    const getContactData = async () => {
      await $host
        .get("api/contact_data/")
        .then(({ data }) => setContactData(data));
    };
    getContactData();
  }, []);

  const handleInput = (e) => {
    e.persist();
    setBackCallInput({ ...backCallInput, [e.target.name]: e.target.value });
  };

  const submitBackCall = (e) => {
    e.preventDefault();
    const data = {
      name: backCallInput.name,
      phone: backCallInput.phone,
    };

	  

    $host
      .post(`api/backcall`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        successSubmited();
        setBackCallInput({ name: "", phone: "" });

        console.log("Обратный звонок успешно отправлен", res);
      })
      .catch((e) => {
        console.log("Ошибка обратного звонка ", e);
      });
  };

  const successSubmited = () =>
    toast.success("Форма связи успешно отправлено!");

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__contact">
            <h3>Контакты</h3>
            <ul>
              {contactData.map((el) => {
                return (
                  <li key={el.id}>
                    <img src={el.image_footer} alt="No img" />
                    <span>{el.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="footer__map">
            <div className="footer__map--img">
              <img src={footer_map} alt="No img" />
            </div>
          </div>
          <div className="footer__form">
            <h3>Форма связи</h3>
            <form>
              <input
                onChange={handleInput}
                value={backCallInput.name}
                name="name"
                type={"text"}
                placeholder={"Ваше Имя"}
              />

              <input
                onChange={handleInput}
                value={backCallInput.phone}
                name="phone"
                type={"number"}
                placeholder={"Номер телефона"}
              />

              <button onClick={(e) => submitBackCall(e)}>Отправить </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
