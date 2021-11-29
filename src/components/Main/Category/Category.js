import React from "react";
import { useNavigate } from "react-router";
import category_1 from "../../../assets/images/categories_img/category_1.png";
import category_2 from "../../../assets/images/categories_img/category_2.png";
import category_3 from "../../../assets/images/categories_img/category_3.png";
import category_4 from "../../../assets/images/categories_img/category_4.png";
import category_5 from "../../../assets/images/categories_img/category_5.png";
import category_6 from "../../../assets/images/categories_img/category_6.png";

import "./Category.css";

const categories = [
  { id: 1, name: "Анестезиология", img: category_1 },
  { id: 2, name: "Ветеринария", img: category_2 },
  { id: 3, name: "Гинекалогия", img: category_3 },
  { id: 4, name: "Кардиология", img: category_4 },
  { id: 5, name: "Касметология", img: category_5 },

  { id: 6, name: "Лабороторное оборудование", img: category_6 },
];

function Category() {
  const navigate = useNavigate();
  return (
    <div className="category">
      <div className="category__container">
        <div className="category__title">
          <div className="category__title--line"></div>
          <h2>Категории</h2>
          <div className="category__title--line"></div>
        </div>
        <div className="show_click">
          <span> Показать все</span>
        </div>
        <div className="category__content">
          {categories.map((obj) => {
            return (
              <div
                onClick={() => navigate(`categoriesPage/:${obj.id}`)}
                key={obj.id}
                className="category__item"
              >
                <p>{obj.name}</p>
                <img src={obj.img} alt="No img" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Category;
