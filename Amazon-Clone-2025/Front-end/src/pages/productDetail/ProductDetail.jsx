import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import axios  from 'axios';
import Class from './productdetail.module.css';
import { Rating } from '@mui/material';
import CurrencyFormat from '../../components/currencyFormat/CurrencyFormat';
import ProductCard from '../../components/product/ProductCard';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';



export default function ProductDetail() {

  const [singleProduct, setSingleProduct]=useState({})
  const [loading,setloading]=useState(false)
  const {id}=useParams()

  useEffect(()=>{
      setloading(true)
      axios.get(`https://fakestoreapi.com/products/${id}`) 
      .then((res)=>{setSingleProduct(res.data)
        
      })
      .catch(err=>console.log(err))
      .finally(() => setloading(false)); 
  },[id])

 

  console.log(singleProduct)
  return (  
    <Layout> 
    {loading? (<Loader/>):(
      <div className={Class.detail}>
       <ProductCard item={singleProduct}
       flex={true}
       renderDiscription={true}
       renderAdd={true}/>
       
    </div>
    )}
     
    </Layout> 
    
  )
}
