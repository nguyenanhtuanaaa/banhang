import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { get, post,put } from "../../../../utils/httpRequest";

function Image() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get(`/v1/products/${_id}`);
        if (res.code === 200) {
          const data = await res;
          setProduct(data);
          setSelectedImage(data.data.image);
        } else {
          console.error("Sản phẩm không tìm thấy!");
        }
      } catch (error) {
        console.error("Lỗi dữ liệu:", error);
      }
    };

    fetchData();
  }, [_id]);


const handleIncrease = () => {
  setCount((prevCount) => {
    if (prevCount < product.data.quantity) {
      return prevCount + 1;
    } else {
      return product.data.quantity;
    }
  });
};



  const handleDecrease = () => {
    setCount((prevCount) => Math.max(1, prevCount - 1));
  };

  const handleChange = (event) => {
    const value = Number(event.target.value);
  
    if (value < 1) {
      setCount(1); 
    } else if (value > 10) {
      setCount(10);
    } else {
      setCount(value); 
    }
  };
  

  const handleAddToCart = async () => {
    if (product && product.data) {
      const cartItem = {
        productId: product.data._id,
        quantity: count,
        image: product.data.image,
        price: product.data.price,
        name: product.data.productName,
      };
  
      console.log("Adding to cart:", cartItem);
  
      try {
        const cartResponse = await get("/v1/carts");
        const existingItems = cartResponse.data.products;
  
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const existingItem = existingItems.find(item => item.productId === cartItem.productId);
  
        if (existingItem) {
          // Nếu sản phẩm đã có, cập nhật số lượng
          const newQuantity = existingItem.quantity + count;
          
          // Cập nhật số lượng sản phẩm
          const updateResponse = await put(`/v1/carts/update/${existingItem._id}`, {
            quantity: newQuantity,
          });
          
          if (updateResponse.code === 200) {
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
              title: "Thêm vào giỏ hàng thành công!",
            });
            navigate("/cart");
          } else {
            console.error("Không thể thêm vào giỏ hàng thành công!");
          }
        } else {
          // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
          const res = await post("/v1/carts/add-to-cart", cartItem);
          console.log("Response from add-to-cart API:", res);
          if (res.code === 201) {
            console.log("Thêm vào giỏ hàng thành công!");
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
              title: "Đã Thêm vào giỏ hàng thành công!",
            });
            navigate("/cart");
          } else {
            console.error("Không thể thêm vào giỏ hàng");
          }
        }
      } catch (error) {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
      }
    } else {
      console.error("Sản phẩm không có sẵn hoặc số lượng không hợp lệ");
    }
  };
  

  if (!product) {
    return <div>Loading...</div>;
  }

  const discountedPrice = product.data.price ? product.data.price * 0.7 : 0;

  return (
    <>
      <div
        className="row d-flex justify-content-center align-items-center"
        style={{ width: "100%" }}
      >
        <div
          style={{
            width: "520px",
            border: "1px solid #ebebeb",
            marginLeft: "110px",
          }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <img
                src={selectedImage}
                alt={product.name}
                style={{ width: "500px", height: "500px" }}
              />
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              padding: "20px",
            }}
          >
            {Array.isArray(product.data.sameimage) &&
              product.data.sameimage.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={product.name}
                  width="130px"
                  height="130px"
                  style={{ border: "1px solid #ebebeb", cursor: "pointer" }}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
          </div>
        </div>
        <div style={{ width: "720px", marginBottom: "auto" }}>
          <h2 style={{ fontWeight: "600", textAlign: "left",whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>
            {product.data.productName}
          </h2>
          <div style={{ display: "flex", gap: "20px" }}>
            {product.data.price !== undefined && (
              <p>
                <del className="carddel" style={{ fontSize: "25px" }}>
                  {product.data.price.toLocaleString()}đ
                </del>
              </p>
            )}
            <p
              className="carddel"
              style={{ fontWeight: "bold", fontSize: "25px" }}
            >
              {discountedPrice.toLocaleString()}đ
            </p>
          </div>
          <div>
            <p
              style={{ color: "#777", lineHeight: "25.6px", fontSize: "18px" }}
            >
              {product.data.description}
            </p>
          </div>
          <div>
            <p
              style={{ color: "#777", lineHeight: "25.6px", fontSize: "18px" }}
            >
              <b>Số lượng:</b> {product.data.quantity}
            </p>
          </div>
          <div>
            <p
              style={{
                color: "#7a9c59",
                fontSize: "14.8px",
                fontWeight: "600",
              }}
            >
              Tình trạng:
              {product.data.quantity !== 0 ? (
                <span
                  style={{
                    backgroundColor: "#00923f",
                    color: "#fff",
                    marginLeft: "5px",
                    padding: "5px",
                  }}
                >
                  <i className="fa-solid fa-check"></i> Còn hàng
                </span>
              ) : (
                <span
                  style={{
                    backgroundColor: "#ff0000",
                    color: "#fff",
                    marginLeft: "5px",
                    padding: "5px",
                  }}
                >
                  <i className="fa-solid fa-times"></i> Hết hàng
                </span>
              )}
            </p>
            <div className="counter-container">
              <button
                style={{ borderRadius: "5px" }}
                type="button"
                onClick={handleDecrease}
                className="counter-button"
                disabled={product.quantity === 0}
              >
                -
              </button>
                          <input
              style={{ borderRadius: "5px" }}
              className="counter-input"
              type="number"
              min="1"
              max="10"
              value={count}
              onChange={handleChange}
            />
              <button
                style={{ borderRadius: "5px" }}
                type="button"
                onClick={handleIncrease}
                className="counter-button"
                disabled={product.data.quantity === 0}
              >
                +
              </button>
              <button
                type="button"
                className="btn btn"
                style={{
                  backgroundColor: "#83bb3e",
                  width: "250px",
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "#fff",
                  marginLeft: "30px",
                }}
                onClick={handleAddToCart}
                disabled={product.data.quantity === 0}
              >
                Thêm Vào Giỏ Hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl d-flex justify-content-center align-items-center">
          <div
            className="modal-content"
            style={{ width: "900px", maxHeight: "100vh" }}
          >
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex justify-content-center align-items-center">
              <img
                src={selectedImage}
                alt={product.name}
                style={{ width: "500px", height: "500px" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "76%",
          margin: "0 auto",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
          <button type="button" className="btn btn-success">
            Mô Tả
          </button>
        </div>
        <div>
          <div style={{ border: "1px solid #ebebeb", padding: "20px" }}>
            <p
              style={{ color: "#777", lineHeight: "25.6px", fontSize: "20px" }}
            >
              {product.data.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Image;
