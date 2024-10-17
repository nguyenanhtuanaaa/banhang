import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { validationSchemaLogin, validattionSchemaRegister } from "../../untils";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import "./Module.css";

function Module({
  isLogin,
  setIsLogin,
  isRegister,
  setIsRegister,
  onToggle,
  onLogin,
  onCreateAccount,
}) {
  const [flagEye, setFlagEye] = useState(true);
  const [flagEye2nd, setFlagEye2nd] = useState(true);

  const hiddenshowPassword = () => {
    setFlagEye(!flagEye);
    const TypeInput = document.getElementById("register__password");
    TypeInput.type = flagEye ? "text" : "password";
  };

  const hiddenshowPassword2nd = () => {
    setFlagEye2nd(!flagEye2nd);
    const TypeInput2nd = document.getElementById("register__password-retype");
    TypeInput2nd.type = flagEye2nd ? "text" : "password";
  };

  const handleLogin = async (values) => {
    const success = await onLogin(values);
    console.log("Login Success:", success); 
    if (success) {
      Swal.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại',
        text: 'Tên đăng nhập hoặc mật khẩu không chính xác.',
        
      });
    } else {
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
     
      setIsLogin(false);
      Toast.fire({
        icon: "success",
        title: "Đăng nhập thành công!",
      });
    }
  };
  

  const handleCreateAccount = async (values) => {
    const success = await onCreateAccount(values); 
    if (success) {
      Swal.fire({
        icon: 'error',
        title: 'Đăng ký thất bại',
        text: 'Tên đăng nhập hoặc mật khẩu không chính xác.',
        
      });
    } else {
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
      setIsRegister(false);
      Toast.fire({
        icon: "success",
        title: "Đăng ký thành công!",
      });
    }
  };

  return (
    <>
      {isLogin && (
        <div className="home-module-wrap">
          <div className="home-module__wrap">
            <div className="home-module__item">
              <h2 className="home-module__heading">ĐĂNG NHẬP</h2>
              <Formik
                initialValues={{ loginName: "", loginPassword: "" }}
                validationSchema={validationSchemaLogin}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={handleLogin}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="login__name" className="home-module__label">
                      Tên tài khoản hoặc địa chỉ email *
                    </label>
                    <Field
                      id="login__name"
                      className="home-module__input"
                      type="text"
                      name="loginName"
                    />
                    <ErrorMessage name="loginName" className="error" component="div" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="login__password" className="home-module__label">
                      Mật khẩu *
                    </label>
                    <Field
                      id="login__password"
                      className="home-module__input"
                      type="password"
                      name="loginPassword"
                    />
                    <ErrorMessage name="loginPassword" className="error" component="div" />
                  </div>
                  <Field id="login__memorize" className="home-module__input-check" type="checkbox" />
                  <label htmlFor="login__memorize" className="home-module__label">Ghi nhớ mật khẩu</label>
                  <button className="home-module__submit">ĐĂNG NHẬP</button>
                </Form>
              </Formik>
            </div>
            <button className="home-module__close" onClick={() => onToggle(isLogin, setIsLogin)}>
              <IoCloseOutline className="home-module__close-icon" />
            </button>
          </div>
        </div>
      )}

      {isRegister && (
        <div className="home-module-wrap">
          <div className="home-module__wrap">
            <div className="home-module__item">
              <h2 className="home-module__heading">ĐĂNG KÝ</h2>
              <Formik
                initialValues={{
                  registerName: "",
                  registerPassword: "",
                  registerEmail: "",
                  registerPasswordRetype: "",
                  registerPhone: "",
                  registerAddress: "",
                  registerSex: "",
                  registerDateBirth: "",
                }}
                validationSchema={validattionSchemaRegister}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={handleCreateAccount}
              >
                <Form>
                  <div className="register__container">
                    <div className="register__item">
                      <label htmlFor="register__name" className="home-module__label">Họ tên *</label>
                      <Field
                        id="register__name"
                        className="home-module__input"
                        type="text"
                        name="registerName"
                      />
                      <ErrorMessage className="error" name="registerName" component="div" />
                    </div>

                    <div className="register__item">
                      <label htmlFor="register__email" className="home-module__label">Địa chỉ email *</label>
                      <Field
                        id="register__email"
                        className="home-module__input"
                        type="text"
                        name="registerEmail"
                      />
                      <ErrorMessage className="error" name="registerEmail" component="div" />
                    </div>

                    <div className="register__item">
                      <label htmlFor="register__address" className="home-module__label">Địa chỉ của bạn *</label>
                      <Field
                        id="register__address"
                        className="home-module__input"
                        type="text"
                        name="registerAddress"
                      />
                      <ErrorMessage className="error" name="registerAddress" component="div" />
                    </div>

                    <div className="register__item">
                      <label htmlFor="register__phone" className="home-module__label">SDT *</label>
                      <Field
                        id="register__phone"
                        className="home-module__input"
                        type="tel"
                        name="registerPhone"
                      />
                      <ErrorMessage className="error" name="registerPhone" component="div" />
                    </div>

                    <div className="register__item">
                      <label htmlFor="register__date-birth" className="home-module__label">Ngày sinh *</label>
                      <Field
                        id="register__date-birth"
                        className="home-module__input"
                        type="date"
                        name="registerDateBirth"
                        min="1920-01-01"
                      />
                      <ErrorMessage className="error" name="registerDateBirth" component="div" />
                    </div>

                    <div className="register__item">
                      <fieldset>
                        <legend className="home-module__label">Giới tính *</legend>
                        <label>
                          <Field type="radio" name="registerSex" value="Nam" />
                          <span className="title-radio">Nam</span>
                        </label>
                        <label>
                          <Field type="radio" name="registerSex" value="Nữ" />
                          <span className="title-radio">Nữ</span>
                        </label>
                        <label>
                          <Field type="radio" name="registerSex" value="Khác" />
                          <span className="title-radio">Khác</span>
                        </label>
                      </fieldset>
                      <ErrorMessage className="error" name="registerSex" component="div" />
                    </div>

                    <div className="register__item">
                      <label htmlFor="register__password" className="home-module__label">Mật khẩu *</label>
                      <Field
                        id="register__password"
                        className="home-module__input"
                        type="password"
                        name="registerPassword"
                      />
                      {flagEye ? (
                        <FaEye onClick={hiddenshowPassword} className="registerEye" />
                      ) : (
                        <FaEyeSlash onClick={hiddenshowPassword} className="registerEye" />
                      )}
                      <ErrorMessage className="error" name="registerPassword" component="div" />
                    </div>

                    <div className="register__item">
                      <label htmlFor="register__password-retype" className="home-module__label">Nhập lại mật khẩu *</label>
                      <Field
                        id="register__password-retype"
                        className="home-module__input"
                        type="password"
                        name="registerPasswordRetype"
                      />
                      {flagEye2nd ? (
                        <FaEye onClick={hiddenshowPassword2nd} className="registerEye" />
                      ) : (
                        <FaEyeSlash onClick={hiddenshowPassword2nd} className="registerEye" />
                      )}
                      <ErrorMessage className="error" name="registerPasswordRetype" component="div" />
                    </div>

                    <button type="submit" className="home-module__submit">ĐĂNG KÝ</button>
                  </div>
                </Form>
              </Formik>
            </div>
            <button className="home-module__close" onClick={() => onToggle(isRegister, setIsRegister)}>
              <IoCloseOutline className="home-module__close-icon" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Module;
