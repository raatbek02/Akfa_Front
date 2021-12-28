import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import "./Banner.css";
import banner_img from "../../../assets/images/new_design/banner_main.png";

SwiperCore.use([Autoplay, Pagination]);

const arr = [1, 2, 3];

function Banner() {
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
                  spaceBetween={0}
                slidesPerView={1}
              >
                <SwiperSlide>
                  <div className="banner__left--img">
                    <img src={banner_img} alt="No img" />
                    <div className="banner__btn">
                      <button>Узнать больше</button>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="banner__left--img">
                    <img src={banner_img} alt="No img" />
                    <div className="banner__btn">
                      <button>Узнать больше</button>
                    </div>
                  </div>
                </SwiperSlide>{" "}
                <SwiperSlide>
                  <div className="banner__left--img">
                    <img src={banner_img} alt="No img" />
                    <div className="banner__btn">
                      <button>Узнать больше</button>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            <div className="banner__right">
              <div className="banner__right--img">
                <img src={banner_img} alt="No img" />
                <div className="banner__btn">
                  <button>Узнать больше</button>
                </div>
              </div>
              <div className="banner__right--img">
                <img src={banner_img} alt="No img" />
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
