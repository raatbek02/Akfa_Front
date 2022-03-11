import React, { useEffect, useState } from "react";
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
              <img src={newsData[0] && newsData[0].image} alt="" />
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
              <img src={newsData[1] && newsData[1].image} alt="" />
            </div>
            <p className="news_blog__item--text">
              {newsData[1] && newsData[1].title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News_blog;
