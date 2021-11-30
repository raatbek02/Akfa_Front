import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Category.css";

function Category() {
	const [category, setCategory] = useState([])
	console.log(category);
  const navigate = useNavigate();

	useEffect(() => {
		const getCategories = async () => {
			await axios
        .get(`http://127.0.0.1:8000/api/categories/`)
        .then(({ data }) => {
          setCategory(data);
        });
		};
		getCategories()
	},[])
  return (
    <div className="category">
      <div className="category__container">
        <div className="category__title">
          <div className="category__title--line"></div>
          <h2>Категории</h2>
          <div className="category__title--line"></div>
        </div>
        <div className="show_click">
          <span> Показать все</span>
        </div>
        <ul className="category__content">
          {category.map((obj) => {
            return (
              <li
                onClick={() => navigate(`categoriesPage/${obj.id}`)}
                key={obj.id}
                className="category__item"
              >
                <p>{obj.title}</p>
                <img src={obj.image} alt="No img" />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Category;
