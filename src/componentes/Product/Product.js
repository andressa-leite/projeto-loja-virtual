import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function Product() {

  const [data, setData] = useState({id: ""})
  const [loading, setLoading] = useState(true)
  
  let{id} = useParams()
  

    useEffect(()=>{
        
        axios.get('https://fakestoreapi.com/products/'+id).then(res=>{
            setData(res.data)
            console.log(res)
            setLoading(false)
        },err=> {
            console.log(err)
            setLoading(false)
        })
    }, [])

  return (
    <div>
      {loading ? "Loading" : 
        <>
          <h1> {data.title}</h1>
          <img src={data.image}/>
          <p>{data.description}</p>
        </>
      }
    </div>
  )
}

export default Product;