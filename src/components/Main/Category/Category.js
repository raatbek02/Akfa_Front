import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { CATEGORIES_PAGE_ROUTE } from "../../../utils/consts";
import {
  setModalCatalog,
  setSubCategory_id,
} from "../../../store/modalCatalog";
import "./Category.css";
import { $host } from "../../../http";

function Category() {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [activeSubCategory, setActiveSubCategory] = useState("");
  const [onMouse_id, setOnMouse_id] = useState(1);
  const [onMouse_categoryImage, setOnMouse_categoryImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      await $host.get(`api/categories/`).then(({ data }) => {
        setCategory(data);
      });
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getSubcategories = async () => {
      await $host
        .get(`api/subcategory?categories=${onMouse_id}`)
        .then(({ data }) => {
          setSubCategory(data);
        });
    };
    getSubcategories();
  }, [onMouse_id]);

  return (
    <div className="category">
      <div className="category__content">
        <div className="category__left">
          <ul>
            {category.map((obj) => {
              return (
                <li>
                  <button
                    key={obj.id}
                    onMouseOver={() => {
                      setOnMouse_id(obj.id);
                      setOnMouse_categoryImage(obj.image);
                    }}
                    onClick={() => {
                      setOnMouse_id(obj.id);
                      //   setActiveCategory(obj.id);
                    }}

                    // className={obj.id === activeCategory ? "" : ""}
                  >
                    {obj.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="category__middle">
          <ul>
            {subCategory.map((obj) => {
              return (
                <li>
                  <button
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
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="category__right">
          <div className="category__right--img">
            <img src={onMouse_categoryImage} alt="No img" />;
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
