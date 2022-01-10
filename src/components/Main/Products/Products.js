import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "react-use-cart";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { PRODUCT_PAGE_ROUTE } from "../../../utils/consts";
import { getCompareProducts } from "../../../store/compare";
import "./Products.css";
import product_cart_logo from "../../../assets/images/new_design/product_cart_logo.svg";
import product_compare_logo from "../../../assets/images/new_design/product_compare_logo.svg";

const product_filter = [
  { id: 1, name: " Популярные", type: "popular" },
  { id: 2, name: " Новинки", type: "novelty" },
  { id: 3, name: " Хит продаж", type: "actual" },
];

function Products() {
  const [activeItem, setActiveItem] = useState(null);
  const [product, setProduct] = useState([]);
  const [sort, setSort] = useState(null);
  const [type, setType] = useState("");
  const [count] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = React.useState("");
  //   const { addItem, items, totalItems, totalUniqueItems, emptyCart } = useCart();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSorting(event.target.value);
  };

  const token = JSON.parse(localStorage.getItem("token"));
  const isAuth = useSelector((state) => state.isAuthSlice.isAuth);
  const compare_products_local = useSelector(
    (state) => state.compareSlice.compare_products
  );

  const successAdded = () => toast.success("Товар добавлен в корзину!");
  const successCompareAdded = () =>
    toast.success("Товар добавлен в сравнения!");
  const warnCompareAdded = () =>
    toast.warn("Максимальное количество товаров для сравнения-4!");

  useEffect(() => {
    const getProducts = async () => {
      let total = 0;
      await axios
        .get(
          `http://127.0.0.1:8000/api/products?page=1&${
            type !== null ? `${type}=${sort}` : ""
          }`
        )
        .then(({ data }) => {
          setProduct(data);
          total = data.count;
          setPageCount(Math.ceil(total / 12));
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
      // const total = res.data.count;
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
        successAdded();

        console.log("Success", res);
      })
      .catch((e) => {
        console.log("Ошибка", e);
      });
    //  e.preventDefault();
  };

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
        <CircularProgress color="secondary" />
      </div>
    );
  }

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
        <div className="product__sorting--mobile">
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Сортировка
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={sorting}
              onChange={handleChange}
              autoWidth
              label="Сортировка"
            >
              <MenuItem
                value={4}
                onClick={() => {
                  setActiveItem(null);
                  setType(null);
                }}
                className={activeItem === null ? "active" : ""}
              >
                <em>Все</em>
              </MenuItem>
              {product_filter.map((obj) => {
                return (
                  <MenuItem
                    value={obj.id}
                    key={obj.id}
                    onClick={() => {
                      setActiveItem(obj.id);
                      setSort(true);
                      setType(obj.type);
                    }}
                    className={activeItem === obj.id ? "active" : ""}
                  >
                    {obj.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className="product__content">
          {product.results &&
            product.results.map((el) => {
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
