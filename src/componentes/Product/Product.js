import React, { useEffect } from 'react'

function Product() {
    useEffect(()=>{
        let{id} = useParams()
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
    <div>Product</div>
  )
}

export default Product