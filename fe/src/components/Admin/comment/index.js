import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
function Comment() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/feedbacks');
        const data = await response.json();
        setFeedbacks(data);
        setFilteredFeedbacks(data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredFeedbacks(
      feedbacks.filter(feedback =>
        feedback.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, feedbacks]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/feedbacks/${id}`, {
        method: 'DELETE',
      });
      setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
      setFilteredFeedbacks(filteredFeedbacks.filter(feedback => feedback.id !== id));
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
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
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
        </div>

        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Mã khách hàng</th>
                <th scope="col">Mã Sản phẩm</th>
                <th scope="col">Nội dung</th>
                <th scope="col">Hình ảnh</th>
                <th scope="col">Đánh giá</th>
                <th scope="col">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.length > 0 ? (
                filteredFeedbacks.map((feedback) => (
                  <tr key={feedback.id}>
                    <td>{feedback.id}</td>
                    <td>{feedback.userId}</td>
                    <td>{feedback.productId}</td>
                    <td>{feedback.content}</td>
                    <td><img src={feedback.image} width={'100px'} alt="Feedback" /></td>
                    <td>{feedback.rating} <i className="fa-solid fa-star" style={{ color: '#f39c12' }}></i></td>
                    <td>
                      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <button 
                          onClick={() => handleDelete(feedback.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          <i className="fa-solid fa-trash" style={{ fontSize: '20px', color: 'red' }}></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Không tìm thấy dữ liệu!!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Comment;
