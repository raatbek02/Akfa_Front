import React, { useEffect, useState } from "react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { $host } from "../../../http";
import { useNavigate } from "react-router-dom";
import { LOGO_DETAIL__ROUTE } from "../../../utils/consts";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./Logo.css";

SwiperCore.use([Autoplay, Pagination]);

function Logo() {
  const [logoData, setLogoData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    $host.get("api/main-logo/").then(({ data }) => {
      setLogoData(data);
    });
  }, []);

  return (
    <div className="logo">
      <div className="logo__container desktop">
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          centeredSlides={false}
          loop={true}
          speed={900}
          //  spaceBetween={20}
          slidesPerView={5}
        >
          <div className="logo__content">
            {logoData.map((el) => {
              return (
                <SwiperSlide key={el.id}>
                  {" "}
                  <div
                    onClick={() => navigate(`${LOGO_DETAIL__ROUTE}/${el.id}`)}
                    className="logo__img"
                  >
                    <img src={el.image} alt="No img" />
                  </div>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>

      <div className="logo__container mobile">
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          centeredSlides={false}
          loop={true}
          speed={900}
          spaceBetween={20}
          slidesPerView={3}
        >
          <div className="logo__content">
            {logoData.map((el) => {
              return (
                <SwiperSlide key={el.id}>
                  {" "}
                  <div className="logo__img">
                    <img src={el.image} alt="No img" />
                  </div>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Logo;
