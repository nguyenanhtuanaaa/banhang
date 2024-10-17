import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { get, post } from "../../../../utils/httpRequest";

const OrderSuccess = () => {
  // get the order id from the URL using the useLocation hook
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");
  const orderIdpayment = queryParams.get("orderIdpayment");
  const paymentMethod = queryParams.get("paymentMethod");
  console.log("orderId", orderId);
  console.log("paymentMethod", paymentMethod);
  const [orderStatus, setOrderStatus] = useState("Order Placed");
  const [paymentStatus, setPaymentStatus] = useState("Đặt hàng thành công");

  useEffect(() => {
    const checkStatusMoMoGateway = async () => {
      if (!orderId) {
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
          icon: "error",
          title: "Order Id not found!",
        });
        return;
      }
      const res = await post("/v1/orders/momo/check", {
        orderId,
      });
      if (res.code === 200) {
        const changeStatus = await post("/v1/orders/momo/callback", {
          orderIdpayment,
        });
      }

      // if (data.data.resultCode === 0) {
      //   setPaymentStatus("Đặt hàng thành công");
      // } else {
      //   setPaymentStatus("Đặt hàng không thành công");
      // }
    };
    if (paymentMethod === "cod") {
      setPaymentStatus("Đặt hàng không thành công");
      setOrderStatus("Success");
    } else {
      checkStatusMoMoGateway();
    }
  }, [orderId, paymentMethod]);

  const handleButtonLick = () => {
    window.location.href = "/";
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        padding: "50px",
        fontSize: "1.5rem",
        fontWeight: "500",
        margin: "auto",

        minwidth: "100vw",
        minHeight: "58vh",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <FaCheckCircle color="#228B22" />
          <p
            style={{
              padding: "0",
              fontSize: "40px",
              margin: "0",
            }}
          >
            {paymentStatus}
          </p>
        </div>
        <p></p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "50px",
            justifyContent: "center",
            gap: "20px",
            fontSize: "1.5rem",
          }}
        >
          <button
            onClick={handleButtonLick}
            className="textbutton nav__login"
            style={{
              backgroundColor: "#3c6",
              color: "white",
            }}
          >
            Trang chủ
          </button>
          <button
            className="textbutton nav__login"
            style={{ backgroundColor: "#3c6", color: "white", margin: "0" }}
          >
            Đơn hàng của tôi
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
