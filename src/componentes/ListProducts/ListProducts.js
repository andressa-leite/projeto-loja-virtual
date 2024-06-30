import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, TextField, CardActions, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { CircularProgress } from "@mui/material";

function ListProducts() {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://api.andressaportfolio.com/api/products").then(
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

  useEffect(() => {
    if (search) {
      setLoading(true);
      axios.get(`http://api.andressaportfolio.com/api/products?search=${search}`).then(
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
    }
  }, [search]);

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        style={{ width: 450 }}
      />
      <Grid style={{ padding: 30 }} container spacing={4}>
        {loading ? (
          <div
            className="loadingIcon"
          >
            <CircularProgress />
          </div>
        ) : (
          data.map((item) => {
            return (
              <Grid item xs={3}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/products/${item._id}`}
                >
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt="Product"
                    />
                    <CardContent>
                      <Typography
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {item.name}
                      </Typography>

                      <Typography
                        style={{
                          /* whiteSpace: "nowrap", */
                          overflow: "hidden",
                          /* textOverflow: "ellipsis", */
                          padding: 8,
                        }}
                        variant="body2"
                        color="text.secondary"
                      >
                        {item.description.length <= 55
                          ? item.description
                          : item.description.substr(0, 55) + "..."}
                      </Typography>
                      <Typography variant="h6">{"$" + item.price}</Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        paddingTop: 0,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                      </Box>
                      <Box
                        sx={{
                          "& > legend": { mt: 2 },
                          paddingRight: 1,
                        }}
                      >
                        <Rating
                          name="read-only"
                          value={item.rating.rate}
                          readOnly
                          size="small"
                        />
                      </Box>
                    </CardActions>
                  </Card>
                </Link>
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
}

export default ListProducts;
