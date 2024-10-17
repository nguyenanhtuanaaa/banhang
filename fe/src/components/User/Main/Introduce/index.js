import React from "react";
import "./Introduce.css";

export default function Introduce() {
  return (
    <div
      style={{
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          marginTop: "20px",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "620px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <img
            src="https://vnn-imgs-f.vgcloud.vn/2021/08/04/21/ruoc-buc-mua-rau-cu-cho-mang.jpg"
            width={"100%"}
          />
        </div>
        <div style={{ width: "500px" }}>
          <p style={{ fontSize: "20px",color:'#777' }}>
            Trong đời sống vai trò của thực phẩm là rất quan trọng. Trên thực tế
            thực phẩm sẽ cung cấp cho con người nguồn năng lượng, dưỡng chất để
            duy trì sự sống và phát triển cơ thể một cách toàn diện từ thể lực
            cho tới trí tuệ. Tuy nhiên, thực phẩm bẩn, thực phẩm sử dụng hóa
            chất được bán tràn lan ở thị trường gây ảnh hưởng nghiêm trọng tới
            sức khỏe của người tiêu dùng. Chúng ta cần hiểu được tầm quan trọng
            và vai trò của thực phẩm sạch đối với cơ thể để có thể sáng suốt
            trong cách chọn thực phẩm cho gia đình và cho bản thân mình .
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          marginTop: "20px",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ width: "500px" }}>
          <p style={{ fontSize: "20px",color:'#777' }}>
            Vai trò của thực phẩm sạch đối với cơ thể:
            <br />
            - Bảo đảm an toàn, không lo về vấn đề ngộ độc hay các hậu quả đáng
            tiếc khi sử dụng thực phẩm bẩn như là nhiễm các mầm bệnh, đau bụng,
            thậm chí là ung thư hay tử vong.
            <br />
            - Thực phẩm sạch giúp cho sự phát triển vượt bậc về trí tuệ và thể
            lực khi nó cung cấp đầy đủ các dưỡng chất quan trọng, cần thiết cho
            cơ thể.
            <br />
            - Tăng cường sức đề kháng, giảm thiểu các bệnh tật, sử dụng thực
            phẩm sạch bạn sẽ chế biến được các món ăn ngon hơn, hấp dẫn hơn.
            <br />
          </p>
        </div>
        <div
          style={{
            width: "620px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <img
            src="https://thucphamsachmecool.com/upload/ckfinder/images/455bc18749f2a8acf1e3.jpg"
            width={"100%"}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          marginTop: "20px",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "620px",
            height:'500px',
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <img
            src="https://nld.mediacdn.vn/291774122806476800/2021/8/4/gia-rau-cu-qua-hom-nay-139-sieu-khuyen-mai-ngay-cuoi-tuan-11-1628-1628077149310361573053.jpg"
            width={"100%"}
            height={"100%"}
          />
        </div>
        <div style={{ width: "500px" }}>
          <p style={{ fontSize: "20px",color:'#777'}}>
            Thực phẩm sạch đảm bảo : <br />
            - Hiểu được tâm lý người tiêu dùng, luôn cố gắng trau dồi và học hỏi
            để ra mắt các sản phẩm ngon nhất, gần gũi nhất với đời sống hằng
            ngày.
            <br />
            - Thực hiện quy trình chế biến, các công đoạn cắt, ướp gia vị, sấy,
            đóng gói được đảm bảo vệ sinh an toàn thực phẩm.
            <br />
            - Nguyên liệu được lựa chọn và kiểm tra kỹ càng, sử dụng nguyên liệu
            tươi ngon, không thuốc, không có các chất độc hại để chế biến.
            <br />- Không sử dụng các chất bảo quản.
          </p>
        </div>
      </div>
    </div>
  );
}
