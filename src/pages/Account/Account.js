import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import axios from 'axios';
import { AppContext } from "../../utils/AplicationContext";
import { useContext } from 'react';
// import { PhotoCamera } from '@material-ui/icons/PhotoCamera';
// import { IconButton } from '@mui/material';


function Account() {
  /* ****************************** */
  const aplicationContext = useContext(AppContext);
  const [user, setUser] = useState({
      name:'', 
      email: '',
      _id: '',
      image: null,
    }
  )
  useEffect(() => {
    const data = localStorage.getItem('data')
      /* ****************************** */
    setUser(JSON.parse(data).user)
      /* ****************************** */
    console.log(data)
  },[])

  /* ****************************** */

  const handleSubmit = 
  (event) => {
     event.preventDefault(); 
      axios.put(`http://localhost:4200/api/users/${user._id}`, {
      email: user.email,
      name: user.name,
      image: user.image,
    }).then( res => {
      alert('User has been updated!');
      let previousData = JSON.parse(localStorage.getItem('data'));
      previousData.user = res.data.data;
      localStorage.setItem('data', JSON.stringify(previousData))
        /* ****************************** */
      aplicationContext.setContext({ user: res.data.data });
        /* ****************************** */
    }, err => console.log('err', err.message))
  };

  const handlePicture = ({ target }) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
       setUser({...user, image:e.target.result})
    };
};


  return (
    <>
   
    <Container sx={{width: "40%"}}>
    <Typography variant="h3" component="h3">
      Account Settings
    </Typography>
    <Box component="form" alignItems="center"  justifyContent="center"
     noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="name"
                type="name"
                id="name"
                autoComplete="name"
                value={user?.name}
                onChange={(e) => setUser({...user, name: e.target.value })}
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
                value={user?.email}
                onChange={(e) => setUser({...user, email: e.target.value })}
              />
              <input
                    accept="image/*"
                    id="icon-button-photo"
                    type="file" 
                    onChange={(e)=>{
                      handlePicture(e)
                    }}
                />
                {/* <label htmlFor="icon-button-photo">
                    <IconButton color="primary" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label> */}

              
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
      
              
            </Box>
            </Container>

    <div>{user?.name}</div>
    <div>{user?.email}</div>
   
    </>
  )
}

export default Account