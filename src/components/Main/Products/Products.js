import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import { Stack,Pagination } from "@material-ui/core";

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
  const [count, setCount] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  console.log(pageCount);
  console.log("product", product);

  const { addItem, items, totalItems, totalUniqueItems, emptyCart } = useCart();

  console.log(type);

  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const isAuth = useSelector((state) => state.isAuthSlice.isAuth);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/products?page=1&${
          type !== null ? `${type}=${sort}` : ""
        }`
      );
      setProduct(res.data);
      const total = res.data.count;
      setPageCount(Math.ceil(total / 12));
    };
    getProducts();
  }, [type]);

  const paginateProducts = async (currentPage) => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/products?page=${currentPage}&${
        type !== null ? `${type}=${sort}` : ""
      }`
    );
    return res.data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    const getPaginatedProducts = await paginateProducts(currentPage);
    setProduct(getPaginatedProducts);
  };

  //   console.log(items);

  const addAuthCart = async (e, id) => {
    e.stopPropagation();
    const data = {
      product: id,
      quantity: count,
    };

    await axios
      .post(`http://127.0.0.1:8000/api/cart-item_product/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        setCount(count);

        console.log("Success", res);
      })
      .catch((e) => {
        console.log("Ошибка", e);
      });
    //  e.preventDefault();
  };

  const addLocalCart = (e, id, count) => {
    e.stopPropagation();

    addItem(id, count);
  };

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
          {product.results &&
            product.results.map((el) => {
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
                      {isAuth ? (
                        <div
                          onClick={(e) => addAuthCart(e, el.id)}
                          className="product__cart-button"
                        >
                          <img src={product_cart_logo} alt="No img" />

                          <span>В корзину</span>
                        </div>
                      ) : (
                        <div
                          onClick={(e) => addLocalCart(e, el)}
                          className="product__cart-button"
                        >
                          <img src={product_cart_logo} alt="No img" />

                          <span>В корзину</span>
                        </div>
                      )}

                      <div className="product__compare-button">
                        <img src={product_compare_logo} alt="No img" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="product__pagination">
          <ReactPaginate
            previousLabel={<i class="fas fa-chevron-left"></i>}
            nextLabel={<i class="fas fa-chevron-right"></i>}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"product__pagination--container"}
            pageClassName={"product__pagination--item"}
            pageLinkClassName={"product__pagination--link"}
            previousClassName={""}
            previousLinkClassName={"product__pagination--previous"}
            nextClassName={""}
            nextLinkClassName={"product__pagination--next"}
            breakClassName={"product__pagination--item"}
            breakLinkClassName={"product__pagination--link"}
            activeClassName={"active"}
          />
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
