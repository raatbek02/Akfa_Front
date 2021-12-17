import React, { useEffect } from "react";
import "./Modal.css";

function Modal({ active, setActive, children }) {
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = active ? "hidden" : "auto";
  }, [active]);
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
