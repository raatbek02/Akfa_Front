import React from "react";
import "./Contacts.css";
import contacts from "../../assets/images/contacts.png";
import contact_1 from "../../assets/images/contact_icon_1.png";
import contact_2 from "../../assets/images/contact_icon_2.png";
import contact_3 from "../../assets/images/contact_icon_3.png";
import contact_4 from "../../assets/images/contact_icon_4.png";
import contact_map from "../../assets/images/contact_map.png";

function Contacts() {
  return (
    <div className="contacts">
      <h2 className="contacts__title">Контакты</h2>
      <div className="contacts__container">
        <div className="contacts__content">
          <div className="contacts__left">
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
            <div className="contact_map">
              <img src={contact_map} alt="No img" />
            </div>
          </div>
          <div className="contacts__right">
            <img src={contacts} alt="No img" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
