import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { get, put } from "../../../utils/httpRequest";

function UpdateOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [formData, setFormData] = useState({
    userId: "",
    address: "",
    pay: "",
    phone: "",
    status: "",
  });
  const navigation = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await get(`/admin/orders/${id}`);
        if (response.code !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = await response.data;
        setOrder(data);
        setFormData({
          userId: data._id,
          address: data.location.address,
          pay: data.paymentMethod,
          phone: data.customer.phone,
          status: data.status,
        });
      } catch (error) {
        console.error("There was an error fetching the order!", error);
      }
    };

    fetchOrder();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await put(`/admin/orders/${id}/status`, {
        status: Number(formData.status),
      });

      if (response.code !== 200) {
        throw new Error("Network response was not ok");
      }
      const updatedOrder = await response.data;
      setOrder(updatedOrder);
      navigation("/admin/orderproduct");
      alert("Order updated successfully!");
    } catch (error) {
      console.error("There was an error updating the order!", error);
    }
  };

  return (
    <>
      <div style={{ padding: "30px" }}>
        <h3>Cập nhật đơn hàng</h3>
        {order ? (
          <>
            <div className="mb-3 row">
              <label
                className="col-sm-2 col-form-label"
                style={{ fontWeight: "900" }}
              >
                Mã khách hàng
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  style={{ fontWeight: "500" }}
                  disabled
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                className="col-sm-2 col-form-label"
                style={{ fontWeight: "900" }}
              >
                Địa chỉ giao hàng
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                className="col-sm-2 col-form-label"
                style={{ fontWeight: "900" }}
              >
                Phương thức thanh toán
              </label>
              <div className="col-sm-4">
                <select
                  className="form-control"
                  name="pay"
                  value={formData.pay}
                  onChange={handleChange}
                  disabled
                >
                  <option value="Thanh toán khi nhận hàng">
                    Thanh toán khi nhận hàng
                  </option>
                  <option value="Chuyển khoản">Chuyển khoản</option>
                </select>
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ fontWeight: "500" }}
                  disabled
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                className="col-sm-2 col-form-label"
                style={{ fontWeight: "900" }}
              >
                Trạng thái
              </label>
              <div className="col-sm-4">
                <select
                  className="form-control"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="1">Đã xác nhận</option>
                  <option value="2">Đã vận chuyển</option>
                  <option value="3">Đã hủy</option>
                </select>
              </div>
            </div>
            <Link to="/admin/orderproduct">
              <button
                type="button"
                className="btn btn-secondary"
                style={{ marginRight: "20px" }}
              >
                Trở về
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
              style={{ fontWeight: "900" }}
            >
              Cập nhập đơn hàng
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default UpdateOrder;
