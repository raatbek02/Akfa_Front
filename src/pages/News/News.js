import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { NEWS_DETAIL__ROUTE } from "../../utils/consts";
import "./News.css";
import news_img from "../../assets/images/news_img.png";

function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getNewsData = async () => {
      await axios
        .get(`http://localhost:8000/api/news/`)
        .then(({ data }) => {
          setNewsData(data);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getNewsData();
  }, []);

  if (loading) {
    return (
      <div className="loading--banner">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="news">
      <div className="news__container">
        <h2 className="news__title">
          <span>Новости</span>
        </h2>

        <div className="news__content">
          <div className="news__left">
            {newsData.map((el) => {
              return (
                <div
                  onClick={() => navigate(`${NEWS_DETAIL__ROUTE}/${el.id}`)}
                  className="news__item"
                  key={el.id}
                >
                  <div className="news__item--img">
                    <img src={el.image} alt="No img" />
                  </div>
                  <p className="news__item--text">{el.description}</p>
                </div>
              );
            })}
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
