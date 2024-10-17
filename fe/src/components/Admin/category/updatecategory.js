import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { get, put } from "../../../utils/httpRequest";
import Swal from "sweetalert2"; 
function UpdateAdminCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryName, setName] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await get(`admin/categories/${id}`);
        console.log("API Response:", response); 

        if (response.code === 200) { 
          const data = response.data; 
          setName(data.categoryName); 
        } else {
          console.error("Lỗi khi lấy dữ liệu danh mục", response.code);
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu:", error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleNameChange = (event) => setName(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await put(`admin/categories/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( categoryName ),
      });
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
        title: "Danh mục đã được cập nhật thành công!",
      });
      console.log("Danh mục đã được cập nhật thành công!", );
      navigate("/admin/admincategory");
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu cập nhật:", error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h3>Cập nhật danh mục</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
            Tên Danh Mục
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              style={{ fontWeight: "500" }}
              placeholder="Nhập tên danh mục..."
              value={categoryName}
              onChange={handleNameChange}
            />
          </div>
        </div>
        <Link to="/admin/admincategory">
          <button type="button" className="btn btn-secondary" style={{ marginRight: "20px" }}>
            Trở về
          </button>
        </Link>

        <button type="submit" className="btn btn-primary" style={{ fontWeight: "900" }}>
          Cập nhật danh mục
        </button>
      </form>
    </div>
  );
}

export default UpdateAdminCategory;
