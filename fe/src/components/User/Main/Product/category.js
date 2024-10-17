import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Product.css";
import Range from "./range";
import Likeproduct from "./likeproduct";
import { Link } from "react-router-dom";

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3030/v1/categories");
        const result = await res.json();
        console.log(result);
        if (result.data && Array.isArray(result.data)) {
          setCategories(result.data);
        } else {
          console.error("Unexpected data format:", result);
        }
      } catch (error) {
        console.error("Lỗi dữ liệu!!", error);
      }
    };

    fetchData();
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <h3 className="h3">Danh mục</h3>
      <div className="list-group" style={{ marginTop: "-8px" }}>
        {categories.map((category, index) => (
          <Link
            to={`/product/products/${category._id}`}
            key={category._id}
            className={`list-group-item list-group-item-action ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {category.categoryName}
          </Link>
        ))}
      </div>

      {/* <div style={{ marginTop: "20px" }}>
        <Range />
      </div> */}
      <div style={{ marginTop: "20px" }}>
        <Likeproduct />
      </div>
    </div>
  );
}

export default Category;
