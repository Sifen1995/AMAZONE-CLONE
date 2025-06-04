import React, { useContext } from 'react';
import { Rating } from '@mui/material';
import CurrencyFormat from '../currencyFormat/CurrencyFormat';
import Class from './product.module.css'
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../utiltiy/ActionType';

export default function ProductCard({item,flex,renderDiscription, renderAdd}) {
  if (!item) return null;

  const {
    id,
    image,
    title,
    description,
    price,
    rating = { rate: 0, count: 0 },
  } = item;

  const{state,dispatch }=useContext(DataContext)

 const addToCart=()=>{
   dispatch({
    type:Type.ADD_TO_BASKET,
    item:{
      image,title,id,rating,price,description
    }
   }

   )
 }

  return (
    <div key={item.id} className={`${Class.card__container} ${flex?Class.product__flex:''}`}>
       <Link to={`/products/${id}`}>
         <img src={image} />
       </Link>
       <div>
         <h3>{title}</h3>
         {renderDiscription && <div style={
          {
            maxWidth:"500px",
          }
         }>{description}</div>}
         <div className={Class.rating}>
              <Rating value={5} precision={0.1}/>
              <small>{rating.count}</small>
         </div>
         <div>
           <CurrencyFormat amount={price}/>
         </div>
         {renderAdd &&  <button className={Class.button} onClick={addToCart}>add to cart</button>}
         
       </div>
    </div>
  )
}
