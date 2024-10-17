import React from 'react'
import './Contact.css'
export default function Contact() {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'30px',flexWrap:'wrap',margin:'0 auto 30px', width:'90%' }}>
        <div style={{width:'700px'}}> 
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3469.3909426096197!2d108.16507697663107!3d16.075772199592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218e6e72e66f5%3A0x46619a0e2d55370a!2zMTM3IE5ndXnhu4VuIFRo4buLIFRo4bqtcCwgVGhhbmggS2jDqiBUw6J5LCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZywgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2s!4v1718202590644!5m2!1svi!2s" width="700" height="700" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div style={{width:'500px'}}>
            <p style={{ fontSize:'20px',fontWeight:'500',textAlign:'center'}}>
            <b style={{color:'#3c6'}}> THỰC PHẨM SẠCH </b><br/>  
            Chúng tôi luôn cung cấp thực phẩm sạch, chế biến tại nhà, không chất bảo quản rất tốt cho sức khỏe.<br/>

            Rất tiện lợi cho các bạn làm việc tại văn phòng, công việc bận rộn không thể vào bếp thường xuyên.<br/>

            <b style={{color:'#e74c3c'}}>ĐẶC BIỆT GIAO HÀNG TẬN NƠI - NHANH CHÓNG - GIÁ CẢ HỢP LÝ</b><br/>

            Gọi ngay cho mình nhé... thực phẩm chế biến tại nhà số lượng lớn... cần là có ngay...<br/>

            Liên hệ: <b style={{color:'#2980b9'}}> 0002451215 - 0900080984</b><br/>
            </p>
            <div style={{ display:'flex',justifyContent:'center',alignItems:'center',width:'500px',flexWrap:'wrap'}}>
              <input style={{width:'100%',marginTop:'20px',borderRadius:'4px',border:'1px solid #777777'}} type={'text'} placeholder=' Họ Tên'/>
              <input  style={{width:'100%',marginTop:'20px',borderRadius:'4px',border:'1px solid #777777'}} type={'text'} placeholder=' Địa Chỉ'/>
              <input style={{width:'100%',marginTop:'20px',borderRadius:'4px',border:'1px solid #777777'}} type={'text'} placeholder=' Số Điện Thoại'/>
              
              <input  style={{width:'100%',marginTop:'20px',borderRadius:'4px',border:'1px solid #777777'}} type={'email'} placeholder=' Email'/>
              <textarea style={{width:'100%',marginTop:'20px',borderRadius:'4px',border:'1px solid #777777'}} placeholder=' Nội Dung'/>
              <button type="button" style={{ marginTop:'20px'}} class="btn btn-warning">Gửi</button>
            </div>
        </div>
    </div>
  )
}
