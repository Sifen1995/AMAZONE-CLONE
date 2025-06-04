import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import  axios  from 'axios';
import Class from './results.module.css'
import ProductCard from '../../components/product/ProductCard';


export default function Result() {

  const {categoryName}=useParams();
  const [product,setProduct]=useState(null)

  useEffect(()=>{
     axios.get(`https://fakestoreapi.com/products/category/${categoryName}`)
     .then(res=>setProduct(res.data))
     .catch(err=>console.log(err) )     
  },[categoryName])
  console.log(product)
  if(!product) return <p>Loading....</p>

  return (
    <div>
      <div className={Class.head}>
        <h3>Result</h3>
        <p>Category/{categoryName}</p>
      </div>
      <hr />
    <div className={Class.card_list}>     
      {product.map((p)=>(
          <div > 
           
            <ProductCard item={p} renderAdd={true}/>
          </div>
      ))}   

      
    </div>
    </div>
  )
}
