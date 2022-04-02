import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useCart } from "react-use-cart";
import "./PdfPage.css";

export class ComponentToPrint extends React.PureComponent {
  render() {
    const marginTop = "80px";
    const marginRight = "30px";
    const marginBottom = "80px";
    const marginLeft = "30px";
    const getPageMargins = () => {
      return `@page { 
                margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important;
                background-image: linear-gradient(rgba(255,255,255,.3), rgba(255,255,255,.3)), url("../svg/logo.png");
            }`;
    };
    const items = this.props.items;
    const totalUniqueItems = this.props.totalUniqueItems;
    const cartTotal = this.props.cartTotal;
    const firstName = this.props.firstName;
    const phoneNumber = this.props.phoneNumber;

    return (
      <>
        <div>
          <style>{getPageMargins()}</style>
          <div className="pdfPage">
            <div className="pdfPage__container">
              <div className="pdfPage__content">
                <div className="pdfPage__top">
                  <div className="pdfPage__top--left">
                    {/* <div className="header__logo--item">
                      <p>
                        <span>Akfa</span>
                        med farm
                      </p>
                    </div> */}
                    <p className="pdfPage__top--leftText">
                      Коммерческое предложение
                    </p>
                  </div>
                  <div className="pdfPage__top--right">
                    <p>Заказчик: {firstName}</p>
                    <p>Номер телефона: {phoneNumber}</p>
                  </div>
                </div>
                <div className="pdfPage__table">
                  <div className="pdfPage__left">
                    <table>
                      <tr>
                        <th>Товар</th>
                        <th></th>

                        <th>Кол-во</th>
                        <th>Цена</th>
                      </tr>
                      {items.map((el) => {
                        return (
                          <tr>
                            <td>{el.title}</td>
                            <td>
                              <img src={el.image} alt="" />
                            </td>
                            <td>{el.quantity}</td>
                            <td>{el.discount_price} сом</td>
                          </tr>
                        );
                      })}
                    </table>
                  </div>

                  <div className="pdfPage__right">
                    <div className="pdfPage__total">
                      {/* <div> */}
                      <ul>
                        <li>
                          <p>Всего товаров</p>

                          <span>{totalUniqueItems}</span>
                        </li>
                        <li>
                          <p>Cумма</p>

                          <span>{cartTotal.toFixed(2)}</span>
                        </li>
                        <li>
                          <p>Итого:</p>

                          <span>{cartTotal.toFixed(2)}</span>
                        </li>
                      </ul>
                      {/* </div> */}
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function HtmlToPdf({ text, style, setActive_kp, firstName, phoneNumber }) {
  const { totalUniqueItems, items, cartTotal } = useCart();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div style={{ display: "none" }}>
        <ComponentToPrint
          items={items}
          totalUniqueItems={totalUniqueItems}
          cartTotal={cartTotal}
          ref={componentRef}
          firstName={firstName}
          phoneNumber={phoneNumber}
        />
      </div>
      <div>
        <button
          onClick={() => {
            handlePrint();
            setActive_kp(false);
          }}
          style={style}
        >
          {text}
        </button>
      </div>
    </div>
  );
}

export default HtmlToPdf;
