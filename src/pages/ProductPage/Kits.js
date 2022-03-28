import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
import { toast } from "react-toastify";

import "./Kits.css";
import product_cart_logo from "../../assets/images/new_design/product_cart_logo.svg";
import product_compare_logo from "../../assets/images/new_design/product_compare_logo.svg";
import { getCompareProducts } from "../../store/compare";
import { $host } from "../../http";
import { PRODUCT_PAGE_ROUTE } from "../../utils/consts";
import CircularProgress from "@mui/material/CircularProgress";
import ReactPaginate from "react-paginate";

function Kits({ oneProduct }) {
  const [kitsProducts, setKitsProducts] = useState([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(0);

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

  //   useEffect(() => {
  //     const getOneProduct = async () => {
  //       await $host
  //         .get(`api/products?kits=${oneProduct.kits}`)
  //         .then(({ data }) => setKitsProducts(data))
  //         .finally(() => {
  //           setLoading(false);
  //         });
  //     };
  //     getOneProduct();
  //   }, []);

  useEffect(() => {
    const getProducts = async () => {
      let total = 0;
      await $host
        .get(`api/products?kits=${oneProduct.kits}`)
        .then(({ data }) => {
          setKitsProducts(data);
          total = data.count;
          setPageCount(Math.ceil(total / 12));
        })
        .finally(() => {
          setLoading(false);
        });

      // const total = res.data.count;
    };
    getProducts();
  }, []);

  const paginateProducts = async (currentPage) => {
    const res = await $host.get(
      `api/products?page=${currentPage}&kits=${oneProduct.kits}`
    );
    return res.data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    const getPaginatedProducts = await paginateProducts(currentPage);
    setKitsProducts(getPaginatedProducts);
  };

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

  //         console.log("Success", res);
  //       })
  //       .catch((e) => {
  //         console.log("Ошибка", e);
  //       });
  //     //  e.preventDefault();
  //   };

  const addLocalCart = (e, id, count) => {
    e.stopPropagation();
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

  if (loading) {
    return (
      <div className="loading--block">
        <CircularProgress color="error" />
      </div>
    );
  }

  return (
    <div className="kits">
      <div className="kits__container">
        <div className="kits__content">
          {kitsProducts.results &&
            kitsProducts.results.map((el) => {
              return (
                <div
                  onClick={() => navigate(`${PRODUCT_PAGE_ROUTE}/${el.id}`)}
                  className="product__item"
                  key={el.id}
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
                        onClick={(e) => addLocalCart(e, el, count)}
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
      </div>
    </div>
  );
}

export default Kits;

//  <div onClick={(e) => addAuthCart(e, el.id)} className="product__buttons">
//    {isAuth ? (
//      <div className="product__cart-button">
//        <img src={product_cart_logo} alt="No img" />

//        <span>В корзину</span>
//      </div>
//    ) : (
//      <div
//        onClick={(e) => addLocalCart(e, el, count)}
//        className="product__cart-button"
//      >
//        <img src={product_cart_logo} alt="No img" />

//        <span>В корзину</span>
//      </div>
//    )}

//    <div
//      onClick={(e) => addCompareProducts(e, el, el.id)}
//      className="product__compare-button"
//    >
//      <img src={product_compare_logo} alt="No img" />
//    </div>
//  </div>;
