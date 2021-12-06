import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useCart } from "react-use-cart";
import productRest from "../../assets/images/productPage_rest.png";
import review_profile from "../../assets/images/review_profile.png";
import productPage_star from "../../assets/images/productPage_star.png";
import "./ProductPage.css";

const restImages = [];
for (let i = 0; i < 5; i++) {
  restImages.push(productRest);
}

function ProductPage() {
  const [show, setShow] = useState(true);
  const [oneProduct, setOneProduct] = useState({});
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const { addItem, items, totalItems, totalUniqueItems, emptyCart } = useCart();
  console.log(count);

  // console.log(oneProduct);
  console.log("items", items);
  console.log("totalItems", totalItems);
  console.log("totalUniqueItems", totalUniqueItems);


  useEffect(() => {
    const getOneProduct = async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/products/${id}`)
        .then(({ data }) => setOneProduct(data));
    };
    getOneProduct();
  }, []);

  const plusCount = () => {
    setCount(count + 1);
  };
  const minusCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const showDescHandler = () => {
    setShow(true);
  };
  const showReviewsHandler = () => {
    setShow(false);
  };

  return (
    <div className="productPage">
      <div className="productPage__container">
        <div className="productPage__path">
          {oneProduct.category} / {oneProduct.subcategory}
        </div>
        <div className="productPage__content">
          <div className="productPage__top">
            <div className="productPage__left">
              <p className="productPage__name">{oneProduct.title}</p>

              <span>Код товара: {oneProduct.title}</span>

              <div className="productPage__img">
                <img src={oneProduct.image} alt="No img" />
              </div>
              <div className="productPage__restImg">
                {restImages.map((el) => {
                  return <img src={oneProduct.image} alt="No img" />;
                })}
              </div>
            </div>
            <div className="productPage__right">
              <div className="productPage__right--block">
                <div className="productPage__price">{oneProduct.price} $</div>
                <div className="productPage__right--content">
                  <div className="productPage__right--left">
                    <p>Доступность: На складе</p>
                    <p>Доступность: На складе</p>
                    <div className="productPage__rating">Rating</div>
                  </div>
                  <div className="productPage__right--right">
                    <div className="productPage__quantity">
                      <span>кол-во</span>
                      <div className="productPage__counter">
                        <div className="productPage__counter--num">{count}</div>
                        <div className="productPage__counter--buttons">
                          <button onClick={plusCount}>
                            <svg
                              width="10"
                              height="11"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <line
                                x1="4.95459"
                                y1="1.40918"
                                x2="4.95459"
                                y2="9.90918"
                                stroke="#3F3D56"
                                stroke-linecap="round"
                              />
                              <line
                                x1="9.13623"
                                y1="5.72742"
                                x2="0.63623"
                                y2="5.72742"
                                stroke="#3F3D56"
                                stroke-linecap="round"
                              />
                            </svg>
                          </button>
                          <button onClick={minusCount}>
                            <svg
                              width="10"
                              height="2"
                              viewBox="0 0 10 2"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <line
                                x1="9.13623"
                                y1="1"
                                x2="0.63623"
                                y2="0.999999"
                                stroke="#3F3D56"
                                stroke-linecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="productPage__buttons">
                      <button onClick={() => addItem(oneProduct)}>
                        В корзину
                      </button>
                      <button>Купить</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="productPage__bottom">
            <div className="productPage__bottom--buttons">
              <button onClick={showDescHandler}>Описание</button>
              <button onClick={showReviewsHandler}>Отзывы</button>
            </div>
          </div>
          <div className="productPage__bottom--content">
            {show ? (
              <div className="productPage__description">
                <p>
                  Аппарат рентгеновский маммографический "AR-Mammo" –
                  эффективное решение для рентгенографических исследований
                  молочной железы с целью выявления онкологических заболеваний
                  на ранних стадиях.
                </p>
                <span>Преимущества:</span>
                <ul>
                  <li>- Гибкая система автоконтроля экспозиции;</li>
                  <li>
                    - Дигрессивное сжатие (AR-Mammo имеет лучший механизм с
                    целым рядом скоростных режимов для оптимального сжатия
                    каждого типа плотности груди);
                  </li>
                  <li>
                    - Высокоскоростной двухугловой вращающийся анод. Скорость
                    вращения анода - 9700 об/мин;
                  </li>
                  <li>- Фокусное пятно 0,1/0,3 мм; 300 000 HU</li>
                  <li>
                    - Охлаждение воздухом и маслом. Постоянный мониторинг
                    нагрузки трубки, контролируемый микропроцессором,
                    предохраняет трубку от перегрузок.
                  </li>
                  <li>- Низкая доза облучения;</li>
                  <li>- Фокусное расстояние – 65 см;</li>
                  <li>
                    - Две панели управления для удобства пользователя: левая и
                    правая;
                  </li>
                  <li>
                    - Улучшенный механизм вращения кронштейна для более быстрых
                    и мягких движений;
                  </li>
                  <li>- Угол наклона кронштейна от -135˚ до +180˚;</li>
                  <li>
                    - Легкая и простая в обращении автозагрузочная решетка Баки
                    с автоматизированной загрузкой и извлечением кассеты;
                  </li>
                  <li>
                    - Специально разработанная решетка для лучшего контраста и
                    разрешения. Точные движения благодаря микропроцессору 36
                    линий на сантиметр; соотношение решетки - 5:1
                  </li>
                  <li>
                    - Механизированная коллимация луча, регулирующийся размер
                    радиационного поля с подсветкой после съемки.
                  </li>
                  <li>- Компактные размеры и небольшой вес;</li>
                  <li>- Эргономичный и удобный для пациента дизайн</li>
                </ul>
                <p>
                  Маммограф, имеющий модульную конструкцию, с широким выбором
                  опций, оптимизирован для работы в самых востребованных
                  условиях и является ценным приобретением для
                  рентгенодиагностических кабинетов лечебно-профилактических
                  учреждений, как для проведения массового скрининга, так и для
                  проведения сложных диагностических процедур.
                </p>
              </div>
            ) : (
              <div className="productPage__reviews">
                {restImages.map((_, index) => {
                  return (
                    <div key={index} className="productPage__reviews-item">
                      <div className="productPage__reviews-left">
                        <div className="productPage__review--profile">
                          <img src={review_profile} alt="No img" />
                          <span>Макс </span>
                        </div>
                        <div className="productPage__review--ratings">
                          {restImages.map((_, index) => {
                            return (
                              <img
                                key={index + 1}
                                src={productPage_star}
                                alt="No img"
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div className="productPage__reviews-middle">
                        <div className="productPage__review--message">
                          то текст-"рыба", часто используемый в печати и
                          вэб-дизайне. Lorem Ipsum является стандартной "рыбой"
                          для текстов на латинице с начала XVI века. В то время
                          некий безымянный печатник создал большую коллекцию
                          размеров и форм шрифтов, используя Lorem Ipsum
                        </div>
                      </div>
                      <div className="productPage__reviews-right">
                        <div className="productPage__reviews--date">
                          Вчера 15:46
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
