import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { get } from "../../../../utils/httpRequest";

function Products() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get("/v1/products");
        const result = await res;
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

  let filteredProducts = Array.isArray(products) ? products : [];

  // Lọc sản phẩm theo categoryId
  if (categoryId) {
    filteredProducts = filteredProducts.filter(
      (product) => product.categoryId === categoryId
    );
  }

  // Sắp xếp sản phẩm
  switch (sortOption) {
    case "priceAsc":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "default":
        default:
          filteredProducts.sort((a, b) => a.id - b.id);
          break;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: "30px",
          flexWrap: "wrap",
          marginLeft: "30px",
        }}
      >
        <div style={{ marginLeft: "35%" }}>
          <form className="formsle">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={{ borderRadius: "5px", fontSize: "20px" }}
              className="formslect"
            >
              <option value="default">Thứ tự mặc định</option>
              <option value="priceAsc">Thứ tự theo giá: thấp đến cao</option>
              <option value="priceDesc">Thứ tự theo giá: cao xuống thấp</option>
            </select>
          </form>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
        }}
      >
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => {
            const discountedPrice = product.price * 0.7;
            return (
              <Link
                to={`/detail-product/${product._id}`}
                className="card-title cardtitle cardd"
                style={{ color: "#83bb3e" }}
                key={product._id}
              >
                <div className="aaa cardd">
                  <center>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="carddimge"
                      width="247px"
                      height="247px"
                    />
                  </center>
                  <div className="card-body">
                    <center>
                      <p className="card-title" style={{ fontSize: "24px" }}>
                        {product.productName}
                      </p>
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
                            {product.price.toLocaleString()}đ
                          </del>
                        </p>
                        <p
                          className="carddel"
                          style={{ fontWeight: "bold", marginTop: "18px" }}
                        >
                          {discountedPrice.toLocaleString()}đ
                        </p>
                      </div>
                    </center>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p>Không có sản phẩm nào.</p>
        )}
      </div>

      {/* Phân trang */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Trước
              </button>
            </li>
            {[...Array(totalPages).keys()].map((page) => (
              <li
                key={page + 1}
                className={`page-item ${
                  currentPage === page + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Sau
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Products;
