import React from 'react'
import ProductComponent from './subComponents/ProductComponent'

const UpdateProducts = (props) => {
  const {productDetails, addProductinput, menuinput ,setMenuinput, fldname3, handleChange, handleChange3} = props;
  return (
    <div style={{ padding: "2%" }}>
      <ProductComponent productDetails={productDetails} addProductinput={addProductinput} menuinput={menuinput} fldname3={fldname3} setMenuinput={setMenuinput} handleChange={handleChange} handleChange3={handleChange3} />
    </div>
  )
}

export default UpdateProducts