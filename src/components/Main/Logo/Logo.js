import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import "./Logo.css";
import logo_1 from "../../../assets/images/logo_1.png";

SwiperCore.use([Autoplay, Pagination]);

function Logo() {
  return (
    <div className="logo">
      <div className="logo__conteiner">
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
            <SwiperSlide>
              <img className="logo__img" src={logo_1} alt="No img" />
            </SwiperSlide>

            <SwiperSlide>
              <img className="logo__img" src={logo_1} alt="No img" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="logo__img" src={logo_1} alt="No img" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="logo__img" src={logo_1} alt="No img" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="logo__img" src={logo_1} alt="No img" />
            </SwiperSlide>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Logo;
