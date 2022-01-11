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
        .get(`http://127.0.0.1:8000/api/contact_data/`)
        .then(({ data }) => setContactData(data));
    };
    getContactData();
  }, []);
  return (
    <div className="contacts">
      <div className="contacts__container">
        <h2 className="contacts__title">
          <span>Контакты</span>
        </h2>
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
