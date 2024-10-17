import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { get, post } from "../../../../utils/httpRequest";
function Infor( ) {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [inforUser, setInforUser] = useState({
    fullname: "",
    phone: "",
  });
  const [count, setCount] = useState({});
  const [totalAmount, setTotalAmount] = useState();

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [note, setNote] = useState();
  const [paymentMethod, setPaymentMethod] = useState();

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeAddress = (e) => setAddress(e.target.value);
  const handleChangePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handleChangeNote = (e) => setNote(e.target.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get("/v1/orders");
        if (res.code === 200) {
          const data = await res.data;
          setCart(data.productsCarts);
          setInforUser(data.infoCustomer);
          setPaymentMethod(data.paymentMethod);
          console.log("data", data);

          setTotalAmount(data.subTotal);
          setName(data.infoCustomer.fullname);
          setPhoneNumber(data.infoCustomer.phone);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let idUser = localStorage.getItem("idUser");
    const formData = new FormData(e.target);
    // check bank or cod
    const option = formData.get("option");
    let res = await post("/v1/orders", {
      paymentMethodId: formData.get("option"),
      subTotal: totalAmount,
      note: formData.get("note"),
      address: formData.get("address"),
    });
    if (option === "66ca30d1c37e09747718df8a") {
      let response = await post("/v1/orders/momo", {
        orderId: res.data._id,
      });
      let url = response.data.shortLink;
      if (url) {
        window.location.href = url;
      } else {
        alert("Thanh toán thất bại");
      }
    } else {
      navigate("/order/payment?orderId=123&paymentMethod=cod");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get("/v1/carts");
        const data = res.data.products;

        const cartWithProductDetails = await Promise.all(
          data.map(async (item) => {
            const productRes = await get(`/v1/products/${item.productId}`);
            const productDetails = productRes.data;
           
            return {
              ...item,
              productDetails, 
            };
          })
        );

        setCart(cartWithProductDetails); 
        console.log(setCart(cartWithProductDetails)); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    console.log(cart);
    fetchData();
  }, []);
  return (
    <>
      <table className="table" style={{ width: "720px" }}>
        <thead>
          <tr className="thcol">
            <th scope="col" className="thcoll">
              Sản Phẩm
            </th>
            <th scope="col" className="thcoll">
              Tên Sản Phẩm
            </th>
            <th scope="col" className="thcoll">
              Đơn Giá
            </th>
            <th scope="col" className="thcoll">
              Số Lượng
            </th>
            <th scope="col" className="thcoll">
              Tạm tính
            </th>
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
      <td style={{ width: "200px" }}>
        <img
          src={productInfo.image}
          width="100px"
          height="100px"
          alt={productInfo.productName}
        />
      </td>
      <td style={{ width: "200px" }} className="namecoll">
        <div style={{ fontSize: '20px',  color: '#83bb3e' }}>
          {productInfo.productName}
        </div>
      </td>
      <td className="tdcoll">
        {unitPrice ? unitPrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }) : "N/A"}
      </td>
      <td className="tdcoll">
        <div className="counter-container">
         
          <input
            style={{ borderRadius: "5px" }}
            className="counter-input"
            type="number"
            min="1"
            max="10"
            value={Math.min(Math.max(product.quantity, 1), 10)}
            disabled
          />
          
        </div>
      </td>
      <td className="tdcoll">
        {(unitPrice * product.quantity).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </td>
      
    </tr>
  );
  
})}


        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          flexWrap: "wrap",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
              width: "720px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ width: "100%" }}>
              <label
                for="exampleInput"
                className="form-label"
                style={{
                  fontSize: "25px",
                  color: " #20242e",
                  textTransform: "uppercase",
                  fontWeight: "700",
                }}
              >
                THÔNG TIN THANH TOÁN
              </label>
            </div>
            <div style={{ width: "100%" }}>
              <label
                for="exampleInput"
                className="form-label"
                style={{
                  fontSize: "17px",
                  color: " #20242e",
                  textTransform: "uppercase",
                  fontWeight: "700",
                }}
              >
                Họ Tên
              </label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={handleChangeName}
              />
            </div>
            <div style={{ width: "100%" }}>
              <label
                for="exampleInput"
                className="form-label"
                style={{
                  fontSize: "17px",
                  color: " #20242e",
                  textTransform: "uppercase",
                  fontWeight: "700",
                }}
              >
                Địa Chỉ
              </label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={address}
                onChange={handleChangeAddress}
              />
            </div>
            <div style={{ width: "100%" }}>
              <label
                for="exampleInput"
                className="form-label"
                style={{
                  fontSize: "17px",
                  color: " #20242e",
                  textTransform: "uppercase",
                  fontWeight: "700",
                }}
              >
                Số Điện Thoại
              </label>

              <input
                type="text"
                className="form-control"
                name="phone"
                value={phoneNumber}
                onChange={handleChangePhoneNumber}
              />
            </div>
            <div style={{ width: "100%" }}>
              <label
                for="exampleInput"
                className="form-label"
                style={{
                  fontSize: "17px",
                  color: " #20242e",
                  textTransform: "uppercase",
                  fontWeight: "700",
                }}
              >
                Ghi Chú
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Ghi chú  về đơn hàng!"
                rows="3"
                name="note"
                onChange={handleChangeNote}
                value={note}
              ></textarea>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              alignItems: "flex-start",
              placeSelf: "normal",
            }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{
                      fontSize: "25px",
                      color: " #20242e",
                      textTransform: "uppercase",
                      fontWeight: "700",
                    }}
                  >
                    Đơn Hàng Của Bạn
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="thcoll">
                    Sản Phẩm
                  </th>
                  <th scope="col" className="tdcolll ">
                    Tạm Tính
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="col" className="thcoll">
                    Tạm Tính
                  </th>
                  <th scope="col" className="tdcolll">
                    {totalAmount} đ
                  </th>
                </tr>
                <tr>
                  <th scope="row" className="thcoll">
                    Tổng
                  </th>
                  <td className="tdcolll">{totalAmount} đ</td>
                </tr>
                {paymentMethod && (
                  <tr>
                    {paymentMethod.map((payment) => (
                      <th>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="option"
                            id="exampleRadios1"
                            value={payment._id}
                            checked
                          />
                          <label
                            className="form-check-label"
                            for="exampleRadios1"
                          >
                            {payment.methodName}
                          </label>
                        </div>
                      </th>
                    ))}
                  </tr>
                )}
              </tbody>
              <center>
                <button
                  type="submit"
                  className="btn btn"
                  style={{
                    backgroundColor: "#83bb3e",
                    width: "250px",
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "#fff",
                    marginTop: "30px",
                  }}
                >
                  Đặt Hàng
                </button>
              </center>
            </table>
          </div>
        </form>
      </div>
    </>
  );
}
export default Infor;
