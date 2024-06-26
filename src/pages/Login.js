import React, { useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../utils/AplicationContext";

function Login() {
    /* ****************************** */
  const aplicationContext = useContext(AppContext);
    /* ****************************** */
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post("http://18.217.147.241:4200/api/users/login", {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then(
        (res) => {
          // localStorage.setItem('token', token)
          localStorage.setItem("data", JSON.stringify(res.data));
            /* ****************************** */
          aplicationContext.setContext({ user: res.data.user });
            /* ****************************** */
          navigate("/products");
        },
        (err) => console.log("err", err.message)
      );
  };
  return (
    <Container sx={{ width: "30%" }}>
      <Box
        component="form"
        alignItems="center"
        justifyContent="center"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/users/create" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Box>
    </Container>
  );
}

export default Login;
