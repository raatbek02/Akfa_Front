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

    return (
      <>
        <div>
          <style>{getPageMargins()}</style>
          <div className="pdfPage">
            <div className="pdfPage__container">
              <div className="pdfPage__content">
                <div className="pdfPage__left">
                  <table>
                    <tr>
                      <th>Товар</th>
                      <th>Количества</th>
                      <th>Цена</th>
                    </tr>
                    {items.map((el) => {
                      return (
                        <tr>
                          <td>{el.title}</td>
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
      </>
    );
  }
}

const styleOfButton = {
  color: "rgba(170, 39, 39, 1)",
  border: "2px solid rgba(170, 39, 39, 1)",
  cursor: "pointer",
  transition: "all 0.3s linear",
};

function HtmlToPdf() {
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
        />
      </div>
      <div>
        <button onClick={handlePrint} style={styleOfButton}>
          Счет на оплату
        </button>
      </div>
    </div>
  );
}

export default HtmlToPdf;
