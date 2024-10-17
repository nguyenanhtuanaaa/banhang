import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function UpdateVoucher() {
  const [voucher, setVoucher] = useState({ name: '', id: '', value: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current voucher details
    fetch(`http://localhost:3000/vouchers/${id}`)
      .then(response => response.json())
      .then(data => {
        setVoucher(data);
      })
      .catch(error => {
        console.error('Error fetching voucher:', error);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVoucher(prevVoucher => ({ ...prevVoucher, [name]: value }));
  };

  const handleSubmit = () => {
    // Update the voucher data
    fetch(`http://localhost:3000/vouchers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(voucher),
    })
      .then(response => response.json())
      .then(() => {
        navigate('/admin/vouchers'); // Redirect after update
      })
      .catch(error => {
        console.error('Error updating voucher:', error);
      });
  };

  return (
    <>
      <div style={{ padding: '30px' }}>
        <h3>Cập nhật mã giảm giá</h3>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label" style={{ fontWeight: '900' }}>Tên</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              name="name"
              value={voucher.name}
              onChange={handleChange}
              style={{ fontWeight: '500' }}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label" style={{ fontWeight: '900' }}>Mã sản phẩm</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              name="id"
              value={voucher.id}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label" style={{ fontWeight: '900' }}>Giảm giá</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              name="value"
              value={voucher.value}
              onChange={handleChange}
            />
          </div>
        </div>
        <Link to="/admin/voucher" >  <button type="button" class="btn btn-secondary" style={{marginRight:'20px'}}>Trở về</button></Link>

        <button
          type="button"
          className="btn btn-primary"
          style={{ fontWeight: '900' }}
          onClick={handleSubmit}
        >
          Cập nhật mã giảm giá
        </button>
      </div>
    </>
  );
}

export default UpdateVoucher;
