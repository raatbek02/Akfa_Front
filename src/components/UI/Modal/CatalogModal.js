import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalCatalog } from "../../../store/modalCatalog";
import "./CatalogModal.css";

function CatalogModal({ active, setActive, children }) {
  const dispatch = useDispatch();
  const modalCatalog = useSelector((s) => s.modalCatalog.modalCatalog);

  useEffect(() => {
    const html = document.querySelector("html");
    html.style.overflowY = active ? "hidden" : "auto";
  }, [active]);

  return (
    <div
      className={modalCatalog ? "catalogModal active" : "catalogModal"}
      onClick={() => dispatch(setModalCatalog(!modalCatalog))}
    >
      <div
        className={
          modalCatalog
            ? "catalogModal__content active"
            : "catalogModal__content"
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default CatalogModal;
