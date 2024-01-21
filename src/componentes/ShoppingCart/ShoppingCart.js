import React, { useContext } from "react";
import { AppContext } from "../../utils/AplicationContext";

function ShoppingCart() {
    const aplicationContext = useContext(AppContext);

  return (
    aplicationContext.context?.shoppingCart?.map( p => (<p>p.title</p>))
  )
}

export default ShoppingCart