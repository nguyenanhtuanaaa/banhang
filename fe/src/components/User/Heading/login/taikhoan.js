import Cookies from "js-cookie";
import { putData } from "../../handle"; // Ensure the path is correct
import { validationSchemaEditUser } from "../../untils"; // Ensure the path is correct
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Account() {
  const userName = Cookies.get("email");
  const [account, setAccount] = useState(null);
  const [image, setImage] = useState("");
  const [initialValues, setInitialValues] = useState({
    id: "",
    fullname: "",
    mail: "",
    password: "",
    phone: "",
    Dob: ""
  });
  const token = Cookies.get("access_token");

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const res = await fetch(`http://localhost:3030/v1/profile?email=${userName}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);

        if (data.code === 200 && data.data.customer) {
          const customer = data.data.customer;
          setInitialValues({
            id: customer._id || "",
            fullname: customer.fullname || "",
            mail: customer.email || "",
            password: customer.password || "",
            phone: customer.phone || "",
            Dob: customer.Dob ? customer.Dob.split("T")[0] : "",
          });
          setAccount(customer);
        }
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };
    fetchAccountData();
  }, [userName, token]);

  const accountObject = account || {};
  
  useEffect(() => {
    if (image && accountObject._id) {
      putData(`http://localhost:3030/v1/profile/${accountObject._id}`, {
        ...accountObject,
        image: image,
      });
    }
  }, [image, accountObject]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateAccount = async (event) => {
    event.preventDefault();
    const values = {
      id: initialValues.id,
      image: image,
      fullname: event.target.fullname.value,
      email: event.target.mail.value,
      password: event.target.password.value,
      phone: event.target.phone.value,
      Dob: event.target.Dob.value,
    };
    console.log("Values:", values); 
    try {
      // Check email
      const res = await axios.get(`http://localhost:3030/v1/profile?email=${values.email}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (res.data.length === 1 && res.data[0].email !== initialValues.mail) {
        alert("Email này đã tồn tại");
      } else {
        // Update account information
        const updateRes = await axios.put(
          `http://localhost:3030/v1/profile/update-profile`,values,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Update Response:", updateRes.data);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Cập nhật thành công!"
        });
      }
    } catch (error) {
      console.error("Error updating account:", error);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Lỗi khi cập nhật!"
      });
    }
  };
  

  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "center",
        width: "70%",
        alignItems: "center",
        margin: "0 auto",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, .13)",
        marginBottom: "40px",
        marginTop: "30px",
        flexWrap: "wrap",
      }}>
        <div style={{ padding: "30px", width: "600px" }}>
          <h3> Hồ Sơ Của Tôi</h3>
          <form onSubmit={updateAccount}>
            {/* Form Fields */}
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }} htmlFor="user-name">
                Tên
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="user-name"
                  name="fullname"
                  style={{ fontWeight: "500" }}
                  defaultValue={initialValues.fullname}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }} htmlFor="user-email">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  id="user-email"
                  name="mail"
                  style={{ fontWeight: "500" }}
                  className="form-control"
                  defaultValue={initialValues.mail}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }} htmlFor="user-password">
                Mật Khẩu
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="user-password"
                  name="password"
                  style={{ fontWeight: "500" }}
                  defaultValue={initialValues.password}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
                Ngày Sinh
              </label>
              <div className="col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  name="Dob"
                  style={{ fontWeight: "500" }}
                  defaultValue={initialValues.Dob}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label" style={{ fontWeight: "900" }}>
                Số điện thoại
              </label>
              <div className="col-sm-10">
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  style={{ fontWeight: "500" }}
                  defaultValue={initialValues.phone}
                />
              </div>
            </div>
            <center>
              <button type="submit" className="btn btn-primary" style={{ fontWeight: "900" }} >
                Cập nhật
              </button>
            </center>
          </form>
        </div>

       
      </div>
    </>
  );
}

export default Account;
