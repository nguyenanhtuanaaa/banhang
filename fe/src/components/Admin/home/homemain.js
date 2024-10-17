import { Bar } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
function HomeMain() {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProductCount(data.length);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUserCount(data.length);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategoryCount(data.length);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        setBlogCount(data.length);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        setOrderCount(data.length);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  const data = {
    labels: ["Tài khoản", "Danh mục", "Sản phẩm", "Bài viết", "Đơn hàng"],
    datasets: [
      {
        label: "Số lượng",
        data: [userCount, categoryCount, productCount, blogCount, orderCount],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <h1>Trang chủ</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginLeft: "30px",
        }}
      >
        {/* User Info */}
        <div
          style={{
            width: "23%",
            fontSize: "80px",
            display: "flex",
            gap: "50px",
            color: "#ffffff",
            backgroundColor: "#007bff",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <i className="fa-solid fa-users"></i>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <h5> Tài Khoản</h5>
            <h5> {userCount}</h5>
          </div>
        </div>
        {/* Categories Info */}
        <div
          style={{
            width: "23%",
            fontSize: "80px",
            display: "flex",
            gap: "50px",
            color: "#ffffff",
            backgroundColor: "#6c757d",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <i className="fa-solid fa-bars-progress"></i>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <h5> Danh mục</h5>
            <h5> {categoryCount}</h5>
          </div>
        </div>
        {/* Products Info */}
        <div
          style={{
            width: "23%",
            fontSize: "80px",
            display: "flex",
            gap: "50px",
            color: "#ffffff",
            backgroundColor: "#28a745",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <i className="fa-solid fa-inbox"></i>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <h5> Sản phẩm</h5>
            <h5>{productCount}</h5>
          </div>
        </div>
        {/* Blogs Info */}
        <div
          style={{
            width: "23%",
            fontSize: "80px",
            display: "flex",
            gap: "50px",
            color: "#ffffff",
            backgroundColor: "#dc3545",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <i className="fa-solid fa-pen-to-square"></i>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <h5>Bài viết</h5>
            <h5> {blogCount}</h5>
          </div>
        </div>
        {/* Orders Info */}
        <div
          style={{
            width: "23%",
            fontSize: "80px",
            display: "flex",
            gap: "50px",
            color: "#ffffff",
            backgroundColor: "#ffc107",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <i className="fa-solid fa-truck-fast"></i>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <h5> Đơn hàng</h5>
            <h5> {orderCount}</h5>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div
        style={{
          width: "800px",
          height: "400px",
          margin: "0 auto",
          marginTop: "100px",
        }}
      >
        <h3 style={{ textAlign:'center'}}>Biểu đồ thống kê dữ liệu</h3>
        <Bar data={data} options={options} />
      </div>
    </>
  );
}

export default HomeMain;
