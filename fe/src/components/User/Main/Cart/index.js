import React, { useEffect, useState } from "react";
import { Outlet, useLocation ,useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import "./Cart.css";
import ProductCart from "./productcart";
import Total from "./totalproduct";
import { deleteMethod, get, put } from "../../../../utils/httpRequest";

export default function Cart() {
  const [showComponents, setShowComponents] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get("/v1/carts");
        const data = res.data.products;

        const cartWithProductDetails = await Promise.all(
          data.map(async (item) => {
            const productRes = await get(`/v1/products/${item.productId}`);
            const productDetails = productRes.data;
           
            return {
              ...item,
              productDetails, 
            };
          })
        );

        setCart(cartWithProductDetails); 
        console.log(setCart(cartWithProductDetails)); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    console.log(cart);
    fetchData();
  }, []);

  const updateProductQuantity = async (id, newQuantity) => {
    try {
      const res = await put(`/v1/carts/update/${id}`, {
        quantity: newQuantity,
      });
      if (res.code !== 200) {
        throw new Error("Failed to update the product quantity");
      }
      return res.data;
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleUpdateQuantity = async (id, quantity) => {
    if (quantity < 1) {
      quantity = 1;
    } else if (quantity > 10) {
      quantity = 10;
    }

    const updatedItem = await updateProductQuantity(id, quantity);
    if (updatedItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === updatedItem._id
            ? { ...item, quantity: updatedItem.quantity }
            : item
        )
      );
    }
  };

  const handleChange = (event, id) => {
    const value = Number(event.target.value);
    if (value < 1 || value > 10) return;

    setCart((prevCart) =>
      prevCart.map((product) =>
        product._id === id ? { ...product, quantity: value } : product
      )
    );

    handleUpdateQuantity(id, value);
  };

  const handleRemove = async (_id) => {
    try {
      const res = await deleteMethod(`/v1/carts/delete/${_id}`, {
        method: "DELETE",
      });

      if (res.code === 200) {
        setCart((prevCart) => prevCart.filter((product) => product._id !== _id));
        Swal.fire({
          icon: "success",
          title: "Xóa sản phẩm thành công!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        console.error("Failed to delete the product from the database");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const totalAmount = cart.reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);

  useEffect(() => {
    setShowComponents(location.pathname === "/cart");
  }, [location]);

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        flexDirection: "row",
        margin: "0 auto",
        width: "90%",
        marginBottom: "20px",
      }}
    >
      {showComponents && (
        <>
          {cart.length > 0 ? (
            <>
              <div style={{ width: "750px", placeSelf: "normal", marginBottom: "150px" }}>
                <ProductCart
                  cart={cart}
                  handleUpdateQuantity={handleUpdateQuantity}
                  handleChange={handleChange}
                  handleRemove={handleRemove}
                />
              </div>
              <div style={{ width: "490px", marginBottom: "auto" }}>
                <Total totalAmount={totalAmount} />
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <img
                src="https://salanest.com/img/empty-cart.webp"
                alt="Giỏ hàng trống"
                style={{ width: "300px", height: "auto", marginBottom: "50px" }}
              />
              <p>Giỏ hàng của bạn đang trống!</p>
            </div>
          )}
        </>
      )}
      <Outlet />
    </div>
  );
}
