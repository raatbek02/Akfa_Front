import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import "./Banner.css";
import banner_img from "../../../assets/images/new_design/banner_main.png";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BANNER_DETAIL__ROUTE } from "../../../utils/consts";
import { CircularProgress } from "@mui/material";

SwiperCore.use([Autoplay, Pagination]);

// const arr = [1, 2, 3];

function Banner() {
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log("bannerData", bannerData);

  useEffect(() => {
    const getBannerData = async () => {
      await axios
        .get(`http://localhost:8000/api/banner-news/`)
        .then(({ data }) => {
          setBannerData(data);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getBannerData();
  }, []);

  if (loading) {
    return (
      <div className="loading--block">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="banner">
        <div className="banner__container">
          <div className="banner__content">
            <div className="banner__left">
              <Swiper
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                centeredSlides={true}
                loop={true}
                speed={900}
                spaceBetween={50}
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
                              navigate(`${BANNER_DETAIL__ROUTE}/${el.id}`)
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

            <div className="banner__right">
              <div className="banner__right--img">
                <img src={bannerData[1] && bannerData[1].image} alt="No img" />
                <div className="banner__btn--right">
                  <button
                    onClick={() =>
                      navigate(
                        `${BANNER_DETAIL__ROUTE}/${
                          bannerData[1] && bannerData[1].id
                        }`
                      )
                    }
                  >
                    Узнать больше
                  </button>
                </div>
              </div>
              <div className="banner__right--img">
                <img src={bannerData[2] && bannerData[2].image} alt="No img" />
                <div className="banner__btn--right">
                  <button
                    onClick={() =>
                      navigate(
                        `${BANNER_DETAIL__ROUTE}/${
                          bannerData[2] && bannerData[2].id
                        }`
                      )
                    }
                  >
                    Узнать больше
                  </button>
                </div>
              </div>

              {/* <img src={banner_img} alt="No img"></img> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;

//   return (
//     <div className="wrapper">
//       <Swiper
//         pagination={{ clickable: true }}
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}
//         centeredSlides={false}
//         loop={true}
//         speed={900}
//         //   spaceBetween={20}
//         slidesPerView={1}

//       >
//         {arr.map((_, i) => {
//           return (
//             <SwiperSlide key={i}>
//               <div className="banner">
//                 <div className="banner__container">
//                   <div className="banner__content">
//                     <div className="banner__left">
//                       <h1>ALPIO 500 Напичкан современными технологиями</h1>
//                       <div className="banner__btn">
//                         <button>Купить</button>
//                       </div>
//                     </div>
//                     <div className="banner__right">
//                       <img src={banner_img} alt="No img"></img>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           );
//         })}
//       </Swiper>
//     </div>
//   );
