import React, { useContext } from "react";
import { AppContext } from "../../utils/AplicationContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography } from "@mui/material";

function ShoppingCartList() {
  const aplicationContext = useContext(AppContext);
  const removeShoppingCartListItem = (index) => {
    const products = aplicationContext.context?.shoppingCart;
    products.splice(index, 1);
    aplicationContext.setContext({
      user: aplicationContext.context.user,
      shoppingCart: products,
    });
  };

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
          top: "64px"
        }}
      >
        <Box>
        <Typography variant="subtitle1" color="text.secondary">
          {aplicationContext.context?.shoppingCart?.map((p, index) => (
            
            <p>
              {/* <Box
                component="img"
                sx={{
                  height: 43,
                  width: 55,
                  maxHeight: { xs: 43, md: 36 },
                  maxWidth: { xs: 55, md: 45 },
                  paddingRight: 10,
                }}
                alt="Product"
                src={p.image}
              /> */}
              {p.name.length <= 15
              ? p.name
              : p.name.substr(0, 15) + "..."} 
              <IconButton
                onClick={() => removeShoppingCartListItem(index)}
                aria-label="delete"
                size="small"
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </p>
          ))}
        </Typography>
        <Typography variant="h6">
          <span>Total: $</span>
          {aplicationContext.context?.shoppingCart?.reduce(
            (accumulator, currentValue) => accumulator + currentValue.price,
            0
          )}
        </Typography>
        </Box>
      </Box>
    </>
  );
}

export default ShoppingCartList;
