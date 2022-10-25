import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, TextField} from '@mui/material';
import { Link } from "react-router-dom";



function List(){
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState([]);

    const [search, setSearch] = useState('');

    useEffect(()=>{
        axios.get('https://fakestoreapi.com/products').then(res=>{
            setData(res.data)
            console.log(res)
            setLoading(false)
        },err=> {
            console.log(err)
            setLoading(false)
        })
    },[]);

    useEffect(()=>{
        if(search) {
            setLoading(true)
            axios.get('https://fakestoreapi.com/products/category/jewelery').then(res=>{
                setData(res.data)
                console.log(res)
                setLoading(false)
            },err=> {
                console.log(err)
                setLoading(false)
            })
        }
        
    },[search]);

    return(
        <div>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" value={search} onChange={(event)=>{setSearch(event.target.value)}}/>
            <Grid container spacing={4}>
            
            {loading ? <p>Carregando</p> : 
            data.map(item=> {
                return(
                  <Grid  item xs={4}>
                    <Link to={`/products/${item.id}`}>
                        <Card>
                            <CardMedia
                            component="img"
                            height="140"
                            image={item.image}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {item.description}
                            </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                    </Grid>
                )

                {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
             })}
            </Grid>
        </div>
    );
}

 {/* <div>
                        <p>{item.title}</p>
                        <img src={item.image} /> 
                        <p>{item.description}</p>
                </div> */}

export default List;