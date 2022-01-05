import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import "./Logo.css";
import logo_1 from "../../../assets/images/logo_1.png";
import visa_logo from "../../../assets/images/new_design/visa_logo.png";
import axios from "axios";

SwiperCore.use([Autoplay, Pagination]);

function Logo() {
  const [logoData, setLogoData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/main-logo/").then(({ data }) => {
      setLogoData(data);
    });
  }, []);

  return (
    <div className="logo">
      <div className="logo__container">
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
                <SwiperSlide>
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
