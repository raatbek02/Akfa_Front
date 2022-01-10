import React, { useEffect, useState } from "react";
import axios from "axios";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./Logo.css";

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
