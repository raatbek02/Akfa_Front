import React, { useEffect, useState } from "react";
import { $host } from "../../http";

// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { toast } from "react-toastify";
import { useCart } from "react-use-cart";
import { setSubCategory_id } from "../../store/modalCatalog";
import { getCompareProducts } from "../../store/compare";
import { CATEGORY_BANNER_DETAIL__ROUTE } from "../../utils/consts";
import News_blog from "../../components/Main/News_blog/News_blog";
import product_cart_logo from "../../assets/images/new_design/product_cart_logo.svg";
import product_compare_logo from "../../assets/images/new_design/product_compare_logo.svg";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./SubcategoriesPage.css";
import ReactPaginate from "react-paginate";

SwiperCore.use([Autoplay, Pagination, Navigation]);

function SubcategoriesPage() {
  const { id } = useParams();
  const [subcategory, setSubCategory] = useState([]);
  const [subCategoryProducts, setSubCategoryProducts] = useState([]);
  const [allCategoryProd, setAllCategoryProd] = useState([]);
  //   const [count, setCount] = useState(1);
  const [bannerData, setBannerData] = useState([]);
  const [sorting, setSorting] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  console.log("subcategory", subcategory);
  console.log("subCategoryProducts", subCategoryProducts);
  console.log(allCategoryProd, setAllCategoryProd);

  const { addItem, items } = useCart();

  const handleChange = (event) => {
    setSorting(event.target.value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subCategory_id = useSelector((s) => s.modalCatalog.subCategory_id);
  //   const isAuth = useSelector((state) => state.isAuthSlice.isAuth);
  //   const token = JSON.parse(localStorage.getItem("token"));
  const compare_products_local = useSelector(
    (state) => state.compareSlice.compare_products
  );

  const successAdded = () => toast.success("Товар добавлен в корзину!");

  const successCompareAdded = () =>
    toast.success("Товар добавлен в сравнения!");
  const warnCompareAdded = () =>
    toast.warn("Максимальное количество товаров для сравнения-4!");

  const paginateProducts = async (currentPage) => {
    const res = await $host.get(
      `api/products/?page=${currentPage}&category=${id}&${`subcategory=${subCategory_id}`}`
    );
    return res.data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    const getPaginatedProducts = await paginateProducts(currentPage);
    setSubCategoryProducts(getPaginatedProducts.results);
  };

  useEffect(() => {
    const getBannerData = async () => {
      await $host
        .get(`api/category-news/`)
        .then(({ data }) => {
          setBannerData(data);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getBannerData();
  }, []);

  useEffect(() => {
    const getSubcategories = async () => {
      await $host.get(`api/subcategory?categories=${id}`).then(({ data }) => {
        setSubCategory(data);
      });
    };

    getSubcategories();
  }, [id]);

  useEffect(() => {
    const getCategoriesProducts = async () => {
      let total = 0;

      await $host
        .get(
          `api/products/?category=${id}&page=1&subcategory=${subCategory_id}`
        )
        .then(({ data }) => {
          total = data.count;
          setPageCount(Math.ceil(total / 12));
          setSubCategoryProducts(data.results);
          dispatch(setSubCategory_id(subCategory_id));
        });
    };
    getCategoriesProducts();
  }, [subCategory_id, id]);

  //   const addAuthCart = async (e, id) => {
  //     e.stopPropagation();
  //     const data = {
  //       product: id,
  //       quantity: count,
  //     };

  //     await $host
  //       .post(`api/cart-item_product/`, data, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Token " + token,
  //         },
  //       })
  //       .then((res) => {
  //         setCount(count);
  //       })
  //       .catch((e) => {
  //         console.log("Ошибка", e);
  //       });
  //     //  e.preventDefault();
  //   };

  const addLocalCart = (e, id, count) => {
    e.stopPropagation();
    e.preventDefault();

    successAdded();

    addItem(id, count);
  };

  const addCompareProducts = async (e, id) => {
    e.stopPropagation();

    await $host.get(`api/products/${id}`).then(({ data }) => {
      dispatch(getCompareProducts({ data, id }));
    });

    if (compare_products_local.length < 4) {
      successCompareAdded();
    } else {
      warnCompareAdded();
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="loading--banner">
        <CircularProgress color="error" />
      </div>
    );
  }

  return (
    <div className="subcategoriesPage">
      <div className="subcategoriesPage__container">
        <div className="banner__left ">
          <Swiper
            pagination={{ clickable: true }}
            // navigation={true}
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

        <div className="subcategoriesPage__title">
          <h2>
            <span>{subcategory[0] && subcategory[0].category_item}</span>
          </h2>
        </div>
        <div className="subcategoriesPage__sorting-wrapper">
          <div className="subcategoriesPage__sorting above-1200">
            <Swiper
              //   pagination={{ clickable: true }}
              navigation={true}
              //   autoplay={{
              //     delay: 5000,
              //     disableOnInteraction: false,
              //   }}
              //   centeredSlides={true}
              loop={false}
              speed={900}
              //   spaceBetween={20}

              breakpoints={{
                1200: {
                  slidesPerView: 3,
                },

                320: {
                  slidesPerView: 2,
                },
              }}
            >
              {subcategory.map((obj) => {
                return (
                  <SwiperSlide
                    key={obj.id}
                    onClick={() => {
                      dispatch(setSubCategory_id(obj.id));
                      localStorage.setItem("subCategory_ID", obj.id);
                    }}
                    className={
                      subCategory_id === obj.id
                        ? "subcategoriesPage__sorting--item active"
                        : "subcategoriesPage__sorting--item"
                    }
                  >
                    {obj.title}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className="subcategoriesPage__sorting--mobile">
          <FormControl sx={{ m: 1, minWidth: 150 }} color="error">
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
                    <span className="subcategoriesPage__sorting--mobile--li">
                      {obj.title}
                    </span>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className="subcategoriesPage__content">
          {subCategoryProducts &&
            subCategoryProducts.map((el) => {
              return (
                <div
                  key={el._id}
                  onClick={() => navigate(`/productPage/${el.id}`)}
                  className="subcategoriesPage__item"
                >
                  <div className="product__img">
                    <img src={el.image} alt="No img" />
                  </div>
                  <div className="product__item--content">
                    <div className="product__name">{el.title}</div>
                    <div className="product__price">
                      {el.discount_price !== 0 ? (
                        <span className="product__price--price">
                          {el.discount_price} сом
                        </span>
                      ) : (
                        <span className="product__price--price">
                          По запросу
                        </span>
                      )}

                      {/* {el.is_done ? (
                        <span className="product__price--availability green">
                          {" "}
                          Есть
                        </span>
                      ) : (
                        <span className="product__price--availability red">
                          {" "}
                          Нет
                        </span>
                      )} */}
                    </div>
                    <div className="product__buttons">
                      <div
                        onClick={(e) => addLocalCart(e, el)}
                        className="product__cart-button"
                      >
                        <img src={product_cart_logo} alt="No img" />

                        <span>В корзину</span>
                      </div>

                      <div
                        onClick={(e) => addCompareProducts(e, el.id)}
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

        <News_blog />
      </div>
    </div>
  );
}

export default SubcategoriesPage;

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
