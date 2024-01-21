import React from 'react';
import { Box, Container } from '@mui/material';
import {Typography} from '@mui/material';

function ItemCard() {
  return (
    <Container>
        <Box>
            <Typography variant='h3'>Choose from Categories</Typography>
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
                src={"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"}
              />
        </Box>
    </Container>
    
  )
}

export default ItemCard