import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteMethod, get } from "../../../utils/httpRequest";

function AdminBlog() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await get(`/admin/posts?page=${currentPage}`);
        console.log(response);

        if (response.code === 200) {
          const data = await response.data.posts;
          setTotalPage(response.data.paginate.totalPages);
          setBlogs(data);
          setFilteredBlogs(data);
        } else {
          console.error("Lỗi khi lấy dữ liệu blog");
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu:", error);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  useEffect(() => {
    setFilteredBlogs(
      blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, blogs]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa blog này?")) {
      try {
        const response = await deleteMethod(`/admin/posts/${id}`);
        console.log("response delete", response);

        if (response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        setBlogs(blogs.filter((blog) => blog._id !== id));
        setFilteredBlogs(filteredBlogs.filter((blog) => blog._id !== id));
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
        console.log(`Blog with id ${id} deleted successfully`);
      } catch (error) {
        console.error(
          `There was an error deleting the blog with id ${id}!`,
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
          <Link to={"/admin/newblog"}>
            <button className="btn btn-primary">
              <i className="fa-solid fa-plus"></i> Thêm tin tức
            </button>
          </Link>
        </div>

        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Tên</th>
                <th scope="col">Hình Ảnh</th>
                <th scope="col">Mô Tả</th>
                <th scope="col">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <tr key={blog._id}>
                    <td
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        width: "300px",
                      }}
                    >
                      {blog.title}
                    </td>
                    <td>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        style={{ width: "100px", height: "auto" }}
                      />
                    </td>
                    <td
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        width: "700px",
                      }}
                    >
                      {blog.content}
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: "15px",
                          alignItems: "center",
                        }}
                      >
                        <Link to={`/admin/updateblog/${blog._id}`}>
                          <i
                            className="fa-solid fa-edit"
                            style={{ fontSize: "20px" }}
                          ></i>
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
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
                  <td colSpan="4">Không Tìm Thấy Blog!</td>
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

export default AdminBlog;
