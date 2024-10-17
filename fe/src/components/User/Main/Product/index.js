import React from 'react'
import './Product.css'
// import Products from './product'
import Category from './category'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';


export default function Product() {
  return (
    <div className="container" style={{ marginBottom:'30px'}}>
      <div className="row">
      
        <div className="col-12 col-md-3">
          <Category />
        </div>
        <div className="col-12 col-md-9">
          {/* <Products /> */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
