import React, { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/product/ProductCard';
import CurrencyFormat from '../../components/currencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import Class from './cart.module.css';
import {Type} from '../../utiltiy/ActionType';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';


export default function Cart() {
  const { basket, dispatch } = useContext(DataContext); 
  const total = basket.reduce((amount, item) =>{  return item.price * item.amount + amount}, 0);
  const increment=(item)=>{
     dispatch({
      type:Type.ADD_TO_BASKET,
      item
     })
  }

  const decrement=(id)=>{
       dispatch({
        type:Type.Remove_FROM_BASKET,
        id
       })
  }

  console.log('Basket items:', basket); 

  return (
    <Layout>
      <section className={Class.container}>
        <div className={Class.cart__container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {
  basket?.length === 0 ? (
    <p>Oops! No item in your cart</p>
  ) : (
    basket?.map((item, i) => {
      return  <section className={Class.cart_product}>
           <ProductCard
        key={i}
        item={item}
        renderDiscription={true}
        flex={true}
        renderAdd={false}
      />
      <div className={Class.button_container}>
        <button onClick={()=>increment(item)}><KeyboardArrowUpOutlinedIcon /></button>
        <span>{item.amount}</span>
        <button onClick={()=>decrement(item.id)}><KeyboardArrowDownOutlinedIcon /></button>
      </div>
      </section>
    })
  )
}

        </div>
       {basket?.length !==0&&(
      <div className={Class.subtotal}>
         <div><p>subtotal ({
          basket?.length} items)</p>
          <CurrencyFormat amount={total}/>
          </div>
          <span >
            <input type="checkbox" />
            <small>This order contains a gift </small>
          </span>
          <Link to={"/payment"}>Continue to cheack out</Link>
         </div> 
          
       )} 
        
      </section>
    </Layout>
  );
}
