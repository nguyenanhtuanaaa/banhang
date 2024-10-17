import "./home.css";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Modal from "react-modal";
import { post } from "../../../utils/httpRequest";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Admin() {
  const [selected, setSelected] = useState("");
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const toggleLogin = () => {
    setIsShowLogin(!isShowLogin);
    console.log(isShowLogin);
  };

  const handleSelect = (item) => {
    setSelected(item);
  };

  const buttonStyle = (item) => ({
    color: selected === item ? "#fff !important" : "#777777 !important",
    backgroundColor: selected === item ? "#007bff" : "transparent",
    fontSize: "20px",
    fontWeight: "500",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    border: "none",
    outline: "none",
    textDecoration: "none",
  });

  const loginAccount = async () => {
    try {
      const response = await post("admin/auth/login", {
        email: email,
        password: password,
      });
      if (response.data.accessToken) {
        Cookies.set("access_token", response.data.accessToken);
        toggleLogin();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    // Remove the access_token cookie
    Cookies.remove('access_token');
    
    // Show a confirmation message
    Swal.fire('Đăng xuất thành công!', 'Bạn đã đăng xuất thành công!', 'success');

    // Redirect the user to the login page
    navigate('/loginadmin');
  };

  return (
    <>
      <Modal
        isOpen={isShowLogin}
        onRequestClose={() => toggleLogin()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Login</h2>
        <form>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="button" onClick={loginAccount}>
            Login
          </button>
          <button type="button" onClick={toggleLogin}>
            Close
          </button>
        </form>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 5px 5px 5px",
        }}
      >
        <div
          style={{
            width: "15%",
            marginBottom: "auto",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              position:'fixed',
              top: 0,
              left: 0,
              zIndex: 1000,
              height: "100vh",
              backgroundColor:'#fff'
           
  
  
          }}

        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <Link to={"/admin"} style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={{
                  color: "#777777 !important",
                  fontSize: "20px",
                  fontWeight: "500",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
                className="btn list-group-item list-group-item-action"
              >
                <img
                  src="https://thucpham4.giaodienwebmau.com/wp-content/uploads/2021/10/lg.png"
                  width={"150px"}
                  height={"80px"}
                />
              </button>
            </Link>
          </div>
          <div style={{ width: "100%" }} className="list-group parent-class">
            <Link to="/admin/adminuser" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={buttonStyle("adminuser")}
                className="btn list-group-item list-group-item-action"
                onClick={() => handleSelect("adminuser")}
              >
                <i className="fa-solid fa-user"></i>Tài Khoản
              </button>
            </Link>
            <Link to="/admin/admincategory" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={buttonStyle("admincategory")}
                className="btn list-group-item list-group-item-action"
                onClick={() => handleSelect("admincategory")}
              >
                <i className="fa-solid fa-bars-progress"></i>Danh Mục
              </button>
            </Link>
            <Link to="/admin/adminproduct" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={buttonStyle("adminproduct")}
                className="btn list-group-item list-group-item-action"
                onClick={() => handleSelect("adminproduct")}
              >
                <i className="fa-solid fa-inbox"></i>Sản Phẩm
              </button>
            </Link>
            <Link to="/admin/adminblog" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={buttonStyle("adminblog")}
                className="btn list-group-item list-group-item-action"
                onClick={() => handleSelect("adminblog")}
              >
                <i className="fa-solid fa-pen-to-square"></i>Bài Viết
              </button>
            </Link>
            <Link to="/admin/orderproduct" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={buttonStyle("orderproduct")}
                className="btn list-group-item list-group-item-action"
                onClick={() => handleSelect("orderproduct")}
              >
                <i className="fa-solid fa-truck-fast"></i>Đơn hàng
              </button>
            </Link>

            <Link to="/admin/thongke" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={buttonStyle("thongke")}
                className="btn list-group-item list-group-item-action"
                onClick={() => handleSelect("thongke")}
              >
                <i className="fa-solid fa-chart-simple"></i>Thống kê
              </button>
            </Link>
          </div>
          <div
            style={{width:'15%',position: 'fixed',bottom: '0',}}
              className="list-group parent-class"
          >
            <Link to={"/loginadmin"} style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={{
                  color: "#777777 !important",
                  fontSize: "20px",
                  fontWeight: "500",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
                className="btn list-group-item list-group-item-action"
                onClick={handleLogout}
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>Đăng
                Xuất
              </button>
            </Link>
          </div>
        </div>
        <div style={{ width: "100%", marginBottom: "auto",position:"sticky" }}>
          <div
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              display: "flex",
              justifyContent: "end",
              height: "40px",
              alignItems: "center",
              gap: "10px",
              position:"fixed",
              top: 0,
              zIndex: 1000,
              marginLeft: "15%",
              backgroundColor:'#fff',
              width:'85%',
              
            }}
          >
            <span 
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={() => toggleLogin()}
            >
              Xin chào
            </span>
            <i
              className="fa-solid fa-circle-user "
              style={{ fontSize: "40px", marginRight: "50px" }}
            ></i>
          </div>
          <div style={{ marginTop: "50px", padding: "20px",marginLeft:'15%' }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
