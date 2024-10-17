 import { Link } from "react-router-dom";
function NewVoucher(){
    return(
        <>
            <div style={{padding:'30px'}}>
            <h3> Thêm mã giảm giá</h3>
                 <div class="mb-3 row">
                    <label  class="col-sm-2 col-form-label" style={{fontWeight:'900'}}>Tên</label>
                    <div class="col-sm-4">
                    <input type="text"  class="form-control" style={{fontWeight:'500'}} placeholder='Tên Mã Giảm Giá...' />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label  class="col-sm-2 col-form-label" style={{fontWeight:'900'}}>Mã sản phẩm</label>
                    <div class="col-sm-4">
                    <input type="text" class="form-control"  placeholder='Tên Mã Sản Phẩm...'/>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label  class="col-sm-2 col-form-label" style={{fontWeight:'900'}}>Giảm giá</label>
                    <div class="col-sm-4">
                    <input type="text" class="form-control"  placeholder='Giảm Giá...' />
                    </div>
                </div>
                
                <Link to="/admin/voucher" >  <button type="button" class="btn btn-secondary" style={{marginRight:'20px'}}>Trở về</button></Link>

                <button type="button" class="btn btn-primary" style={{fontWeight:'900'}}>Thêm mã giảm giá</button>
            </div>
        
        </>
    )
}

export default NewVoucher;