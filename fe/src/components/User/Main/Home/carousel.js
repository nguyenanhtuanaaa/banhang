import "./Home.css";
import NewProduct from "./newproduct";
import SellProduct from "./sellproduct";
import TopProduct from "./topproduct";
import BlogProduct from "./blogproduct";
function Carousel() {
  return (
    <>
      <div className="carousel">
        <div className="carousel1">
          <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
            style={{ width: "100%", height: "600px" }}
          >
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="2000">
                <img
                  src="https://dogifood.vn/Images/news/2011120932-vai-tro-cua-thuc-pham-sach.jpg"
                  className="d-block w-100"
                  height={"600px"}
                  width={"800px"}
                  style={{ borderRadius: "13px" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img
                  src="https://img.pikbest.com/origin/06/43/52/233pIkbEsTKCp.jpg!w700wp"
                  className="d-block w-100"
                  height={"600px"}
                  width={"800px"}
                  style={{ borderRadius: "13px" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img
                  src="https://mir-s3-cdn-cf.behance.net/projects/404/2d14d6189445149.65ab73e489f86.jpg"
                  className="d-block w-100"
                  height={"600px"}
                  width={"800px"}
                  style={{ borderRadius: "13px" }}
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          {/* <img src="https://www.vinmec.com/s3-images/20210519_070755_784816_thuc-pham-huu-co.max-800x800.jpg" alt='' height={'100%'} width={'100%'} style={{borderRadius:'13px'}}/>    */}
        </div>
        <div className="carousel2">
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "290px",
              marginBottom: "20px",
              zIndex: "100",
            }}
          >
            <img
              src="https://web1594.sangiaodichweb.com/dtool/data/computer/web1594/trai-cay-nhap-lhau.jpg"
              alt=""
              height="100%"
              width="100%"
              style={{ borderRadius: "13px" }}
            />
            <div
              style={{
                position: "absolute",
                top: "35%",
                left: "50%",
                transform: "translate(-100%, -10%)",
                color: "#3c6",
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "900",
              }}
            >
              <div style={{backgroundColor:'#b20000',display:'inline-block',width:'100px',borderRadius:'20px',marginRight:'75px'}}>
                <span style={{color:'#fff',textTransform:'uppercase'}}>50% off</span>
              </div>
              <p style={{ fontSize:'24px',fontFamily:'Quicksand',color:'#83bb3e',fontWeight:'700',textShadow:'0 0 3px #83bb3e'}}> DANAORGANIC </p>
              <h4 style={{ fontSize:'20px',fontFamily:'Quicksand',color:'#fe9705',fontWeight:'700',textShadow:'0 0 3px #fe9705',marginLeft:'15px'}}> Trái Cây Nhập Khẩu </h4>
              <p style={{ fontSize:'20px',fontFamily:'Quicksand',color:'#83bb3e',fontWeight:'700',textShadow:'0 0 3px #83bb3e',marginRight:'80px'}}> TỰ NHIÊN </p>
            </div>
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "290px",
              marginBottom: "20px",
              zIndex: "100",
            }}
          >
            <img
              src="https://web1594.sangiaodichweb.com/dtool/data/computer/web1594/hai-cjia.jpg"
              alt=""
              height="100%"
              width="100%"
              style={{ borderRadius: "13px" }}
            />
            <div
              style={{
                position: "absolute",
                top: "60%",
                left: "50%",
                transform: "translate(-5%, -110%)",
                color: "white",
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "900",
              }}
            >
              <h4 style={{ fontSize:'24px',fontFamily:'Quicksand',color:'#83bb3e',fontWeight:'700',textShadow:'0 0 3px #83bb3e'}}> THỰC PHẨM SẠCH </h4>
              <p style={{ fontSize:'20px',textShadow:'0 0 3px white'}}> TƯƠI NGON, AN TOÀN TỪ NÔNG TRẠI </p>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            marginTop: "50px",
          }}
        >
          <div className="bannericon">
            <div
              style={{ width: "100%", height: "250px", marginBottom: "20px" }}
            >
              <div>
                <center>
                  <img
                    height={"75px"}
                    width={"123px"}
                    src="https://thucpham4.giaodienwebmau.com/wp-content/uploads/2021/10/t1.jpg"
                    alt=""
                  />
                </center>
              </div>
              <div style={{ textAlign: "center" }}>
                <h3>Giao hàng miễn phí</h3>
                <p style={{ color: "#777" }}>
                  Miễn phí giao hàng cho đơn hàng trên 200.000đ
                </p>
              </div>
            </div>
          </div>
          <div className="bannericon">
            <div
              style={{ width: "100%", height: "250px", marginBottom: "20px" }}
            >
              <div>
                <center>
                  <img
                    height={"75px"}
                    width={"123px"}
                    src="https://thucpham4.giaodienwebmau.com/wp-content/uploads/2021/10/t2.jpg"
                    alt=""
                  />
                </center>
              </div>
              <div style={{ textAlign: "center" }}>
                <h3>Hỗ trợ 24/7</h3>
                <p style={{ color: "#777" }}>
                  Hỗ trợ chăm sóc bán hàng liên tục 24/7/365
                </p>
              </div>
            </div>
          </div>
          <div className="bannericon">
            <div
              style={{ width: "100%", height: "250px", marginBottom: "20px" }}
            >
              <div>
                <center>
                  <img
                    height={"75px"}
                    width={"123px"}
                    src="https://thucpham4.giaodienwebmau.com/wp-content/uploads/2021/10/t3.jpg"
                    alt=""
                  />
                </center>
              </div>
              <div style={{ textAlign: "center" }}>
                <h3>7 ngày đổi trả</h3>
                <p style={{ color: "#777" }}>
                  Cam kết chất lượng, bao đổi trả trong vòng 7 ngày
                </p>
              </div>
            </div>
          </div>
          <div className="bannericon">
            <div
              style={{ width: "100%", height: "250px", marginBottom: "20px" }}
            >
              <div>
                <center>
                  <img
                    height={"75px"}
                    width={"123px"}
                    src="https://thucpham4.giaodienwebmau.com/wp-content/uploads/2021/10/t4.jpg"
                    alt=""
                  />
                </center>
              </div>
              <div style={{ textAlign: "center" }}>
                <h3>100% thanh toán </h3>
                <p style={{ color: "#777" }}>
                  Đảm bảo thanh toán an toàn với Paypal, Visa, …
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* sản phẩm mới  */}
        <NewProduct />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "30px",
          }}
        >
          <div style={{ width: "700px", height: "300px" }}>
            <div>
              <img
                style={{ borderRadius: "13px" }}
                height={"300px"}
                width={"100%"}
                src="https://web1594.sangiaodichweb.com/dtool/data/computer/web1594/slide-1.jpg"
                alt=""
              />
            </div>
          </div>
          <div style={{ width: "700px", height: "300px" }}>
            <div>
              <img
                style={{ borderRadius: "13px" }}
                height={"300px"}
                width={"100%"}
                src="https://cdn.tgdd.vn/Files/2022/09/07/1465850/tu-26-8-21-9-2022-trai-cay-cac-loai-khuyen-mai-chi-tu-18000d-202209071258179650.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div>
          {/* sản phẩm bán chạy  */}
          <SellProduct />
        </div>
        {/*  */}
        <div
          style={{
            width: "98%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "30px",
            height: "400px",
          }}
        >
          <img
            style={{ borderRadius: "13px" }}
            width={"100%"}
            height={"100%"}
            src="https://web1594.sangiaodichweb.com/dtool/data/computer/web1594/thang-vang-uu-dai.jpg"
            alt=""
          />
        </div>
        {/*  sản phẩm thịnh hành */}
        <TopProduct />
        {/*  blog*/}

        <BlogProduct/>
      </div>
    </>
  );
}
export default Carousel;
