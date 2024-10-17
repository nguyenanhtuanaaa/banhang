import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { get } from "../../../utils/httpRequest";

function OrderProduct() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const ordersPerPage = 8;
  const [customers, setCustomers] = useState({}); // Store customer data

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await get(`/admin/orders?page=${currentPage}&limit=${ordersPerPage}`);
        if (response.code !== 200) {
          throw new Error("Network response was not ok");
        }
  
        setTotalPage(response.data.paginate.totalPages);
        const data = response.data.data;
  
        setOrders(data);
        setFilteredOrders(data);
  
        // Fetch customer details based on customerIds in orders
        const customerIds = [...new Set(data.map(order => order.customerId))].filter(id => id); // Unique and defined customerIds
        console.log("Fetched customerIds:", customerIds);
  
        const customerResponses = await Promise.all(
          customerIds.map(id => get(`/admin/customers/${id}`)) // Fetch customer data
        );
  
        // Store customers in state
        const customerData = customerResponses.reduce((acc, curr) => {
          if (curr.code === 200) {
            acc[curr.data._id] = curr.data; // Assuming customer response includes _id
          }
          return acc;
        }, {});
  
        setCustomers(customerData);
  
      } catch (error) {
        console.error("There was an error fetching the orders!", error);
      }
    };
  
    fetchOrders();
  }, [currentPage]);
  

  console.log("filteredOrders", filteredOrders);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <input
              type="search"
              placeholder="Search..."
              style={{
                borderRadius: "6px",
                border: "1px solid #777777",
                paddingRight: "30px",
                height: "38px",
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i
              className="fa-solid fa-magnifying-glass"
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
              }}
            ></i>
          </div>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Tên khách hàng</th>
                <th scope="col">Địa chỉ giao hàng</th>
                <th scope="col">Phương thức thanh toán</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Trạng thái đơn hàng</th>
                <th scope="col">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td style={{ fontSize: "18px", fontWeight: "500", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                      {order._id}
                    </td>
                    <td style={{ fontSize: "18px", fontWeight: "500" }}>
                      {customers[order.customerId] ? customers[order.customerId].fullname : 'N/A'}
                    </td>
                    <td style={{ fontSize: "18px", fontWeight: "500", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                      {order.location ? order.location.address : 'N/A'}
                    </td>
                    <td style={{ fontSize: "18px", fontWeight: "500" }}>
                      {order.paymentMethod ? order.paymentMethod.methodName : 'N/A'}
                    </td>
                    <td style={{ fontSize: "18px", fontWeight: "500" }}>
                      {customers[order.customerId] ? customers[order.customerId].phone : 'N/A'}
                    </td>
                    <td style={{ fontSize: "18px", fontWeight: "500" }}>
                      {order.status === 1 && "Đã xác nhận"}
                      {order.status === 2 && "Đã vận chuyển"}
                      {order.status === 3 && "Đã hủy"}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                        <Link to={`/admin/updateorderproduct/${order._id}`}>
                          <i className="fa-solid fa-edit" style={{ fontSize: "20px" }}></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Không có đơn hàng nào!!</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                    Trước
                  </button>
                </li>
                {[...Array(totalPage).keys()].map((page) => (
                  <li key={page + 1} className={`page-item ${currentPage === page + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                      {page + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPage ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                    Sau
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderProduct;
