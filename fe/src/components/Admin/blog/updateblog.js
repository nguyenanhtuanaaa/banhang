import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { get, put } from "../../../utils/httpRequest";
import Swal from "sweetalert2"; 
function UpdateAdminBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(""); // Handling image as text (URL)
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await get(`/admin/posts/${id}`);

        if (response.code === 200) {
          const data = response.data.post;
          setTitle(data.title);
          setContent(data.content);
          setImage(data.image); // Set the image URL from the response
        } else {
          console.error("Lỗi khi lấy dữ liệu bài viết");
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleImageChange = (event) => setImage(event.target.value); // Handle as text input
  const handleContentChange = (event) => setContent(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await put(`/admin/posts/${id}`, {
        title: title,
        content: content,
        image: image, // Send image URL as part of the request body
      });

      if (response.code === 200) {
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
          title: "Bài viết đã được cập nhật thành công!",
        });
        console.log("Bài viết đã được cập nhật thành công!");
        navigate("/admin/adminblog");
      } else {
        const errorText = await response.text();
        console.error("Lỗi khi cập nhật bài viết:", errorText);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu cập nhật:", error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h3>Cập nhật bài viết</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label
            className="col-sm-2 col-form-label"
            style={{ fontWeight: "900" }}
          >
            Tên bài viết
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              style={{ fontWeight: "500" }}
              placeholder="Nhập tên bài viết..."
              value={title}
              onChange={handleTitleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            className="col-sm-2 col-form-label"
            style={{ fontWeight: "900" }}
          >
            Hình Ảnh (URL)
          </label>
          <div className="col-sm-4">
            <input
              type="text" // Changed input type to text
              className="form-control"
              style={{ fontWeight: "500" }}
              placeholder="Nhập URL hình ảnh..."
              value={image} // Bind the image URL
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            className="col-sm-2 col-form-label"
            style={{ fontWeight: "900" }}
          >
            Mô Tả
          </label>
          <div className="col-sm-4">
            <textarea
              className="form-control"
              style={{ fontWeight: "500", height: "300px" }}
              placeholder="Mô tả"
              value={content}
              onChange={handleContentChange}
            />
          </div>
        </div>
        <Link to="/admin/adminblog">
          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginRight: "20px" }}
          >
            Trở về
          </button>
        </Link>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ fontWeight: "900" }}
        >
          Cập nhật bài viết
        </button>
      </form>
    </div>
  );
}

export default UpdateAdminBlog;
