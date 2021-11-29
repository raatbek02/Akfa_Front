import React from "react";
import "./Products.css";
import category_5 from "../../../assets/images/categories_img/category_5.png";
import star from "../../../assets/images/star.png";
import { useNavigate } from "react-router";

const data = [];
for (let i = 0; i < 24; i++) {
  data.push({
    id: 1,
    img: category_5,
    name: "Касметология",
    price: "25.35 $",
    availability: "есть",
    rating: star,
  });
}
const stars = [star, star, star, star, star];

function Products() {
  const navigate = useNavigate();
  return (
    <div className="products">
      <div className="products__container">
        <div className="products__title">
          <div className="products__title--line"></div>
          <h2>Товары</h2>
          <div className="products__title--line"></div>
        </div>
        <div className="product__sorting">
          <div className="product__sorting--item">Популярные</div>
          <div className="product__sorting--item">Новинки</div>
          <div className="product__sorting--item">Хит продаж</div>
        </div>
        <div className="product__content">
          {data.map((el) => {
            return (
              //   <div className='product__line'>
              <div
                onClick={() => navigate(`productPage/:${el.id}`)}
                className="product__item"
              >
                <div className="product__img">
                  <img src={el.img} alt="No img" />
                </div>
                <div className="product__name">{el.name}</div>
                <div className="product__price">
                  <span>25.35 $</span>
                  <span> есть</span>
                </div>
                <div className="product__rating">
                  {stars.map((star) => (
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

export default Products;
