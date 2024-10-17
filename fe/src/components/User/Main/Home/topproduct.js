import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Home.css";
import { get } from "../../../../utils/httpRequest";

function TopProduct() {
  const [products, setProducts] = useState([]);
  const [discountProducts, setDiscountProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("/v1/products");
        const result = await response.data.products;

        if (Array.isArray(result)) {
          const sortedProducts = result.sort((a, b) => a.price - b.price);
          setProducts(sortedProducts.slice(0, 4));
          setDiscountProducts(sortedProducts.slice(-1));
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
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "60px",
          marginTop: "60px",
        }}
      >
        <div
          style={{
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
            color: "#777",
          }}
        >
          <h6 style={{ fontSize: "20px" }}>Thịnh hành</h6>
        </div>
        <div
          style={{
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
            color: "#20242e",
            fontFamily: "Quicksand",
            fontSize: "48px",
          }}
        >
          <h3 style={{ fontSize: "40px", fontWeight:'700', lineHeight:'62,4px', }}>Sản phẩm thịnh hành</h3>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "65%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
            }}
          >
            {products.map((item) => {
              const discountedPrice = item.price * 0.7;
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "30px",
                  }}
                >
                  <div  style={{ maxWidth: "540px" }}>
                    <div  style={{ width: "395px" , display:'flex' }}>
                      <div >
                        <center>
                          <img
                            src={item.image}
                            height={"247px"}
                            width={"247px"}
                            alt={item.name}
                          />
                        </center>
                      </div>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                        }}
                      >
                        <div className="card-body" >
                          <center>
                            <Link
                              to={`/detail-product/${item._id}`}
                              className="card-title cardtitle"
                              style={{ color: "#83bb3e",fontSize: '24px'}}
                            >
                              {item.productName}
                            </Link>
                            <div>
                              <p>
                                <del className="carddel">
                                  {item.price.toLocaleString()}đ
                                </del>
                              </p>
                              <p
                                className="carddel"
                                style={{ fontWeight: "bold" }}
                              >
                                {discountedPrice.toLocaleString()}đ
                              </p>
                            </div>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              borderRadius: "16px",
              width: "400px",
              height: "600px",
              backgroundColor: "#005350",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "65%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "30px",
              }}
            >
              <p style={{ color: "white", fontSize: "20px" }}>
                Giảm giá sâu trong tuần
              </p>
              {discountProducts.length > 0 ? (
                discountProducts.map((item) => {
                  const discountedPrice = item.price * 0.75; // Giả sử giảm giá 25%
                  return (
                    <div
                      key={item.id}
                      className="card"
                      style={{ width: "18rem" }}
                    >
                      <center>
                        <img
                          src={item.image}
                          height={"247px"}
                          width={"240px"}
                          alt={item.name}
                        />
                      </center>
                      <div className="card-body">
                        <center>
                          <Link
                          to={`/detail-product/${item._id}`}
                            className="card-title cardtitle"
                            style={{ color: "#83bb3e",fontSize: '24px'  }}
                          >
                            {item.productName}
                          </Link>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "15px",
                            }}
                          >
                            <p>
                              <del className="carddel">
                                {item.price.toLocaleString()}đ
                              </del>
                            </p>
                            <p
                              className="carddel"
                              style={{ fontWeight: "bold" }}
                            >
                              {discountedPrice.toLocaleString()}đ
                            </p>
                          </div>
                        </center>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p style={{ color: "white" }}>Chưa có sản phẩm giảm giá</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopProduct;
