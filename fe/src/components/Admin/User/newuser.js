import React, { useState } from "react";
import { Link } from "react-router-dom";
import { post } from "../../../utils/httpRequest";
function NewAdminUser() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Người Dùng");
  const [image, setImage] = useState(null);

  const handleNameChange = (event) => setName(event.target.value);
  const handleBirthdateChange = (event) => setBirthdate(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleRoleChange = (event) => setRole(event.target.value);
  const handleImageChange = (event) => setImage(event.target.files[0]);

  const handleSubmit = async () => {
    try {
      const response = await post("admin/customers", {
        fullname: name,
        email: email,
        password: password,
        phone: phone,
        Dob: birthdate,
      });

      if (response.ok) {
        console.log("Người dùng đã được thêm thành công!");
        setName("");
        setBirthdate("");
        setEmail("");
        setPassword("");
        setRole("Người Dùng");
        setImage(null);
      } else {
        const errorText = await response.text();
        console.error("Lỗi khi thêm người dùng:", errorText);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  };

  return (
    <>
      <div style={{ padding: "30px" }}>
        <h3>Thêm Người Dùng</h3>
        <div className="mb-3 row">
          <label
            className="col-sm-2 col-form-label"
            style={{ fontWeight: "900" }}
          >
            Tên
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              style={{ fontWeight: "500" }}
              placeholder="Nhập tên người dùng..."
              value={name}
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            className="col-sm-2 col-form-label"
            style={{ fontWeight: "900" }}
          >
            Hình Ảnh
          </label>
          <div className="col-sm-4">
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            className="col-sm-2 col-form-label"
            style={{ fontWeight: "900" }}
          >
            Ngày Sinh
          </label>
          <div className="col-sm-4">
            <input
              type="date"
              className="form-control"
              value={birthdate}
              onChange={handleBirthdateChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            className="col-sm-2 col-form-label"
            style={{ fontWeight: "900" }}
          >
            Email
          </label>
          <div className="col-sm-4">
            <input
              type="email"
              className="form-control"
              style={{ fontWeight: "500" }}
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            className="col-sm-2 col-form-label"
            style={{ fontWeight: "900" }}
          >
            Mật Khẩu
          </label>
          <div className="col-sm-4">
            <input
              type="password"
              className="form-control"
              style={{ fontWeight: "500" }}
              placeholder="Mật Khẩu"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            className="col-sm-2 col-form-label"
            style={{ fontWeight: "900" }}
          >
            Số điện thoại
          </label>
          <div className="col-sm-4">
            <input
              type="phone"
              className="form-control"
              style={{ fontWeight: "500" }}
              placeholder="Số điện thoại"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            className="col-sm-2 col-form-label"
            style={{ fontWeight: "900" }}
          >
            Vai Trò
          </label>
          <div className="col-sm-4">
            <select
              className="form-control"
              value={role}
              onChange={handleRoleChange}
            >
              <option>Người Dùng</option>
              <option>Admin</option>
            </select>
          </div>
        </div>
        <Link to="/admin/adminuser">
          {" "}
          <button
            type="button"
            class="btn btn-secondary"
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
          Thêm Người Dùng
        </button>
      </div>
    </>
  );
}

export default NewAdminUser;
