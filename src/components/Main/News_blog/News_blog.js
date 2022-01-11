import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NEWS_DETAIL__ROUTE, NEWS_ROUTE } from "../../../utils/consts";
import "./News_blog.css";
import { $host } from "../../../http";

function News_blog() {
  const [newsData, setNewsData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getNewsData = async () => {
      await $host.get(`api/news/`).then(({ data }) => {
        setNewsData(data);
      });
    };
    getNewsData();
  }, []);

  return (
    <div className="news_blog">
      <div className="news_blog__container">
        <div className="news_blog__item">
          <div className="news_blog__titles">
            <h3>Новости</h3>
            <span onClick={() => navigate(NEWS_ROUTE)}>Все новости</span>
          </div>
          <div
            className="news_blog__blogItem"
            onClick={() =>
              navigate(`${NEWS_DETAIL__ROUTE}/${newsData[0] && newsData[0].id}`)
            }
          >
            <div className="news_blog__item--img">
              <img src={newsData[0] && newsData[0].image} alt="No img" />
            </div>
            <p className="news_blog__item--text">
              {newsData[0] && newsData[0].title}
            </p>
          </div>
          <div
            className="news_blog__blogItem"
            onClick={() =>
              navigate(`${NEWS_DETAIL__ROUTE}/${newsData[1] && newsData[1].id}`)
            }
          >
            <div className="news_blog__item--img">
              <img src={newsData[1] && newsData[1].image} alt="No img" />
            </div>
            <p className="news_blog__item--text">
              {newsData[1] && newsData[1].title}
            </p>
          </div>
          {/* <div className="news_blog__blogItem">
            <div className="news_blog__item--img">
              <img src={news_item_1} alt="No img" />
            </div>
            <p className="news_blog__item--text">
              До конца месяца действует акция на бахилы (3000 пар) всего 2600
              сом вместо 2900 сом!..
              <p>02.25.21</p>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default News_blog;
