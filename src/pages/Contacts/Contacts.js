import React, { useEffect, useState } from "react";
// import axios from "axios";
import "./Contacts.css";
import contacts from "../../assets/images/contacts.png";
import contact_map from "../../assets/images/contact_map.png";
import { $host } from "../../http";

function Contacts() {
  const [contactData, setContactData] = useState([]);
  useEffect(() => {
    const getContactData = async () => {
      await $host
        .get(`api/contact_data/`)
        .then(({ data }) => setContactData(data));
    };
    getContactData();
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="contacts">
      <div className="contacts__container">
        <h1 className="contacts__title">
          <span>Контакты</span>
        </h1>
        <div className="contacts__content">
          <div className="contacts__left">
            <ul>
              {contactData.map((el) => {
                return (
                  <li key={el.id}>
                    <img src={el.image} alt="No img" />
                    <span>{el.title}</span>
                  </li>
                );
              })}
            </ul>
            <div className="contact_map">
              <a
                href="https://www.google.com/maps/place/65+%D1%83%D0%BB.+%D0%91%D0%B0%D0%B9%D1%82%D0%B8%D0%BA+%D0%B1%D0%B0%D0%B0%D1%82%D1%8B%D1%80%D0%B0,+%D0%91%D0%B8%D1%88%D0%BA%D0%B5%D0%BA/@42.8593988,74.6086425,17z/data=!4m5!3m4!1s0x389eb63482b0b2c5:0x7a3e60fca80c223d!8m2!3d42.8593988!4d74.6108312"
                target={"_blank"}
                rel="noreferrer"
              >
                <img src={contact_map} alt="No img" />
              </a>
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
