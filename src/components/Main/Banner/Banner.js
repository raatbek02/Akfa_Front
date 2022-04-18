import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { CircularProgress } from "@mui/material";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import { BANNER_DETAIL__ROUTE } from "../../../utils/consts";
import "./Banner.css";
import { $host } from "../../../http";

SwiperCore.use([Autoplay, Pagination]);

function Banner() {
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getBannerData = async () => {
      await $host
        .get(`api/banner-news/`)
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
        <CircularProgress color="error" />
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
