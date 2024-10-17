import { Link } from "react-router-dom";
import "./Home.css";
import { useState, useEffect } from "react";
import { get } from "../../../../utils/httpRequest";

function NewProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get("/v1/products");
  
        if (res && res.data && Array.isArray(res.data.products)) {
          const result = res.data.products;
          setProducts(result.slice(0, 10));
        } else {
          console.error("Unexpected data format:", res);
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
          <h6 style={{ fontSize: "20px" }}> Sản phẩm của cửa hàng</h6>
        </div>
        <div
          style={{
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
            color: "#20242e",
            fontFamily: "Quicksand",
            fontSize: "38px",
            lineHeight:'62,4px',
            fontWeight:'700'
          }}
        >
          <h3 style={{ fontSize: "40px", fontWeight:'700', lineHeight:'62,4px', }}> Sản phẩm </h3>
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
          {Array.isArray(products) &&
            products.map((item) => {
              console.log("Product Item:", item._id);
              const discountedPrice = item.price * 0.7;

              return (
                <div className="cardd" key={item.id}>
                  <center>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="carddimge"
                      style={{width: '240px', height: '240px'}}
                    />
                  </center>
                  <div className="card-body">
                    <center>
                      <Link
                        to={`/detail-product/${item._id}`}
                        className="card-title cardtitle"
                        style={{ color: "#83bb3e", fontSize: '24px' }}
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
                        <p className="carddel" style={{ fontWeight: "bold",fontSize: '18px'  }}>
                          {discountedPrice.toLocaleString()}đ
                        </p>
                      </div>
                    </center>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default NewProduct;
