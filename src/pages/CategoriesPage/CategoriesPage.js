import React from "react";
import "./CategoriesPage.css";
import category_5 from "../../assets/images/categories_img/category_5.png";
import star from "../../assets/images/star.png";

const data = [];
for (let i = 0; i < 18; i++) {
  data.push({
    img: category_5,
    name: "Касметология",
    price: "25.35 $",
    availability: "есть",
    rating: star,
  });
}
const stars = [star, star, star, star, star];

function CategoriesPage() {
  return (
    <div className="categoriesPage">
      <div className="categoriesPage__container">
        <div className="categoriesPage__title">
          <div className="categoriesPage__title--line"></div>
          <h2>Ветеринария</h2>
          <div className="categoriesPage__title--line"></div>
        </div>
        <div className="categoriesPage__sorting">
          <div className="categoriesPage__sorting--item">Все</div>
          <div className="categoriesPage__sorting--item">
            Ветеринарные УЗИ-аппараты
          </div>
          <div className="categoriesPage__sorting--item">
            Ветеринарные Ренгеновые аппараты
          </div>
          <div className="categoriesPage__sorting--item">
            Ветеринарные Ренгеновые аппараты
          </div>
        </div>

        <div className="categoriesPage__content">
          {data.map((el) => {
            return (
              <div className="categoriesPage__item">
                <div className="categoriesPage__img">
                  <img src={category_5} alt="No img" />
                </div>
                <div className="categoriesPage__name">Касметология</div>
                <div className="categoriesPage__price">
                  <span>25.35 $</span>
                  <span> есть</span>
                </div>
                <div className="categoriesPage__rating">
                  {stars.map((el) => (
                    <img src={star} alt="No img" />
                  ))}
                </div>
              </div>
              //   </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
