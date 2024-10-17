import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { get, put } from "../../../utils/httpRequest";
import Swal from "sweetalert2"; 
function UpdateAdminProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState(""); // Treating image as text (URL)
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [origin, setOrigin] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const getCategoryList = async () => {
    try {
      const response = await get(`admin/categories`);
      if (response.code === 200) {
        const data = await response.data.categories;
        setCategoryList(data);
      } else {
        console.error("Lỗi khi lấy dữ liệu danh mục");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await get(`admin/products/${id}`);
        if (response.code === 200) {
          const data = await response.data;
          setName(data.productName);
          setPrice(data.price);
          setOrigin(data.origin);
          setDescription(data.description);
          setCategory(data.categoryId);
          setImage(data.image); // Set the image URL
        } else {
          console.error("Lỗi khi lấy dữ liệu sản phẩm");
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleImageChange = (event) => setImage(event.target.value); // Text input for image URL
  const handlePriceChange = (event) => setPrice(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleOriginChange = (event) => setOrigin(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Since image is text, send it as part of the payload directly
    try {
      const response = await put(`admin/products/${id}`, {
        productName: name,
        description: description,
        image: image, // Image as URL (text)
        price: price,
        origin: origin,
        categoryId: category,
        sold: 0,
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
          title: "Sản phẩm đã được cập nhật thành công!",
        });
        console.log("Sản phẩm đã được cập nhật thành công!");
        navigate("/admin/adminproduct");
      } else {
        const errorText = await response.text();
        console.error("Lỗi khi cập nhật sản phẩm:", errorText);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu cập nhật:", error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h3>Cập nhật sản phẩm</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
            Tên Sản Phẩm
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              style={{ fontWeight: "500" }}
              placeholder="Nhập tên sản phẩm..."
              value={name}
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
            Hình Ảnh (URL)
          </label>
          <div className="col-sm-4">
            <input
              type="text" // Keeping as text for image URL
              className="form-control"
              placeholder="Nhập URL hình ảnh..."
              value={image} // Binding the image URL
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
            Nguồn gốc
          </label>
          <div class="col-sm-4">
            <input
              type="text"
              value={origin}
              class="form-control"
              style={{ fontWeight: "500" }}
              placeholder="Nhập nguồn gốc..."
              onChange={handleOriginChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
            Giá
          </label>
          <div className="col-sm-4">
            <input
              type="number"
              className="form-control"
              style={{ fontWeight: "500" }}
              placeholder="Giá"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
            Mô Tả
          </label>
          <div className="col-sm-4">
            <textarea
              className="form-control"
              style={{ fontWeight: "500", height: "300px" }}
              placeholder="Mô tả"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
            Danh mục
          </label>
          <div className="col-sm-4">
            {categoryList && (
              <select
                value={category}
                class="form-control"
                onChange={handleCategoryChange}
              >
                {categoryList.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <Link to="/admin/adminproduct">
          <button
            type="button"
            class="btn btn-secondary"
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
          Cập nhật sản phẩm
        </button>
      </form>
    </div>
  );
}

export default UpdateAdminProduct;
