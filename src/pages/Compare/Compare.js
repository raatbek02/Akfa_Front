import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import { removeCompareItem } from "../../store/compare";
import "./Compare.css";
import new_empty_compare from "../../assets/images/new_design/new_empty_compare.png";
import bin_compare from "../../assets/images/new_design/bin_compare.png";

import { $host } from "../../http";

function Compare() {
  const [characteristicData, setCharacteristicData] = useState([]);
  //   const [addedChar, setAddedChar] = useState([]);

  const compare_products_local = useSelector(
    (state) => state.compareSlice.compare_products
  );
  const dispatch = useDispatch();

  console.log("characteristicData", characteristicData);
  console.log("compare_products_local", compare_products_local);

  useEffect(() => {
    const getCharasteristicData = async () => {
      await $host.get(`api/topik-characteristic/`).then(({ data }) => {
        setCharacteristicData(data);
      });
    };
    getCharasteristicData();
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="compare">
      <div className="compare__container">
        {compare_products_local.length > 0 ? (
          <>
            <div className="compare__title">
              <h1>
                <span>Сравнение товаров</span>
              </h1>
            </div>

            <div className="compare__content">
              <div className="compare__products">
                <div className="compare__item">
                  <div className="compare__item--card ">Товар</div>
                  {characteristicData.map((item) => {
                    return (
                      <div
                        key={item.id + Date.now()}
                        className="compare__item--field"
                      >
                        {item.title}
                      </div>
                    );
                  })}
                </div>
                {compare_products_local.map((el) => {
                  return (
                    <div
                      key={el.id + Date.now() + 10}
                      className="compare__item"
                    >
                      <div className="compare__item--card">
                        <div className="compare__img">
                          <img src={el.image} alt="No img" />
                        </div>
                        <div className="compare__item--content">
                          <div className="compare__name">{el.title}</div>

                          {el.discount_price !== 0 ? (
                            <div className="compare__price">
                              <span>{el.discount_price} сом</span>
                            </div>
                          ) : (
                            <div className="compare__price">
                              <span>По запросу</span>
                            </div>
                          )}

                          <div
                            onClick={() => dispatch(removeCompareItem(el.id))}
                            className="compare__bin"
                          >
                            <img src={bin_compare} alt="No" />
                          </div>
                        </div>
                      </div>

                      {el.chars.map((item) => {
                        return (
                          <div key={item.id} className="compare__item--field">
                            {item.value ? item.value : "нет"}
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
            <h1>
              <span>Товары для сравнения отсутствуют</span>
            </h1>
            <div className="compare__empty--img">
              <img src={new_empty_compare} alt="No img" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Compare;
