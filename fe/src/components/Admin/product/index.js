import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteMethod, get } from "../../../utils/httpRequest";

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await get(
          `admin/products?page=${currentPage}&limit=5`
        );
        console.log(response, "response");

        if (response.code === 200) {
          const data = await response.data.data;
          setTotalPage(response.data.paginate.totalPages);
          setProducts(data);
          setFilteredProducts(data);
        } else {
          console.error("Lỗi khi lấy dữ liệu sản phẩm");
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu:", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const response = await deleteMethod(`/admin/products/${id}`);
        if (response.code !== 200) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        console.log(response)
        
        setProducts(products.filter((product) => product._id !== id));
        setFilteredProducts(
          filteredProducts.filter((product) => product._id !== id)
        );
  
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Xóa thành công!",
        });
      } catch (error) {
        console.error(`There was an error deleting the product with id ${id}!`, error);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "Không thể xóa sản phẩm. Vui lòng thử lại!",
        });
      }
    }
  };
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                borderRadius: "6px",
                border: "1px solid #777777",
                paddingRight: "30px",
                height: "38px",
              }}
            />
            <i
              className="fa-solid fa-magnifying-glass"
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
              }}
            ></i>
          </div>
          <Link to={"/admin/newadminproduct"}>
            <button className="btn btn-primary">
              <i className="fa-solid fa-plus"></i> Thêm sản phẩm
            </button>
          </Link>
        </div>

        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Tên</th>
                <th scope="col">Hình Ảnh</th>
                <th scope="col">Giá</th>
                <th scope="col">Mô Tả</th>
                <th scope="col">Số Lượng</th>
                <th scope="col">Danh Mục</th>
                <th scope="col">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td style={{ fontSize: "18px", fontWeight: "500", whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'100px' }}>
                      {product._id}
                    </td>
                    <td style={{ fontSize: "18px", fontWeight: "500", whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'200px' }}>
                      {product.productName}
                    </td>
                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: "100px", height: "auto" }}
                      />
                    </td>
                    <td style={{ fontSize: "18px", fontWeight: "500" }}>
                      {product.price}
                    </td>
                    <td style={{ fontSize: "18px", fontWeight: "500",whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'200px' }}>
                      {product.description}
                    </td>
                    <td style={{ fontSize: "18px", fontWeight: "500" }}>
                      {product.quantity}
                    </td>
                    <td style={{ fontSize: "18px", fontWeight: "500" }}>
                    {product.category.categoryName}
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: "15px",
                          alignItems: "center",
                        }}
                      >
                        <Link to={`/admin/updateadminproduct/${product._id}`}>
                          <i
                            className="fa-solid fa-edit"
                            style={{ fontSize: "20px" }}
                          ></i>
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            className="fa-solid fa-trash"
                            style={{ fontSize: "20px", color: "red" }}
                          ></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">Không tìm thấy dữ liệu!!</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Phân trang*/}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <nav>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Trước
                  </button>
                </li>
                {[...Array(totalPage).keys()].map((page) => (
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
                    currentPage === totalPage ? "disabled" : ""
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
      </div>
    </>
  );
}

export default AdminProduct;
