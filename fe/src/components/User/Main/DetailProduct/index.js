import React from 'react'
import DanhGia from './danhgia'
import './DetailProduct.css'
import Image from './img'
import ProductSlide from './productslide'
import { useParams } from 'react-router-dom'; 

export default function DetailProduct() {
  const { productId } = useParams();

  return (
    <>
      <div>
        <Image />
      </div>
      <div>
        <DanhGia productId={productId} /> 
      </div>
      <div>
        <ProductSlide />
      </div>
    </>
  );
}