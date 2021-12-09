import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

import "./CategoriesPage.css";
// import category_5 from "../../assets/images/categories_img/category_5.png";
import star from "../../assets/images/star.png";

const stars = [star, star, star, star, star];

function CategoriesPage() {
  const [activeItem, setActiveItem] = useState(null);
  const [subcategory, setCategory] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  console.log(categoryProducts);
  console.log("activeItem", activeItem);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getSubcategories = async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/subcategory?categories=${id}`)
        .then(({ data }) => {
          setCategory(data);
        });
    };

    getSubcategories();
  }, []);

  useEffect(() => {
    const getCategoriesProducts = async () => {
      await axios
        .get(
          `http://127.0.0.1:8000/api/products/?category=${id}&${
            activeItem !== null ? `subcategory=${activeItem}` : ""
          }`
        )
        .then(({ data }) => setCategoryProducts(data));
    };
    getCategoriesProducts();
  }, [activeItem]);

  return (
    <div className="categoriesPage">
      <div className="categoriesPage__container">
        <div className="categoriesPage__title">
          <div className="categoriesPage__title--line"></div>
          <h2>{categoryProducts[0] && categoryProducts[0].category}</h2>
          <div className="categoriesPage__title--line"></div>
        </div>
        <ul className="categoriesPage__sorting">
          <li
            onClick={() => setActiveItem(null)}
            className={activeItem === null ? "active" : ""}
          >
            Все
          </li>
          {subcategory.map((obj) => {
            return (
              <li
                key={obj.id}
                onClick={() => setActiveItem(obj.id)}
                className={activeItem === obj.id ? "active" : ""}
              >
                {obj.title}
              </li>
            );
          })}
        </ul>

        <div className="categoriesPage__content">
          {categoryProducts &&
            categoryProducts.map((el) => {
              return (
                <div
                  key={el._id}
                  onClick={() => navigate(`/productPage/${el.id}`)}
                  className="categoriesPage__item"
                >
                  <div className="categoriesPage__img">
                    <img src={el.image} alt="No img" />
                  </div>
                  <div className="categoriesPage__name">{el.title}</div>
                  <div className="categoriesPage__price">
                    <span>{el.price} $</span>
                    <span> есть</span>
                  </div>
                  <div className="categoriesPage__rating">
                    {stars.map((el) => (
                      <img src={star} alt="No img" />
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;

// const data = [];
// for (let i = 0; i < 18; i++) {
//   data.push({
//     img: category_5,
//     name: "Касметология",
//     price: "25.35 $",
//     availability: "есть",
//     rating: star,
//   });
// }
