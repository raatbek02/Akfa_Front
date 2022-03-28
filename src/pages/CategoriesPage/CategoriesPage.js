import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { useNavigate, useParams } from "react-router-dom";
import {
  CATEGORY_BANNER_DETAIL__ROUTE,
  SUBCATEGORIES_PAGE_ROUTE,
} from "../../utils/consts";
import { setSubCategory_id } from "../../store/modalCatalog";
import { $host } from "../../http";
import { CircularProgress } from "@mui/material";
import grey_medLogo from "../../assets/images/categories_img/dark_medLogo.png";
import subcat_1 from "../../assets/images/categories_img/subcat_1.jpg";
import subcat_2 from "../../assets/images/categories_img/subcat_2.jpg";
import subcat_3 from "../../assets/images/categories_img/subcat_3.jpg";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./CategoriesPage.css";

SwiperCore.use([Autoplay, Pagination, Navigation]);

function CategoriesPage() {
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subCategory, setSubCategory] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getBannerData = async () => {
      await $host
        .get(`api/category-news/`)
        .then(({ data }) => {
          setBannerData(data);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getBannerData();
  }, []);

  useEffect(() => {
    const getSubcategories = async () => {
      await $host.get(`api/subcategory?categories=${id}`).then(({ data }) => {
        setSubCategory(data);
      });
    };
    getSubcategories();
  }, [id]);

  if (loading) {
    return (
      <div className="loading--banner">
        <CircularProgress color="error" />
      </div>
    );
  }

  return (
    <div className="categoriesPage">
      <div className="categoriesPage__container">
        <div className="banner__left ">
          <Swiper
            pagination={{ clickable: true }}
            // navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            centeredSlides={true}
            loop={true}
            speed={900}
            spaceBetween={20}
            slidesPerView={1}
          >
            {bannerData.map((el) => {
              return (
                <SwiperSlide key={el.id}>
                  <div className="banner__left--img">
                    <img src={el.image} alt="No img" />
                    <div className="banner__btn">
                      <button
                        onClick={() =>
                          navigate(`${CATEGORY_BANNER_DETAIL__ROUTE}/${el.id}`)
                        }
                      >
                        Узнать больше
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="categoriesPage__title">
          <h1>
            <span>{subCategory[0] && subCategory[0].category_item}</span>
          </h1>
        </div>

        <div className="categoriesPage__content">
          {subCategory &&
            subCategory.map((el) => (
              <div key={el.id} className="categoriesPage__item">
                <div
                  onClick={() => {
                    navigate(`${SUBCATEGORIES_PAGE_ROUTE}/${el.categories}`);
                    dispatch(setSubCategory_id(el.id));
                    localStorage.setItem("subCategory_ID", el.id);
                  }}
                  className="categoriesPage__item--top"
                >
                  {el.title}
                </div>
                <div className="categoriesPage__item--bottom">
                  <ul>
                    {el.under_subcategories.map((el_2) => (
                      <li>{el_2.title}</li>
                    ))}
                  </ul>

                  <div className="categoriesPage__bg">
                    <img src={el.image !== null ? el.image : subcat_1} alt="" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
