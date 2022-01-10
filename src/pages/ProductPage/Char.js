import React from "react";
import "./Char.css";

function Char({ oneProduct }) {
  return (
    <div className="char">
      <div className="char__content">
        <ul>
          {oneProduct.chars.map((el) => {
            return (
              <li key={el.id}>
                <div className="char__titles">{el.title}</div>
                <div className="char__values">{el.value}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Char;
