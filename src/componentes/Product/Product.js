import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Button, Card, Rating, Typography } from "@mui/material";
import { AppContext } from "../../utils/AplicationContext";
import ShoppingCart from "../ShoppingCartList/ShoppingCartList";

function Product() {
  const aplicationContext = useContext(AppContext);
  const [data, setData] = useState({ id: "" });
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost:4200/api/products/" + id).then(
      (res) => {
        setData(res.data);
        console.log(res);
        setLoading(false);
      },
      (err) => {
        console.log(err);
        setLoading(false);
      }
    );
  }, []);
  
  const addToCart = () => {
    const filterShoppingCartList = (arr) => {
      const newArray =[]
      arr.forEach(element => {
        if (newArray.map((item)=>item._id).includes(element._id)) { //toDo - não está funcionando
          const index = newArray.map((item)=>item._id).indexOf(element._id);
          newArray[index].quantity += 1  
        } else {
          newArray.push(element)
        }
      });
      return newArray;
    }
    aplicationContext.setContext({ user: aplicationContext.context.user, shoppingCart: filterShoppingCartList([ ...aplicationContext.context.shoppingCart, {...data, quantity:1}])  });
  }

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <Card
          sx={{ display: "flex" }}
          style={{ border: "none", boxShadow: "none" }}
        >
      {/* <ShoppingCart/> */}

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "left",
                paddingRight: 20,
                paddingLeft: 20,
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 433,
                  width: 550,
                  maxHeight: { xs: 433, md: 367 },
                  maxWidth: { xs: 550, md: 450 },
                  paddingRight: 10,
                }}
                alt="Product"
                src={data.image}
              />
              <Box>
                <Typography
                  sx={{ textAlign: "left" }}
                  component="div"
                  variant="h5"
                >
                  {data.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  sx={{ paddingTop: 3, paddingBottom: 3, textAlign: "justify" }}
                >
                  {data.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6">{"$" + data.price}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={data.rating.rate}
                      readOnly
                    />
                    <Typography
                      component="legend"
                      sx={{ fontSize: "10px", paddingTop: "5px" }}
                    >
                      {`(${data.rating.count} reviews)`}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ paddingTop: 7, float: "left" }}>
                  <Button onClick={addToCart} sx={{ marginRight: 2 }} variant="outlined">
                    Add to Cart
                  </Button>
                  <Button variant="contained">Buy Now</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
      )}
    </>
  );
}

export default Product;
