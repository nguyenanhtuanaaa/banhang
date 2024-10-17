import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Module from "./Module";
import { handleToggle } from "../handle";
import { FaUser } from "react-icons/fa";
import Cookies from "js-cookie";
import "./Heading.css";
import axios from "axios";
import { post } from "../../../utils/httpRequest";
import Search from "./search/search";
import Swal from "sweetalert2";
function Heading({ setSearchQuery }) {
  const navigate = useNavigate();
  // const [FlagExistUser, setFlagExistUser] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [FlagExistUser, setFlagExistUser] = useState(false);

  const handleClick = (path) => {
    setActiveLink(path);
  };

  // đăng kí tài khoản
  const createAccount = async (values, actions) => {
    try {
      const response = await post(`/v1/auth/register`, {
        fullname: values.registerName,
        email: values.registerEmail,
        password: values.registerPassword,
        rePassword: values.registerPasswordRetype,
        phone: values.registerPhone,
        Dob: values.registerDateBirth,
      });
      if (response.code !== 201) {
        actions.setFieldError("registerEmail", "Email đã tồn tại");
      } else {
        values.registerName = "";
        values.registerPassword = "";
        values.registerPasswordRetype = "";
        values.registerEmail = "";
        values.registerPhone = "";
        values.registerAddress = "";
        document.querySelector(".successful").style.display = "flex";
      }
    } catch (error) {
      console.error("Lỗi khi tạo tài khoản:", error);
    }
  };

  // đăng nhập tài khoản
  const loginAccount = async (values, actions) => {
    try {
      const response = await post("/v1/auth/login", {
        email: values.loginName,
        password: values.loginPassword,
      });
      if (response.data.accessToken) {
        Cookies.set("access_token", response.data.accessToken);
        Cookies.set("email", values.loginName);
       
      }
    } catch (error) {
      actions.setFieldError("loginName", error.message);
      actions.setFieldError("loginPassword", error.message);
    }
  };

  // đăng xuất tài khoản
  const checkOutAccount = () => {
    Cookies.remove("access_token");
    navigate("/");
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
      title: "  Đăng xuất  thành công!",
    });
  };

  return (
    <>
      <div style={{ position: "sticky", top: "0px", zIndex: "1000",marginBottom:'30px' }}>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img
                src="https://thucpham4.giaodienwebmau.com/wp-content/uploads/2021/10/lg.png"
                alt="Logo"
                width="178px"
                height="83px"
                className="d-inline-block align-text-top "
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul
                className="navbar-nav me-auto mb-2 mb-lg-0"
                style={{ margin: "0 auto" }}
              >
                <li className="nav-item">
                  <Link
                    className={`text ${activeLink === "/" ? "active" : ""}`}
                    style={{
                      color: activeLink === "/" ? "#111111d9" : "#666666d9",
                    }}
                    aria-current="page"
                    to="/"
                    onClick={() => handleClick("/")}
                  >
                    Trang chủ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`text ${
                      activeLink === "/product/products" ? "active" : ""
                    }`}
                    style={{
                      color:
                        activeLink === "/san-pham" ? "#111111d9" : "#666666d9",
                    }}
                    to="/product/products"
                    onClick={() => handleClick("/san-pham")}
                  >
                    Sản Phẩm
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`text ${
                      activeLink === "/tin-tuc" ? "active" : ""
                    }`}
                    style={{
                      color:
                        activeLink === "/tin-tuc" ? "#111111d9" : "#666666d9",
                    }}
                    to="/contact"
                    onClick={() => handleClick("/tin-tuc")}
                  >
                    Liên Hệ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`text ${
                      activeLink === "/introduce" ? "active" : ""
                    }`}
                    style={{
                      color:
                        activeLink === "/introduce" ? "#111111d9" : "#666666d9",
                    }}
                    to="/introduce"
                    onClick={() => handleClick("/introduce")}
                  >
                    Giới thiệu
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`text ${activeLink === "/blog" ? "active" : ""}`}
                    style={{
                      color: activeLink === "/blog" ? "#111111d9" : "#666666d9",
                    }}
                    to="/blog"
                    onClick={() => handleClick("/blog")}
                  >
                    Tin Tức
                  </Link>
                </li>
              </ul>
              <div
                className="d-flex"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "9.9%",
                }}
              >
                {/* <div class="search-container " style={{ marginRight: "70%" }}>
                  <center>
                    <i class="fa-solid fa-magnifying-glass search-icon" style={{fontSize:'20px'}}></i>
                  </center>
                  <input
                    type="text"
                    class="search-input"
                    placeholder="Search..."
                  />
                </div> */}
                <Search />

                <Link to="/cart">
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <center>
                      <i
                        className="fa-solid fa-cart-shopping"
                        style={{ color: "#3c6", fontSize: "20px" }}
                      ></i>
                    </center>
                   
                  </div>
                </Link>
              </div>
              <div>
                {Cookies.get("access_token") ? (
                  <>
                    <button className="iconbutton">
                      <Link to="/acount">
                        <FaUser className="nav__user-btn-icon" />
                      </Link>
                    </button>
                    <button className="textbutton" onClick={checkOutAccount}>
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <div className="buttonlogin">
                      <button
                        onClick={() => handleToggle(isLogin, setIsLogin)}
                        className="textbutton nav__login"
                        style={{
                          backgroundColor: "#3c6",
                          color: "white",
                          height: "35px",
                        }}
                      >
                        Đăng nhập
                      </button>
                      <button
                        onClick={() => handleToggle(isRegister, setIsRegister)}
                        className="textbutton nav__login"
                        style={{ height: "35px" }}
                      >
                        Đăng kí
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        <Module
          isRegister={isRegister}
          setIsRegister={setIsRegister}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          onToggle={handleToggle}
          onLogin={loginAccount}
          onCreateAccount={createAccount}
        />
      </div>
    </>
  );
}

export default Heading;
