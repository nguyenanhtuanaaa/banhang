import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
function Voucher() {
  const [vouchers, setVouchers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVouchers, setFilteredVouchers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/vouchers')
      .then(response => response.json())
      .then(data => {
        setVouchers(data);
        setFilteredVouchers(data); 
      })
      .catch(error => {
        console.error('Error fetching vouchers:', error);
      });
  }, []);

  useEffect(() => {
    setFilteredVouchers(
      vouchers.filter(voucher =>
        voucher.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, vouchers]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/vouchers/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setVouchers(vouchers.filter(voucher => voucher.id !== id));
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "  Xóa thành công!"
        });
      })
      .catch(error => {
        console.error('Error deleting voucher:', error);
      });
  };

  return (
    <>
      <div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ borderRadius: '6px', border: '1px solid #777777', paddingRight: '30px' }}
            />
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
            ></i>
          </div>
          <Link to={'/admin/newvoucher'}>
            <button className="btn btn-link">
              <i className="fa-solid fa-plus"></i>
            </button>
          </Link>
        </div>

        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Tên</th>
                <th scope="col">Giảm giá</th>
                <th scope="col">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.length > 0 ? (
                filteredVouchers.map(voucher => (
                  <tr key={voucher.id}>
                    <td>{voucher.id}</td>
                    <td>{voucher.name}</td>
                    <td>{voucher.value}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <Link to={`/admin/updatevoucher/${voucher.id}`}>
                          <i className="fa-solid fa-edit" style={{ fontSize: '20px' }}></i>
                        </Link>
                        <button onClick={() => handleDelete(voucher.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                          <i className="fa-solid fa-trash" style={{ fontSize: '20px', color: 'red' }}></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Không tìm thấy dữ liệu!!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Voucher;
