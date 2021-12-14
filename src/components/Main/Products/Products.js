import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
// import category_5 from "../../../assets/images/categories_img/category_5.png";
// import star from "../../../assets/images/star.png";
import product_cart_logo from "../../../assets/images/new_design/product_cart_logo.svg";
import product_compare_logo from "../../../assets/images/new_design/product_compare_logo.svg";


import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
import { PRODUCT_PAGE_ROUTE } from "../../../utils/consts";

const product_filter = [
  { id: 1, name: " Популярные", type: "popular" },
  { id: 2, name: " Новинки", type: "novelty" },
  { id: 3, name: " Хит продаж", type: "actual" },
];

// const stars = [star, star, star, star, star];

function Products() {
  const [activeItem, setActiveItem] = useState(null);
  const [product, setProduct] = useState([]);
  const [sort, setSort] = useState(null);
  const [type, setType] = useState("");
  console.log(type);

  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get(
          `http://127.0.0.1:8000/api/products?${
            type !== null ? `${type}=${sort}` : ""
          }`
        )
        .then(({ data }) => setProduct(data));
    };
    getProducts();
  }, [type]);

  const { items } = useCart();
  console.log(items);

  // ${type}=${sort}
  return (
    <div className="products">
      <div className="products__container">
        <div className="products__title">
          <h2>
            <span>Товары</span>
          </h2>
        </div>
        <ul className="product__sorting">
          <li
            onClick={() => {
              setActiveItem(null);
              setType(null);
            }}
            className={activeItem === null ? "active" : ""}
          >
            Все
          </li>
          {product_filter.map((obj) => {
            return (
              <li
                key={obj.id}
                onClick={() => {
                  setActiveItem(obj.id);
                  setSort(true);
                  setType(obj.type);
                }}
                className={activeItem === obj.id ? "active" : ""}
              >
                {obj.name}
              </li>
            );
          })}
        </ul>
        <div className="product__content">
          {product &&
            product.map((el) => {
              return (
                <div
                  onClick={() => navigate(`${PRODUCT_PAGE_ROUTE}/${el.id}`)}
                  className="product__item"
                >
                  <div className="product__img">
                    <img src={el.image} alt="No img" />
                  </div>
                  <div className="product__item--content">
                    <div className="product__name">{el.title}</div>
                    <div className="product__price">
                      <span>{el.price} $</span>
                      <span> есть</span>
                    </div>

                    <div className="product__buttons">
                      <div className="product__cart-button">
                        <img src={product_cart_logo} alt="No img" />
                        <span> В корзину</span>
                      </div>
                      <div className="product__compare-button">
                        <img src={product_compare_logo} alt="No img" />
                      </div>
                    </div>
                  </div>

                  {/* <div className="product__rating">
                    {stars.map((star) => (
                      <img src={star} alt="No img" />
                    ))}
                  </div> */}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Products;

// const data = [];
// for (let i = 0; i < 24; i++) {
//   data.push({
//     id: 1,
//     img: category_5,
//     name: "Касметология",
//     price: "25.35 $",
//     availability: "есть",
//     rating: star,
//   });
// }
