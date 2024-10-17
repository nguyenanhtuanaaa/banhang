import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../../../App";
import AdminBlog from "../../Admin/blog";
import NewAdminBlog from "../../Admin/blog/newblog";
import UpdateAdminBlog from "../../Admin/blog/updateblog";
import AdminCategory from "../../Admin/category";
import NewAdminCategory from "../../Admin/category/newadmincategory";
import UpdateAdminCategory from "../../Admin/category/updatecategory";
import Comment from "../../Admin/comment";
import Admin from "../../Admin/home";
import HomeMain from "../../Admin/home/homemain";
import OrderProduct from "../../Admin/order";
import UpdateOrderProduct from "../../Admin/order/updateorder";
import AdminProduct from "../../Admin/product";
import NewAdminProduct from "../../Admin/product/newadminproduct";
import UpdateAdminProduct from "../../Admin/product/updateadminproduct";
import ThongKe from "../../Admin/thongke";
import AdminUser from "../../Admin/User";
import NewAdminUser from "../../Admin/User/newuser";
import UpdateAdminUser from "../../Admin/User/updateuser";
import Voucher from "../../Admin/voucher";
import NewVoucher from "../../Admin/voucher/newvoucher";
import UpdateVoucher from "../../Admin/voucher/updatevoucher";
import Order from "../Heading/login/order";
import Account from "../Heading/login/taikhoan";
import Blog from "./blog";
import DetailBlog from "./blog/detailblog";
import Cart from "./Cart";
import Infor from "./Cart/infor";
import Contact from "./Contact";
import DetailProduct from "./DetailProduct";
import Home from "./Home";
import Introduce from "./Introduce";
import News from "./News";
import OrderSuccess from "./Order/OrderSuccess";
import Product from "./Product";
import Products from "./Product/product";
import LoginAdmin from "../../Admin/login";
import ProtectedRoute from "../../Admin/login/checklogin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />,
        children: [
          {
            path: "products/:categoryId",
            element: <Products />,
          },
          {
            path: "products",
            element: <Products searchQuery="" />,
          },
        ],
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "detailblog/:_id",
        element: <DetailBlog />,
      },
      {
        path: "introduce",
        element: <Introduce />,
      },
      {
        path: "detail-product/:_id",
        element: <DetailProduct />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "acount",
        element: <Account />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "order/payment",
        element: <OrderSuccess />,
      },

      {
        path: "cart",
        element: <Cart />,
        children: [
          {
            path: "infor",
            element: <Infor />,
          },
        ],
      },
    ],
  },

  {
    path:"loginadmin",
    element:<LoginAdmin />,
  },
  {
    path: "/admin",
    element:( 
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>),
    children: [
      {
        path: "adminproduct",
        element: <AdminProduct />,
      },
      {
        path: "/admin",
        element: <HomeMain />,
      },
      {
        path: "newadminproduct",
        element: <NewAdminProduct />,
      },
      {
        path: "updateadminproduct/:id",
        element: <UpdateAdminProduct />,
      },
      {
        path: "admincategory",
        element: <AdminCategory />,
      },
      {
        path: "newadmincategory",
        element: <NewAdminCategory />,
      },
      {
        path: "updateadmincategory/:id",
        element: <UpdateAdminCategory />,
      },
      {
        path: "adminuser",
        element: <AdminUser />,
      },
      {
        path: "newuser",
        element: <NewAdminUser />,
      },
      {
        path: "updateuser/:id",
        element: <UpdateAdminUser />,
      },
      {
        path: "adminblog",
        element: <AdminBlog />,
      },
      {
        path: "newblog",
        element: <NewAdminBlog />,
      },
      {
        path: "updateblog/:id",
        element: <UpdateAdminBlog />,
      },
      {
        path: "orderproduct",
        element: <OrderProduct />,
      },

      {
        path: "updateorderproduct/:id",
        element: <UpdateOrderProduct />,
      },
      {
        path: "comment",
        element: <Comment />,
      },
      {
        path: "voucher",
        element: <Voucher />,
      },
      {
        path: "newvoucher",
        element: <NewVoucher />,
      },
      {
        path: "updatevoucher/:id",
        element: <UpdateVoucher />,
      },

      {
        path: "thongke",
        element: <ThongKe />,
      },
    ],
  },
]);

export default router;
