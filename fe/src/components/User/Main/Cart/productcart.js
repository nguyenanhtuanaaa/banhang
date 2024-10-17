import React from "react";
import "./Cart.css";

function ProductCart({
  cart = [], 
  handleIncrease,
  handleDecrease,
  handleChange,
  handleRemove,
  handleUpdateQuantity,
}) {
  if (!cart || cart.length === 0) {
    return <p>Giỏ hàng của bạn đang trống.</p>;
  }

  return (
    <table className="table">
      <thead>
        <tr className="thcol">
          <th scope="col" className="thcoll text-lg-center">Sản Phẩm</th>
          <th scope="col" className="thcoll text-lg-center">Tên</th>
          <th scope="col" className="thcoll text-lg-center">Đơn Giá</th>
          <th scope="col" className="thcoll text-lg-center">Số Lượng</th>
          <th scope="col" className="thcoll text-lg-center">Tạm tính</th>
          <th scope="col" className="thcoll"></th>
        </tr>
      </thead>
      <tbody>
        {cart.map((product) => {
          const unitPrice = product.price;
          const productInfo = product.productDetails;
          if (!productInfo || !productInfo.image || !productInfo.productName) {
            return (
              <tr key={product._id}>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Sản phẩm không tồn tại hoặc đã bị xóa.
                </td>
              </tr>
            );
          }

          return (
            <tr key={product._id} className="tdcol">
              <td style={{ width: "200px" }} className={'text-lg-center'}>
                <img
                  src={productInfo.image}
                  width="100px"
                  height="100px"
                  alt={product.productId.productName}
                />
              </td>
              <td>
                <div
                  style={{
                    width: "70px",
                    fontSize: '17px',
                    textAlign: 'center',
                    marginTop: '35px',
                    color: '#83bb3e',
                  }}
                >
                  {productInfo.productName}
                </div>
              </td>
              <td className="tdcoll">
                {unitPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td className="tdcoll">
                <div className="counter-container">
                  <button
                    style={{ borderRadius: "5px" }}
                    type="button"
                    onClick={() =>
                      handleUpdateQuantity(product._id, product.quantity - 1)
                    }
                    className="counter-button"
                  >
                    -
                  </button>
                  <input
                    style={{ borderRadius: "5px" }}
                    className="counter-input"
                    type="number"
                    min="1"
                    max="10"
                    value={Math.min(Math.max(product.quantity, 1), 10)}
                    onChange={(event) => handleChange(event, product._id)}
                  />
                  <button
                    style={{ borderRadius: "5px" }}
                    type="button"
                    onClick={() =>
                      handleUpdateQuantity(product._id, product.quantity + 1)
                    }
                    className="counter-button"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="tdcoll">
                {(unitPrice * product.quantity).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td className="tdcoll">
                <i
                  className="fa-solid fa-trash"
                  onClick={() => handleRemove(product._id)}
                  style={{ cursor: "pointer" }}
                ></i>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}


export default ProductCart;
