import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import "./Banner.css";
import banner_img from "../../../assets/images/banner_img.png";

SwiperCore.use([Autoplay, Pagination]);

const arr = [1, 2, 3];

function Banner() {
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

  return (
    <div className="wrapper">
      <div className="banner">
        <div className="banner__container">
          <div className="banner__content">
            <div className="banner__left">
              <div className="banner__btn">
                <button>Узнать больше</button>
              </div>
            </div>
            <div className="banner__right">
              <div className="banner__right--top">
                <div className="banner__btn">
                  <button>Узнать больше</button>
                </div>
                {/* <p style={{ fontSize: 30, color: 'red' }}>.</p> */}
              </div>
              <div className="banner__right--bottom">
                <div className="banner__btn">
                  <button>Узнать больше</button>
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
