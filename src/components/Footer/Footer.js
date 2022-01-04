import React from "react";
import axios from "axios";
import "./Footer.css";
import contact_1 from "../../assets/images/footer_contact_1.png";
import contact_2 from "../../assets/images/footer_contact_2.png";
import contact_3 from "../../assets/images/footer_contact_3.png";
import contact_4 from "../../assets/images/footer_contact_4.png";

import footer_map from "../../assets/images/footer_map.png";
import { toast } from "react-toastify";

function Footer() {
  const [expanded, setExpanded] = React.useState(false);
  const [backCallInput, setBackCallInput] = React.useState({
    name: "",
    phone: "",
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
    axios
      .post(`http://127.0.0.1:8000/api/backcall`, data, {
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
              <li>
                <img src={contact_1} alt="No img" />
                <span>г.Бишкек, ул. Байтик-Баатыра, 65</span>
              </li>
              <li>
                <img src={contact_2} alt="No img" />
                <span>+996 (555) 51-51-15</span>
              </li>{" "}
              <li>
                <img src={contact_3} alt="No img" />
                <span>+996 (555) 51-51-15</span>
              </li>{" "}
              <li>
                <img src={contact_4} alt="No img" />
                <span>akfamedfarm@gmail.com</span>
              </li>
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
