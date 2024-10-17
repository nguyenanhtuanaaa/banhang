import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { post } from '../../../utils/httpRequest';

import './login.css';

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!email || !email.includes('@') || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng nhập đúng thông tin!',
      });
      return;
    }

    try {
      // Make the POST request for login
      const response = await post('admin/auth/login', {
        email,
        password,
      });

      if (response.data.accessToken) {
        Cookies.set('access_token', response.data.accessToken);
        Swal.fire('Đăng nhập thành công!', 'Đăng nhập thành công!', 'success');
        navigate('/admin');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại!',
          text: response.data.message || 'Email hoặc mật khẩu không đúng!',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: error.response?.data?.message || 'Có lỗi xảy ra trong quá trình đăng nhập!',
      });
    }
  };

  return (
    <div className="containerr" id="container" style={{ marginBottom: '20px' }}>
      <div className="form-container login-container">
        <form className="form-lg form" onSubmit={handleSubmit}>
          <h1>Đăng nhập</h1>
          <div className="form-control2">
            <input
              type="email"
              className="email-2 input"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
            />
            <div>
              {emailTouched && email.length === 0 && (
                <small className="help-block">Email không được để trống</small>
              )}
              {emailTouched && email.length > 0 && !email.includes('@') && (
                <small className="help-block">Email không đúng định dạng</small>
              )}
            </div>
            <span></span>
          </div>
          <div className="form-control2">
            <input 
              type="password"
              className="password-2 input"
              name="password"
              value={password}
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
            />
            <div>
              {passwordTouched && password.length === 0 && (
                <small className="help-block">Password không được để trống</small>
              )}
            </div>
            <span></span>
          </div>
        
          <button className="button" type="submit" value="submit" style={{ width: '300px', marginTop:'30px' }}>
            Đăng nhập
          </button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1 className="title">
              Đăng nhập Admin <br />
              ngay bây giờ.
            </h1>
            <p>Đăng nhập để quản lý các thông tin.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
