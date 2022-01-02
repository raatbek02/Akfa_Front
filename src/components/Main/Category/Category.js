import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CATEGORIES_PAGE_ROUTE } from "../../../utils/consts";
import "./Category.css";
import modalCatalog_img from "../../../assets/images/new_design/modalCatalog_img.png";
import { useDispatch } from "react-redux";
import {
  setModalCatalog,
  setSubCategory_id,
} from "../../../store/modalCatalog";

function Category() {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeSubCategory, setActiveSubCategory] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("Catalog category", category);
  console.log("Catalog subcategory", subCategory);

  useEffect(() => {
    const getCategories = async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/categories/`)
        .then(({ data }) => {
          setCategory(data);
        });
    };
    getCategories();
  }, []);

  const getSubcategories = async (id) => {
    await axios
      .get(`http://127.0.0.1:8000/api/subcategory?categories=${id}`)
      .then(({ data }) => {
        setSubCategory(data);
      });
  };

  return (
    <div className="category">
      <div className="category__content">
        <div className="category__left">
          <ul>
            {category.map((obj) => {
              return (
                <li
                  key={Date.now() * obj.id}
                  onClick={() => {
                    getSubcategories(obj.id);
                    setActiveCategory(obj.id);
                  }}
                  className={obj.id === activeCategory ? "" : ""}
                >
                  {obj.title}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="category__middle">
          <ul>
            {subCategory.map((obj) => {
              return (
                <li
                  onClick={() => {
                    navigate(`${CATEGORIES_PAGE_ROUTE}/${obj.categories}`);
                    setActiveSubCategory(obj.id);
                    dispatch(setModalCatalog(false));
                    dispatch(setSubCategory_id(obj.id));
                    localStorage.setItem("subCategory_ID", obj.id);
                  }}
                  key={Date.now() * obj.id}
                  className={activeSubCategory === obj.id ? "" : ""}
                >
                  {obj.title}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="category__right">
          <div className="category__right--img">
            <img src={modalCatalog_img} alt="No img" />;
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;

//   return (
//     <div className="category">
//       <div className="category__container">
//         <div className="category__title">
//           <div className="category__title--line"></div>
//           <h2>Категории</h2>
//           <div className="category__title--line"></div>
//         </div>
//         <div className="show_click">
//           <span> Показать все</span>
//         </div>
//         <ul className="category__content">
//           {category.map((obj) => {
//             return (
//               <li
//                 onClick={() => navigate(`${CATEGORIES_PAGE_ROUTE}/${obj.id}`)}
//                 key={obj.id}
//                 className="category__item"
//               >
//                 <p>{obj.title}</p>
//                 <img src={obj.image} alt="No img" />
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
