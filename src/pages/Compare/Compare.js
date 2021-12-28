import axios from "axios";
import React, { useState, useEffect } from "react";
// import product_cart_logo from "../../assets/images/new_design/product_cart_logo.svg";
// import product_compare_logo from "../../assets/images/new_design/product_compare_logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { removeCompareItem } from "../../store/compare";
import "./Compare.css";

function Compare() {
  const [characteristicData, setCharacteristicData] = useState([]);
  const compare_products_local = useSelector(
    (state) => state.compareSlice.compare_products
  );
  //   const compare_products_local = useSelector
  const dispatch = useDispatch();

  console.log("characteristicData", characteristicData);
  useEffect(() => {
    const getCharasteristicData = async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/topik-characteristic/`)
        .then(({ data }) => {
          setCharacteristicData(data);
        });
    };
    getCharasteristicData();
  }, []);

  return (
    <div className="compare">
      <div className="compare__container">
        <div className="compare__title">
          <h2>
            <span>Сравнение товаров</span>
          </h2>
        </div>
        {/* <div className="compare__categories">
          <ul>
            <li>Ветеринария</li>
            <li>Кардиология</li>
            <li>Анастазиология</li>
            <li>Гинекология</li>
          </ul>
        </div> */}
        <div className="compare__content">
          <div className="compare__left">
            {/* <div className="compare__item--card">Товар</div>
            {characteristicData.map((item) => {
              return <div className="compare__item--field">{item.title}</div>;
            })} */}
          </div>
          <div className="compare__right">
            <div className="compare__products">
              <div className="compare__item">
                <div className="compare__item--card ">Товар</div>
                {characteristicData.map((item) => {
                  return (
                    <div className="compare__item--field">{item.title}</div>
                  );
                })}
              </div>
              {compare_products_local.map((el) => {
                return (
                  <div className="compare__item">
                    <div className="compare__item--card">
                      <div className="compare__img">
                        <img src={el.image} alt="No img" />
                      </div>
                      <div className="compare__item--content">
                        <div className="compare__name">{el.title}</div>
                        <div className="compare__price">
                          <span>{el.price} $</span>
                          {/* <span> есть</span> */}
                        </div>
                        <i
                          onClick={() => dispatch(removeCompareItem(el.id))}
                          class="far fa-trash-alt"
                        ></i>
                      </div>
                    </div>

                    {el.characteristics.map((item) => {
                      return (
                        <div className="compare__item--field">
                          {item.meaning}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compare;
