import React from "react";
import "./Footer.css";
import contact_1 from "../../assets/images/footer_contact_1.png";
import contact_2 from "../../assets/images/footer_contact_2.png";
import contact_3 from "../../assets/images/footer_contact_3.png";
import contact_4 from "../../assets/images/footer_contact_4.png";

import footer_map from "../../assets/images/footer_map.png";

function Footer() {
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
            <img src={footer_map} alt="No img" />
          </div>
          <div className="footer__form">
            <h3>Форма связи</h3>
            <form>
              <input name="" placeholder={"Ваше Имя"} />

              <input name=" " placeholder={"Номер телефона"} />

              <button>Отправить </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
