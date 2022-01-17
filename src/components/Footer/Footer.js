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
              <a
                href="https://www.google.com/maps/place/65+%D1%83%D0%BB.+%D0%91%D0%B0%D0%B9%D1%82%D0%B8%D0%BA+%D0%B1%D0%B0%D0%B0%D1%82%D1%8B%D1%80%D0%B0,+%D0%91%D0%B8%D1%88%D0%BA%D0%B5%D0%BA/@42.8593988,74.6086425,17z/data=!4m5!3m4!1s0x389eb63482b0b2c5:0x7a3e60fca80c223d!8m2!3d42.8593988!4d74.6108312"
                target={"_blank"}
                rel="noreferrer"
              >
                <img src={footer_map} alt="No img" />
              </a>
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
