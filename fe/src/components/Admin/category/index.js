import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get, post, put, deleteMethod } from "../../../utils/httpRequest";
import Swal from "sweetalert2";

function AdminCategory() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 8;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await get(`admin/categories?page=${currentPage}`);
        console.log(response, "response");

        if (response.code === 200) {
          const data = await response.data.categories;
          setTotalPage(response.data.paginate.totalPages);
          setCategories(data);
          setFilteredCategories(data);
        } else {
          console.error("Lỗi khi lấy dữ liệu danh mục");
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu:", error);
      }
    };

    fetchCategories();
  }, [currentPage]);

  useEffect(() => {
    setFilteredCategories(
      categories.filter((category) =>
        category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, categories]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        const response = await deleteMethod(`admin/categories/${id}`);
        if (response.code !== 200) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        setCategories(categories.filter((category) => category._id !== id));
        setFilteredCategories(
          filteredCategories.filter((category) => category._id !== id)
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
        console.log(`Category with id ${id} deleted successfully`);
      } catch (error) {
        console.error(
          `There was an error deleting the category with id ${id}!`,
          error
        );
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
          <Link to={"/admin/newadmincategory"}>
            <button className="btn btn-primary">
              <i className="fa-solid fa-plus"></i> Thêm danh mục
            </button>
          </Link>
        </div>

        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Tên Danh Mục</th>
                <th scope="col">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <tr key={category._id}>
                    <td style={{ fontSize: "18px", fontWeight: "500" }}>
                      {category._id}
                    </td>
                    <td style={{ fontSize: "18px", fontWeight: "500",whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'100px' }}>
                      {category.categoryName}
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: "15px",
                          alignItems: "center",
                        }}
                      >
                        <Link to={`/admin/updateadmincategory/${category._id}`}>
                          <i
                            className="fa-solid fa-edit"
                            style={{ fontSize: "20px" }}
                          ></i>
                        </Link>
                        <button
                          onClick={() => handleDelete(category._id)}
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
                  <td colSpan="3">Không tìm thấy dữ liệu!!</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* phân trang */}
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

export default AdminCategory;
