import React, { useState,useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import RelatedProduct from './RelatedProduct'

const ProductDetails = () => {
  const [product, setProduct] = useState()
  const {id} = useParams()

  const url = 'https://mernprojectecommerce-9.onrender.com/api'
 
  // when ever my browser reload my want to fetch all the data--> for that useEffect help
  useEffect(()=>{
   const fetchedProduct = async () =>{
    const api = await axios.get(`${url}/product/${id}`,{
      headers:{
        "Content-Type":"Application/json"
      },
      withCredentials:true
    })
    console.log(api.data.findProdById);
    setProduct(api.data.findProdById)
   }
   fetchedProduct();
  },[id])

  return (
    <>
    <div className="container text-center my-5"
    style={{
      display:'flex',
      justifyContent:'space-evenly',
      alignItems:'center'
    }}
    >
      <div className="left">
        <img src={product?.imgSrc} alt="" style={{width:"250px", height:"300px",borderRadius:"10px",border:"2px solid yellow"}} />
      </div>
      <div className="right">
        <h1>{product?.title}</h1>
        <p>{product?.description}</p>
        <h1>{product?.price}{" "}{"₹"}</h1>
        <div className='my-5'>
          <button className='btn btn-danger mx-3' style={{fontWeight:'bold'}}>Buy Now</button>
          <button className='btn btn-warning' style={{fontWeight:'bold'}}>Add to cart</button>
        </div>
      </div>
    </div>

     
     <RelatedProduct category={product?.category}/>
    </>
  )
}

export default ProductDetails