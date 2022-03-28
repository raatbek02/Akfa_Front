import React from "react";
import "./Char.css";

function Char({ oneProduct }) {
  console.log("oneProduct.characteristics", oneProduct.characteristics);
  return (
    <div className="char">
      <div className="char__content">
        <ul>
          {oneProduct.characteristics &&
            oneProduct.characteristics.map((el) => {
              return (
                <li key={el.id}>
                  <div className="char__titles">{el.title}</div>
                  <div className="char__values">{el.meaning}</div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default Char;
