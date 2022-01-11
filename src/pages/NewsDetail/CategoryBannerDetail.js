import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "./NewsDetail.css";
import { $host } from "../../http";

function CategoryBannerDetail() {
  const [oneNews, setOneNews] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getOneProduct = async () => {
      await $host
        .get(`api/category-news/${id}`)
        .then(({ data }) => setOneNews(data))
        .finally(() => {
          setLoading(false);
        });
    };
    getOneProduct();
  }, []);

  if (loading) {
    return (
      <div className="loading--banner">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="newsDetail">
      <div className="newsDetail__container">
        <h2 className="newsDetail__title">
          <span>{oneNews.title}</span>
        </h2>
        <div className="newsDetail__content">
          <div className="newsDetail__left">
            <div className="newsDetail__text">{oneNews.description}</div>
          </div>
          <div className="newsDetail__right">
            <div className="newsDetail__right--img">
              <img src={oneNews.image} alt="No img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryBannerDetail;
