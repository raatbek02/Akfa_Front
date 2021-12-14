import React from "react";
import "./News_blog.css";
import news_item_1 from "../../../assets/images/news_item_1.png";

function News_blog() {
  return (
    <div className="news_blog">
      <div className="news_blog__container">
        <div className="news_blog__item">
          <div className="news_blog__titles">
            <h3>Новости</h3>
            <span>Все новости</span>
          </div>
          <div className="news_blog__blogItem">
            <div className="news_blog__item--img">
              <img src={news_item_1} alt="No img" />
            </div>
            <p className="news_blog__item--text">
              До конца месяца действует акция на бахилы (3000 пар) всего 2600
              сом вместо 2900 сом!..
              <p>02.25.21</p>
            </p>
          </div>
          <div className="news_blog__blogItem">
            <div className="news_blog__item--img">
              <img src={news_item_1} alt="No img" />
            </div>
            <p className="news_blog__item--text">
              До конца месяца действует акция на бахилы (3000 пар) всего 2600
              сом вместо 2900 сом!..
              <p>02.25.21</p>
            </p>
          </div>
        </div>
        <div className="news_blog__item">
          <div className="news_blog__titles">
            <h3>Новости</h3>
            <span>Все новости</span>
          </div>
          <div className="news_blog__blogItem">
            <div className="news_blog__item--img">
              <img src={news_item_1} alt="No img" />
            </div>
            <p className="news_blog__item--text">
              До конца месяца действует акция на бахилы (3000 пар) всего 2600
              сом вместо 2900 сом!..
              <p>02.25.21</p>
            </p>
          </div>
          <div className="news_blog__blogItem">
            <div className="news_blog__item--img">
              <img src={news_item_1} alt="No img" />
            </div>
            <p className="news_blog__item--text">
              До конца месяца действует акция на бахилы (3000 пар) всего 2600
              сом вместо 2900 сом!..
              <p>02.25.21</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News_blog;
