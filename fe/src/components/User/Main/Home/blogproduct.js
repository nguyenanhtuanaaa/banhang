import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Home.css";

function BlogProduct() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3030/v1/posts");
        const result = await res.json();
        console.log(result);

        // Kiểm tra cấu trúc của dữ liệu trả về từ API
        if (result.data && Array.isArray(result.data.posts)) {
          setBlog(result.data.posts.slice(0, 5));
        } else {
          console.error("Unexpected data format:", result);
        }
      } catch (error) {
        console.error("Lỗi dữ liệu!!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "60px",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "#777",
          marginBottom: "20px",
        }}
      >
        <h6 style={{ fontSize: "20px" }}>Tin tức mới</h6>
      </div>
      <div
        style={{
          textAlign: "center",
          color: "#20242e",
          fontFamily: "Quicksand",
          fontSize: "48px",
          marginBottom: "40px",
        }}
      >
        <h3
          style={{ fontSize: "48px", fontWeight: "700", lineHeight: "62,4px" }}
        >
          Tin Tức
        </h3>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {blog.length > 0 ? (
          blog.map((item) => (
            <div key={item._id} className="card">
              <center>
                <img src={item.image} alt={item.title} className="cardimg rounded-start rounded-end" />
              </center>
              <div className="card-body">
                <center>
                  <Link
                    to={`/detailblog/${item._id}`}
                    className="card-title"
                    style={{
                      color: "#20242e",
                      fontSize: "20px",
                      textDecoration: "none",
                      fontFamily: '"Quicksand", sans-serif',
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "inline-block",
                      maxWidth: "240px",
                    }}
                  >
                    {item.title}
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "15px",
                      marginTop: "10px",
                    }}
                  >
                    <Link
                      to={`/detailblog/${item._id}`}
                      className="btn btn-secondary"
                      style={{
                        backgroundColor: "#00923f",
                        color: "white",
                        marginBottom: "20px",
                        marginTop: "20px",
                        borderRadius: "20px",
                        fontFamily: "Quicksand",
                        lineHeight: "19.5px",
                        letterSpacing: "0.39px",
                        fontSize: "13px",
                      }}
                    >
                      Chi Tiết
                    </Link>
                  </div>
                </center>
              </div>
            </div>
          ))
        ) : (
          <p>không có bài viết nào</p> // Thông báo khi không có bài viết nào
        )}
      </div>
    </div>
  );
}

export default BlogProduct;
