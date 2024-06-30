import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
// import { Resend } from 'resend'

function CreateUser() {
  const [hideMsg, setHideMsg] = useState(true);

  const navigate = useNavigate();
  /*     const sendEmail = async () => {
      const resend = new Resend('re_QxGg15yA_4n7bMS6pXrHQn7vS6N3wyP3i')
      const data = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["dre_tl@hotmail.com"],
        subject: "Hello World",
        html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
      })
    } 

    useEffect( () =>{ 
      sendEmail();
    },[])
 */

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post("http://18.217.147.241:4200/api/users", {
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((res) => {
        setHideMsg(false);
        localStorage.setItem("data", JSON.stringify(res.data));
        // navigate("/products")
      })
      .catch((err) => {
        alert("Verifique se os dados foram preenchidos corretamente");
        console.log("err", err.message);
      });
  };
  return (
    <Container sx={{ width: "35%" }}>
      {!hideMsg && <Alert severity="success">User created!</Alert>}
      <Typography variant="h4" component="h4">
        Create a new user account
      </Typography>
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
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
        />

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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Account
        </Button>
      </Box>
    </Container>
  );
}

export default CreateUser;
