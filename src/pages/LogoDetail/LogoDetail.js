import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { $host } from "../../http";
import "../NewsDetail/NewsDetail.css";
import "./LogoDetail.css";

function LogoDetail() {
  const [oneLogo, setOneLogos] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getOneProduct = async () => {
      await $host
        .get(`api/main-logo/${id}`)
        .then(({ data }) => setOneLogos(data))
        .finally(() => {
          setLoading(false);
        });
    };
    getOneProduct();
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="loading--banner">
        <CircularProgress color="error" />
      </div>
    );
  }

  return (
    <div className="logoDetail">
      <div className="logoDetail__container">
        <h2 className="logoDetail__title">
          <span>{oneLogo.title}</span>
        </h2>
        <div className="logoDetail__content">
          <div className="newsDetail__logo">
            <img src={oneLogo.image} alt="No img" />
          </div>

          <div className="newsDetail__text">{oneLogo.description}</div>
        </div>
      </div>
    </div>
  );
}

export default LogoDetail;
