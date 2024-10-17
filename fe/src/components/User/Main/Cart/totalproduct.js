// Total.js
import { Link } from 'react-router-dom';
import './Cart.css';

function Total({ totalAmount }) {
  return (
    <div>
      <h3 className='h3'>
        Tổng tiền
      </h3>
      <center>
        <table className="table">
          <tbody>
            <tr>
              <th scope="col" className='thcoll'>Tạm Tính</th>
              <td scope="col" className='tdcolll'>{totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            </tr>
            <tr>
              <th scope="row" className='thcoll'>Tổng</th>
              <td className='tdcolll'>{totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            </tr>
          </tbody>
        </table>
        <Link to={{ pathname: '/cart/infor', state: { totalAmount } }}>
          <button type="button" className="btn btn" style={{ backgroundColor: '#83bb3e', width: '250px', fontSize: '15.52px', lineHeight:'37.248px', fontWeight: '500', color: '#fff' }}>Tiến Hành Thanh Toán</button>
        </Link>
      </center>
     
    </div>
  );
}

export default Total;
