import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
 

function CreateUser() {
    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget); 

        axios.post('http://localhost:4200/api/users', {
          name: data.get('name'),
          email: data.get('email'),
          password: data.get('password'),
        }).then( res => {
           localStorage.setItem('token', JSON.stringify(res.data))
           navigate("/products")
      
        }).catch(err => {
            alert("Verifique se os dados foram preenchidos corretamente")
            console.log('err', err.message)
        })
      };
  return (
    <Container sx={{width: "35%"}}>
      <Typography variant="h4" component="h4">
        Create a new user account
    </Typography>
    <Box component="form" alignItems="center"  justifyContent="center"
     noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
  )
}

export default CreateUser; 