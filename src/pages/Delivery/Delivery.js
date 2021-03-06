import React from "react";
import "./Delivery.css";
import delivery from "../../assets/images/delivery.png";

function Delivery() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="delivery">
      <div className="delivery__container">
        <h1 className="delivery__title">
          <span>Доставка и оплата</span>
        </h1>
        <div className="delivery__content">
          <div className="delivery__left">
            <div className="delivery__text">
              <p> Доставка на все расходные материалы доставляется:</p>
              <ul>
                <li>
                  <span>•</span>В пределах города Бишкек, то в течении 1
                  рабочего дня
                </li>
                <li>
                  <span>•</span>По территории КР в течении 3х рабочих дней
                </li>
              </ul>
              <p>
                В выборе любой продукции уточняйте у менеджера о сроках поставки
              </p>
              <p>!!Товары под заказ доставляются в течении 3х – 4х недель</p>
            </div>
          </div>
          <div className="delivery__right">
            <div className="delivery__right--img">
              <img src={delivery} alt="No img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
