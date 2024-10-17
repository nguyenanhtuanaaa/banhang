import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { get, post } from "../../../utils/httpRequest";
import Swal from "sweetalert2"; 
function NewAdminProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [origin, setOrigin] = useState("");
  const [image, setImage] = useState(""); 

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleOriginChange = (event) => setOrigin(event.target.value);
  const handleImageChange = (event) => setImage(event.target.value);

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

  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log(category);
    
    try {
      const response = await post(`admin/products`, {
        productName: name,
        description: description,
        origin: origin,
        price: price,
        categoryId: category, 
        sold: 0,
        image: image,
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
          title: "Thêm sản phẩm thành công!",
        });
        navigate("/admin/adminproduct");
      } else {
        console.error("Lỗi khi thêm dữ liệu");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  };
  

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <>
      <div style={{ padding: "30px" }}>
        <h3> Thêm sản phẩm mới</h3>
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
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
            Hình Ảnh
          </label>
          <div className="col-sm-4">
            <input
              type="text" 
              className="form-control"
              placeholder="Nhập đường dẫn hình ảnh..."
              onChange={handleImageChange} 
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
            Nguồn gốc
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
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
              style={{ fontWeight: "500" }}
              className="form-control"
              onChange={handlePriceChange}
              placeholder="Giá"
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
              onChange={handleDescriptionChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
            Danh mục
          </label>
          <div className="col-sm-4">
            {categoryList.length > 0 && (
              <select className="form-control" onChange={handleCategoryChange}>
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
          Thêm sản phẩm
        </button>
      </div>
    </>
  );
}

export default NewAdminProduct;
