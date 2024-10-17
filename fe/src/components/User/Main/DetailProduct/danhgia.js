import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../../../utils/httpRequest";
import Cookies from "js-cookie";

function DanhGia() {
  const { _id } = useParams(); // Lấy ID của sản phẩm từ URL
  const email = Cookies.get("email"); // Lấy email của người dùng từ cookie
  const token = Cookies.get("access_token"); // Lấy token truy cập từ cookie
  const [content, setContent] = useState(""); // Biến state để lưu nội dung đánh giá
  const [feedbacks, setFeedbacks] = useState([]); // Biến state để lưu danh sách đánh giá
  const [loading, setLoading] = useState(true); // Biến state để hiển thị trạng thái tải
  const [error, setError] = useState(""); // Biến state để hiển thị thông báo lỗi
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false); // Biến state kiểm tra xem người dùng đã gửi đánh giá chưa

  // Hàm lấy thông tin chi tiết của người dùng (tên đầy đủ và hình ảnh)
  const fetchUserDetails = async (customerId) => {
    try {
      const response = await get(`/v1/profile?customerId=${customerId}`); // Lấy thông tin user bằng customerId
      if (response.code === 200) {
        return response.data.customer; // Trả về thông tin user nếu thành công
      } else {
        console.error("Không thể lấy thông tin người dùng:", response.message);
        return null;
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      return null;
    }
  };

  // useEffect để lấy danh sách đánh giá khi component được tải lên
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get(`/v1/feedbacks/${_id}`); // Gọi API lấy danh sách đánh giá theo product ID
        if (res.code === 200) {
          const feedbacksWithUserDetails = await Promise.all(
            res.data.feedbacks.map(async (feedback) => {
              const userDetails = await fetchUserDetails(feedback.customerId); // Lấy thông tin chi tiết của từng user đánh giá
              return {
                ...feedback,
                userName: userDetails?.fullname || "Anonymous", // Fallback tên đầy đủ hoặc "Anonymous"
                userImage:
                  userDetails?.image ||
                  "https://phunuvietnam.mediacdn.vn/media/news/33abffcedac43a654ac7f501856bf700/anh-profile-tiet-lo-g-ve-ban-1.jpg", // Fallback hình ảnh mặc định
              };
            })
          );
          setFeedbacks(feedbacksWithUserDetails);

          // Kiểm tra xem người dùng đã gửi đánh giá cho sản phẩm này chưa
          const hasFeedback = feedbacksWithUserDetails.some(
            (feedback) => feedback.email === email && feedback._id === _id
          );
          setHasSubmittedFeedback(hasFeedback);
        } else {
          setError("Lỗi khi lấy danh sách đánh giá.");
        }
      } catch (error) {
        setError("Có lỗi xảy ra khi lấy danh sách đánh giá.");
        console.error("Lỗi khi lấy đánh giá:", error);
      } finally {
        setLoading(false); // Dừng trạng thái tải sau khi hoàn tất
      }
    };
    fetchData();
  }, [_id, email]); // Chạy lại hiệu ứng khi _id hoặc email thay đổi

  // Hàm xử lý thay đổi nội dung đánh giá
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  // Hàm gửi đánh giá
  const handleSubmitFeedback = async () => {
    const feedback = {
      _id,
      email,
      contents: content,
    };

    try {
      const res = await fetch(
        `http://localhost:3030/v1/feedbacks/${_id}/send-feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Đính kèm token để xác thực
          },
          body: JSON.stringify(feedback),
        }
      );

      if (res.ok) {
        const newFeedback = await res.json();
        console.log(newFeedback); // Lấy dữ liệu đánh giá mới từ phản hồi server
        const userDetails = await fetchUserDetails(newFeedback.customerId); // Lấy thông tin người dùng cho đánh giá mới
        const feedbackWithUserDetails = {
          ...newFeedback,
          userName: userDetails?.fullname || "Anonymous",
          userImage:
            userDetails?.image ||
            "https://phunuvietnam.mediacdn.vn/media/news/33abffcedac43a654ac7f501856bf700/anh-profile-tiet-lo-g-ve-ban-1.jpg",
        };
        setFeedbacks((prevFeedbacks) => [
          feedbackWithUserDetails,
          ...prevFeedbacks,
        ]); // Thêm đánh giá mới vào đầu danh sách mà không cần tải lại trang
        setContent(""); // Xóa nội dung của textarea sau khi gửi
        setHasSubmittedFeedback(true);
        } else {
        console.error("Không thể gửi đánh giá.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
    }
  };

  // Hiển thị loading trong khi chờ lấy dữ liệu
  if (loading) {
    return <div>Đang tải đánh giá...</div>;
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      style={{
        width: "76%",
        margin: "0 auto",
        marginBottom: "20px",
        marginTop: "20px",
      }}
    >
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <button
          type="button"
          className="btn btn-success"
          disabled={hasSubmittedFeedback} // Vô hiệu hóa nếu người dùng đã gửi đánh giá
        >
          Bình luận
        </button>
      </div>

      {!hasSubmittedFeedback ? (
        <div style={{ marginBottom: "20px" }}>
          <textarea
            placeholder="Mời bạn chia sẻ cảm nhận về sản phẩm..."
            value={content}
            onChange={handleContentChange}
            style={{
              width: "100%",
              height: "140px",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          ></textarea>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmitFeedback} // Gọi hàm gửi đánh giá
          >
            Gửi bình luận
          </button>
        </div>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          <p>Bạn đã gửi một bình luận cho sản phẩm này.</p>
        </div>
      )}

      <div style={{ width: "100%" }}>
        {feedbacks.map((feedback, index) => (
          <div key={feedback.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <img
                src={feedback.userImage} // Hiển thị hình ảnh người dùng
                alt=""
                width={"50px"}
                height={"50px"}
                style={{ borderRadius: "50%" }}
              />
              <h4>{feedback.userName}</h4> {/* Hiển thị tên người dùng */}
            </div>
            <div style={{ marginLeft: "70px", marginRight: "30px" }}>
              <h4>{feedback.contents}</h4> {/* Hiển thị nội dung đánh giá */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DanhGia;
