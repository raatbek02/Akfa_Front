import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCompareItem } from "../../store/compare";
// import product_cart_logo from "../../assets/images/new_design/product_cart_logo.svg";
// import product_compare_logo from "../../assets/images/new_design/product_compare_logo.svg";
import empty_compare from "../../assets/images/new_design/empty_compare.png";
import "./Compare.css";

function Compare() {
  const [characteristicData, setCharacteristicData] = useState([]);
  const [addedChar, setAddedChar] = useState([]);
  const arr = [];
  console.log("addedChar", addedChar);
  const compare_products_local = useSelector(
    (state) => state.compareSlice.compare_products
  );
  //   const compare_products_local = useSelector
  const dispatch = useDispatch();

  //   for (let i = 0; i < compare_products_local.length; i++) {
  //     arr.push(compare_products_local[i].characteristics);
  //     console.log("compare_products_local[i]", compare_products_local[i]);
  //   }
  //   console.log("arr", arr);
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
        {compare_products_local.length > 0 ? (
          <>
            <div className="compare__title">
              <h2>
                <span>Сравнение товаров</span>
              </h2>
            </div>

            <div className="compare__content">
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
                          </div>
                          <i
                            onClick={() => dispatch(removeCompareItem(el.id))}
                            class="far fa-trash-alt"
                          ></i>
                        </div>
                      </div>

                      {el.chars.map((item) => {
                        return (
                          <div className="compare__item--field">
                            {item.value}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="compare__empty">
            <h2>
              <span>Товары для сравнения отсутствуют</span>
            </h2>
            <div className="compare__empty--img">
              <img src={empty_compare} alt="No img" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Compare;
