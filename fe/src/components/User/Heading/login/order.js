function Order(){
    return(
        <>
        <div style={{ display:'flex',gap:'20px',justifyContent:'center',alignItems:'center',width:'90%',flexWrap:'wrap',margin:'0 auto',boxShadow:' 0 1px 2px 0 rgba(0, 0, 0, .13)'}}>
                                
                                <div style={{width:'100%'}} >
                                    <label for="exampleInput" class="form-label" style={{ fontSize:'25px',color:' #20242e',textTransform:"uppercase",fontWeight:'700'}}>THÔNG TIN VẬN CHUYỂN</label>
                                </div>
                                <div style={{width:'350px'}}>
                                    <label for="exampleInput" class="form-label" style={{ fontSize:'17px',color:' #20242e',textTransform:"uppercase",fontWeight:'700'}}>Họ Tên</label>
                                    <input type="text" class="form-control"  />
                                </div>
                                <div style={{width:'350px'}}>
                                    <label for="exampleInput" class="form-label" style={{ fontSize:'17px',color:' #20242e',textTransform:"uppercase",fontWeight:'700'}}>Địa Chỉ</label>
                                    <input type="text" class="form-control" />
                                </div>
                                <div style={{width:'350px'}}>
                                    <label for="exampleInput" class="form-label" style={{ fontSize:'17px',color:' #20242e',textTransform:"uppercase",fontWeight:'700'}}>Số Điện Thoại</label>
                                    <input type="phone" class="form-control" />
                                </div>
                                <div style={{width:'350px'}}>
                                    <label for="exampleInput" class="form-label" style={{ fontSize:'17px',color:' #20242e',textTransform:"uppercase",fontWeight:'700'}}>Ghi Chú</label>
                                    <input type="text" class="form-control" />

                                </div>
                                <button type="button" class="btn btn-primary" style={{marginBottom:'40px'}}>CẬP NHẬT THÔNG TIN VẬN CHUYỂN</button>
                                
                    </div>
        
        <div style={{width:'90%',display:'flex',justifyContent:"center",alignItems:'center',margin:'0 auto',flexWrap:'wrap', marginTop:'50px',marginBottom:'50px'}}>
        <table class="table" >
            <thead>
                <tr className='thcol'>
                <th scope="col" className='thcoll'>Sản Phẩm</th>
                <th scope="col" className='thcoll'>Tên Sản Phẩm</th>
                <th scope="col" className='thcoll'>Đơn Giá</th>
                <th scope="col" className='thcoll'>Số Lượng</th>
                </tr>
            </thead>
            <tbody>
                <tr className='tdcol' >
                
                <td style={{width:'200px'}} ><img src="https://hoaquafuji.com/storage/app/media/NEWS/cac-loai-trai-cay-nhap-khau.jpg" width={'100px'} height={'100px'} /></td>
                <td className='tdcoll'>hoa quả</td>
                <td className='tdcoll'>300.000đ</td>
                <td className='tdcoll'>1</td>
                
                </tr>
              
                
            </tbody>
            </table>
            <div  style={{display:'flex',justifyContent:"end",alignItems:'center',width:'90%',gap:'20px'}}>

                   <span style={{fontSize:'20px',fontWeight:'400px',color: 'rgb(255, 255, 255)',backgroundColor:'rgb(238, 77, 45)',borderRadius:'4px',padding:"20px"}}> Đã Xác Nhận </span>
                 
                  <div>
                  <label style={{fontSize:'25px',fontWeight:'600px',marginRight:'20px'}}>Thành Tiền:</label>
                   <span style={{fontSize:'25px',fontWeight:'600px',color: '#ee4d2d'}}> <i class="fa-solid fa-dong-sign"></i>3000 </span>
                  </div>
                </div>
          
           
        </div>
        </>
    )
}

export default Order;