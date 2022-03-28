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
import ReactPaginate from "react-paginate";
import { setUnderSubcat_id } from "../../store/modalCatalog";
import { getCompareProducts } from "../../store/compare";
import { CATEGORY_BANNER_DETAIL__ROUTE } from "../../utils/consts";
import News_blog from "../../components/Main/News_blog/News_blog";
import product_cart_logo from "../../assets/images/new_design/product_cart_logo.svg";
import product_compare_logo from "../../assets/images/new_design/product_compare_logo.svg";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "../SubcategoriesPage/SubcategoriesPage.css";
import "./UnderSubcat.css";

SwiperCore.use([Autoplay, Pagination, Navigation]);

function UnderSubcat() {
  const { id } = useParams();
  const [underSubcats, setUnderSubcats] = useState([]);
  const [underSubcatProducts, setUnderSubcatProducts] = useState([]);
  const [count, setCount] = useState(1);
  const [bannerData, setBannerData] = useState([]);
  const [sorting, setSorting] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  console.log("underSubcats", underSubcats);
  console.log("underSubcatProducts", underSubcatProducts);

  const { addItem, items } = useCart();

  const handleChange = (event) => {
    setSorting(event.target.value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const underSubcat_id = useSelector((s) => s.modalCatalog.underSubcat_id);

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
      `api/products/?page=${currentPage}&category=${id}&${`subcategory=${underSubcat_id}`}`
    );
    return res.data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    const getPaginatedProducts = await paginateProducts(currentPage);
    setUnderSubcatProducts(getPaginatedProducts.results);
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
    const getUnderSubcats = async () => {
      await $host.get(`api/undersubcat?subcategory=${id}`).then(({ data }) => {
        setUnderSubcats(data);
      });
    };

    getUnderSubcats();
  }, [id]);

  useEffect(() => {
    const getUnderSubcatProducts = async () => {
      let total = 0;

      await $host
        .get(
          `api/products/?subcategory=${id}&page=1&undersubcategory=${underSubcat_id}`
        )
        .then(({ data }) => {
          total = data.count;
          setPageCount(Math.ceil(total / 12));
          setUnderSubcatProducts(data.results);
          dispatch(setUnderSubcat_id(underSubcat_id));
        });
    };
    getUnderSubcatProducts();
  }, [underSubcat_id, id]);

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

  const addCompareProducts = (e, el, id) => {
    e.stopPropagation();
    dispatch(getCompareProducts({ el, id }));

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
    <div className="underSubcat">
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
                            navigate(
                              `${CATEGORY_BANNER_DETAIL__ROUTE}/${el.id}`
                            )
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
              <span>{underSubcats[0] && underSubcats[0].subcategory}</span>
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
                {underSubcats.map((obj) => {
                  return (
                    <SwiperSlide
                      key={obj.id}
                      onClick={() => {
                        dispatch(setUnderSubcat_id(obj.id));
                        localStorage.setItem("underSubcat_ID", obj.id);
                      }}
                      className={
                        underSubcat_id === obj.id
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
                {underSubcats.map((obj) => {
                  return (
                    <MenuItem
                      value={obj.id}
                      key={obj.id}
                      onClick={() => {
                        dispatch(setUnderSubcat_id(obj.id));
                        localStorage.setItem("underSubcat_ID", obj.id);
                      }}
                      className={underSubcat_id === obj.id ? "active" : ""}
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
            {underSubcatProducts &&
              underSubcatProducts.map((el) => {
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
                        <span>{el.discount_price} сом</span>
                        <span> есть</span>
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
    </div>
  );
}

export default UnderSubcat;
