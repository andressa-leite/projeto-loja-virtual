import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/AplicationContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function ShoppingCartList() {
  const aplicationContext = useContext(AppContext);

  //FUNCTION TO ADD PRODUCT TO THE SHOPPING CART IS INSIDE PRODUCT.JS FILE

  //DELETE ITEM FUNCTION
  const removeShoppingCartListItem = (index) => {
    const products = aplicationContext.context?.shoppingCart;
    products.splice(index, 1);
    aplicationContext.setContext({
      user: aplicationContext.context.user,
      shoppingCart: products,
    });
  };

  //ADD ITEM FUNCTION

  const plus_ShoppingCartListItem = (index) => {
    let products = aplicationContext.context?.shoppingCart;
    products = products.map( (item, i) => {
      if(i === index) {
        item.quantity += 1
      }
      return item
    });
    aplicationContext.setContext({
      user: aplicationContext.context.user,
      shoppingCart: products,
    });
  };

  //DECREASE ITEM FUNCTION

  const minus_ShoppingCartListItem = (index) => {
    let products = aplicationContext.context?.shoppingCart;
    products = products.map( (item, i) => {
      if(i === index) {
        item.quantity -= 1
      }
      return item
    });
    aplicationContext.setContext({
      user: aplicationContext.context.user,
      shoppingCart: products,
    });
  };
  

  //UPDADE QUATITY FUNCTION
  /*  const handleUpdateItem = (item, action) => {
    console.log({ item });
    let newQuantity = item.quantity;
    if (action === increase) {
      newQuantity += 1;
    }
    if (action === decrease) {
      newQuantity -= 1;
    }
    const newData = { ...item, quantity: newQuantity };
    console.log({ newData });

    api.put(`/cart/${item._id}`, newData).then((response) => {
      console.log({ response });
      fetchData();
    });
  }; */
  
  return (
    <>
      <Box
        style={{
          width: "21%",
          background: "whitesmoke",
          padding: "15px",
          position: "fixed",
          float: "right",
          right: "0",
          minHeight: "308px",
          zIndex: "9999",
          top: "64px",
        }}
      >
        <Box>
          <div>
            {aplicationContext.context?.shoppingCart?.map((p, index) => (
              
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <IconButton
                  onClick={() => removeShoppingCartListItem(index)}
                  aria-label="delete"
                  size="small"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
                <Box
                  component="img"
                  sx={{
                    height: 43,
                    width: 45,
                    padding: "4px",
                    border: "2px solid #d5d5d5",
                    borderRadius: "8px",
                    background: "white",
                  }}
                  alt="Product"
                  src={p.image}
                />
                <Typography variant="subtitle1" color="text.secondary">
                  {p.name.length <= 15 ? p.name : p.name.substr(0, 8) + "..."}(
                  {p.quantity})
                </Typography>

                {/* ***************************************************************** */}
                <ButtonGroup sx={{ width: "10px" }}>
                  <Button onClick={()=>minus_ShoppingCartListItem(index)}>
                    <RemoveIcon />
                  </Button>
                  <Button onClick={()=>plus_ShoppingCartListItem(index)}>
                    <AddIcon />
                  </Button>
                </ButtonGroup>
                {/* ***************************************************************** */}
              </Box>
            ))}
          </div>
        </Box>

        <Typography variant="h6">
          <span>Total: $</span>
          {aplicationContext.context?.shoppingCart?.reduce(
            (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),
            0
          )?.toFixed(2)}
        </Typography>
      </Box>
    </>
  );
}

export default ShoppingCartList;
