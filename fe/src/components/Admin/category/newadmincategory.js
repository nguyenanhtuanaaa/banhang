import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Make sure this line is present
import { post } from "../../../utils/httpRequest";

function NewAdminCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleSubmit = async () => {
    try {
      const response = await post("admin/categories", {
        categoryName: name,
        description: description,
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
          title: "Thêm danh mục thành công!",
        });
        navigate("/admin/admincategory");
        setName("");
        setDescription("");
      } else {
        const errorText = await response.text();
        console.error("Lỗi khi thêm người dùng:", errorText);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h3> Thêm danh mục mới</h3>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
          Tên Danh Mục
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            onChange={handleNameChange}
            style={{ fontWeight: "500" }}
            placeholder="Nhập tên danh mục..."
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
          Mô tả
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            onChange={handleDescriptionChange}
            style={{ fontWeight: "500" }}
            placeholder="Nhập mô tả danh mục..."
          />
        </div>
      </div>
      <Link to="/admin/admincategory">
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
        onClick={handleSubmit}
        className="btn btn-primary"
        style={{ fontWeight: "900" }}
      >
        Thêm danh mục
      </button>
    </div>
  );
}

export default NewAdminCategory;
