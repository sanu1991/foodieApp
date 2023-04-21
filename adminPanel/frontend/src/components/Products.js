import React, { useEffect, useState } from 'react'
import ProductComponent from './subComponents/ProductComponent'

const Products = (props) => {
  const {productDetails, addProductinput} = props;

  return (
    <div style={{ padding: "2%" }}>
      <ProductComponent productDetails={productDetails} addProductinput={addProductinput} />
    </div>
  )
}

export default Products