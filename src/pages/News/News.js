import React from "react";
import "./News.css";
import news_img from "../../assets/images/news_img.png";
import news_item_1 from "../../assets/images/news_item_1.png";

function News() {
  return (
    <div className="news">
      <h2 className="news__title">Новости</h2>

      <div className="news__container">
        <div className="news__content">
          <div className="news__left">
            <div className="news__item">
              <div className="news__item--img">
                <img src={news_item_1} alt="No img" />
              </div>
              <p className="news__item--text">
                До конца месяца действует акция на бахилы (3000 пар) всего 2600
                сом вместо 2900 сом!..
              </p>
            </div>
            <div className="news__item">
              <div className="news__item--img">
                <img src={news_item_1} alt="No img" />
              </div>
              <p className="news__item--text">
                До конца месяца действует акция на бахилы (3000 пар) всего 2600
                сом вместо 2900 сом!..
              </p>
            </div>{" "}
            <div className="news__item">
              <div className="news__item--img">
                <img src={news_item_1} alt="No img" />
              </div>
              <p className="news__item--text">
                До конца месяца действует акция на бахилы (3000 пар) всего 2600
                сом вместо 2900 сом!..
              </p>
            </div>
          </div>
          <div className="news__right">
            <div className="news__img">
              <img src={news_img} alt="No img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
