import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";

import product_cart_logo from "../../assets/images/new_design/product_cart_logo.svg";
import product_compare_logo from "../../assets/images/new_design/product_compare_logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { setSubCategory_id } from "../../store/modalCatalog";
import { useCart } from "react-use-cart";
import { getCompareProducts } from "../../store/compare";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import "./CategoriesPage.css";
import {
  CATEGORY_BANNER_DETAIL__ROUTE,
  NEWSDETAIL__ROUTE,
} from "../../utils/consts";

SwiperCore.use([Autoplay, Pagination]);

function CategoriesPage() {
  const { id } = useParams();
  const [activeItem, setActiveItem] = useState(null);
  const [subcategory, setSubCategory] = useState([]);
  const [categoryProducts, setSubCategoryProducts] = useState([]);
  const [count, setCount] = useState(1);
  const [bannerData, setBannerData] = useState([]);

  const { addItem, items, totalItems, totalUniqueItems, emptyCart } = useCart();
  const [sorting, setSorting] = React.useState("");

  const handleChange = (event) => {
    setSorting(event.target.value);
  };

  console.log("CategoryPage added items ", items);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subCategory_id = useSelector((s) => s.modalCatalog.subCategory_id);
  const isAuth = useSelector((state) => state.isAuthSlice.isAuth);
  const token = JSON.parse(localStorage.getItem("token"));
  const compare_products_local = useSelector(
    (state) => state.compareSlice.compare_products
  );

  const successAdded = () => toast.success("Товар добавлен в корзину!");

  const successCompareAdded = () =>
    toast.success("Товар добавлен в сравнения!");
  const warnCompareAdded = () =>
    toast.warn("Максимальное количество товаров для сравнения-4!");

  useEffect(() => {
    const getBannerData = async () => {
      await axios
        .get(`http://localhost:8000/api/category-news/`)
        .then(({ data }) => {
          setBannerData(data);
        });
    };
    getBannerData();
  }, []);

  useEffect(() => {
    const getSubcategories = async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/subcategory?categories=${id}`)
        .then(({ data }) => {
          setSubCategory(data);
        });
    };

    getSubcategories();
  }, [id]);

  useEffect(() => {
    const getCategoriesProducts = async () => {
      await axios
        .get(
          `http://127.0.0.1:8000/api/products/?category=${id}&${`subcategory=${subCategory_id}`}`
        )
        .then(
          ({ data }) => setSubCategoryProducts(data),
          dispatch(setSubCategory_id(subCategory_id))
        );
    };
    getCategoriesProducts();
  }, [subCategory_id, id]);

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
    e.preventDefault();

    successAdded();

    addItem(id, count);
  };

  const addCompareProducts = (e, el, id) => {
    e.stopPropagation();
    dispatch(getCompareProducts({ el, id }));

    if (compare_products_local.length < 4) {
      successCompareAdded();
    } else {
      warnCompareAdded();
    }
  };

  return (
    <div className="categoriesPage">
      <div className="categoriesPage__container">
        <div className="banner__left ">
          <Swiper
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            centeredSlides={true}
            loop={true}
            speed={900}
            spaceBetween={20}
            slidesPerView={1}
          >
            {bannerData.map((el) => {
              return (
                <SwiperSlide key={el.id}>
                  <div className="banner__left--img">
                    <img src={el.image} alt="No img" />
                    <div className="banner__btn">
                      <button
                        onClick={() =>
                          navigate(`${CATEGORY_BANNER_DETAIL__ROUTE}/${el.id}`)
                        }
                      >
                        Узнать больше
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="categoriesPage__title">
          <h2>
            <span>
              {categoryProducts.results && categoryProducts.results[0].category}
            </span>
          </h2>
        </div>
        <div className="categoriesPage__sorting">
          <ul>
            {/* <li
            onClick={() => setActiveItem(null)}
            className={subCategory_id === null ? "active" : ""}
          >
            Все
          </li> */}
            {subcategory.map((obj) => {
              console.log("obj.id ,subCategory_id", obj.id, subCategory_id);
              return (
                <li
                  key={obj.id}
                  onClick={() => {
                    dispatch(setSubCategory_id(obj.id));
                    localStorage.setItem("subCategory_ID", obj.id);
                  }}
                  className={subCategory_id === obj.id ? "active" : ""}
                >
                  {obj.title}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="categoriesPage__sorting--mobile">
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Подкатегории
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={sorting}
              onChange={handleChange}
              autoWidth
              label="Подкатегории"
            >
              {subcategory.map((obj) => {
                console.log("obj.id ,subCategory_id", obj.id, subCategory_id);
                return (
                  <MenuItem
                    value={obj.id}
                    key={obj.id}
                    onClick={() => {
                      dispatch(setSubCategory_id(obj.id));
                      localStorage.setItem("subCategory_ID", obj.id);
                    }}
                    className={subCategory_id === obj.id ? "active" : ""}
                  >
                    {obj.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className="categoriesPage__content">
          {categoryProducts.results &&
            categoryProducts.results.map((el) => {
              return (
                <div
                  key={el._id}
                  onClick={() => navigate(`/productPage/${el.id}`)}
                  className="categoriesPage__item"
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

                      <div
                        onClick={(e) => addCompareProducts(e, el, el.id)}
                        className="product__compare-button"
                      >
                        <img src={product_compare_logo} alt="No img" />
                      </div>
                    </div>
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

//   <div className="product__buttons">
//     <div className="product__cart-button">
//       <img src={product_cart_logo} alt="No img" />
//       {isAuth ? (
//         <span onClick={(e) => addAuthCart(e, el.id)}>В корзину</span>
//       ) : (
//         <span onClick={(e) => addLocalCart(e, el, count)}>В корзину</span>
//       )}
//     </div>
//     <div
//       onClick={(e) => addCompareProducts(e, el, el.id)}
//       className="product__compare-button"
//     >
//       <img src={product_compare_logo} alt="No img" />
//     </div>
//   </div>;

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

//   useEffect(() => {
//     const getCategoriesProducts = async () => {
//       await axios
//         .get(
//           `http://127.0.0.1:8000/api/products/?category=${id}&${
//             activeItem !== null ? `subcategory=${activeItem}` : ""
//           }`
//         )
//         .then(({ data }) => setSubCategoryProducts(data));
//     };
//     getCategoriesProducts();
//   }, [activeItem, id]);
