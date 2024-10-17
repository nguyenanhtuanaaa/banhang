import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../../utils/httpRequest";
import Swal from "sweetalert2"; 
function NewAdminBlog() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); // New state for image URL
  const navigate = useNavigate();

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleImageChange = (event) => setImage(event.target.value); // Handle image URL input

  const handleSubmit = async () => {
    try {
      const response = await post("admin/posts", {
        title: name,
        content: description,
        image: image, // Send image URL along with the title and content
      });

      if (response.code === 201) {
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
          title: "Thêm bài viết thành công!",
        });
        console.log("Bài viết đã được thêm thành công!");
        navigate("/admin/adminblog");

        // Clear the form after submission
        setName("");
        setDescription("");
        setImage("");
      } else {
        const errorText = await response.text();
        console.error("Lỗi khi thêm Bài viết:", errorText);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  };

  return (
    <>
      <div style={{ padding: "30px" }}>
        <h3>Thêm bài viết mới</h3>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
            Tiêu đề
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              style={{ fontWeight: "500" }}
              placeholder="Nhập tiêu đề..."
              value={name}
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
            Hình ảnh (URL)
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              style={{ fontWeight: "500" }}
              placeholder="Nhập URL hình ảnh..."
              value={image} // Bind the image URL input
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
            Nội dung
          </label>
          <div className="col-sm-4">
            <textarea
              className="form-control"
              style={{ fontWeight: "500", height: "300px" }}
              placeholder="Nội dung"
              value={description}
              onChange={handleDescriptionChange}
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
          type="button"
          className="btn btn-primary"
          style={{ fontWeight: "900" }}
          onClick={handleSubmit}
        >
          Thêm bài viết
        </button>
      </div>
    </>
  );
}

export default NewAdminBlog;
