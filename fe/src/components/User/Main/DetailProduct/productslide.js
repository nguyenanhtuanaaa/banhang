import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductSlide({ productId }) {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3030/v1/products");
        const result = await res.json();
        console.log(result);

        if (result.data && Array.isArray(result.data.products)) {
          setProducts(result.data.products);
        } else {
          console.error("Unexpected data format:", result);
        }
      } catch (error) {
        console.error("Lỗi dữ liệu!!", error);
      }
    };

    fetchData();
  }, []);

  const productGroups = [];
  for (let i = 0; i < products.length; i += productsPerPage) {
    productGroups.push(products.slice(i, i + productsPerPage));
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productGroups.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + productGroups.length) % productGroups.length
    );
  };

  return (
    <div style={{ width: "100%", margin: "20px auto", marginBottom: "50px" }}>
      <h2 style={{ padding: "10px 0 10px 20px", fontSize: "40px" }}>
        SẢN PHẨM KHÁC
      </h2>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          {productGroups.map((group, groupIndex) => (
            <div
              className={`carousel-item ${
                groupIndex === currentIndex ? "active" : ""
              }`}
              key={groupIndex}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                {group.map((item) => {
                  const discountedPrice = item.price * 0.7;

                  return (
                    <div style={{ width: "18rem" }} key={item.id}>
                      <center>
                        <img
                          src={item.image}
                          height="245px"
                          width="245px"
                          alt={item.name}
                          style={{ objectFit: "cover" }}
                        />
                      </center>
                      <div className="card-body">
                        <center>
                          <Link
                            to={`/detail-product/${item._id}`}
                            className="card-title cardtitle"
                            style={{ color: "#83bb3e", fontSize: "24px" }}
                          >
                            {item.productName}
                          </Link>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "15px",
                            }}
                          >
                            <p>
                              <del className="carddel">
                                {item.price.toLocaleString()}đ
                              </del>
                            </p>
                            <p
                              className="carddel"
                              style={{ fontWeight: "bold" }}
                            >
                              {discountedPrice.toLocaleString()}đ
                            </p>
                          </div>
                        </center>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
          onClick={handlePrevious}
          style={{
            backgroundColor: "#808080",
            height: "60px",
            borderRadius: "50%",
            marginTop: "7%",
            marginBottom: "10%",
            width: "60px",
            marginLeft: "115px",
          }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
          onClick={handleNext}
          style={{
            backgroundColor: "#808080",
            height: "60px",
            borderRadius: "50%",
            marginTop: "7%",
            marginBottom: "10%",
            width: "60px",
            marginRight: "115px",
          }}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default ProductSlide;
