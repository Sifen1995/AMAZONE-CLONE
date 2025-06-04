import React, { useContext,useState } from 'react';
import Layout from '../../components/layout/Layout';
import Class from './payment.module.css'
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/product/ProductCard';
 import {useStripe,useElements,CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../components/currencyFormat/CurrencyFormat';
import { axiosInstance } from '../../API/axios';
import {ClipLoader} from "react-spinners";
import { db } from '../../utiltiy/fierbase';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Type } from '../../utiltiy/ActionType';


export default function Payment() {

const {basket,user,dispatch}=useContext(DataContext);
const [error,setCardError]=useState(null );
const [processing,setprocess]=useState(false)
const stripe=useStripe();
const elements=useElements();
const navigate =useNavigate()

  console.log(user);
  console.log("Basket:", basket);

  const totalItem=basket?.reduce((amount,item)=>{
      return item.amount +amount
    },0);


  const total = basket.reduce((amount, item) =>{  return item.price * item.amount + amount;}, 0);

   const handleChange=(e)=>{
      console.log(e)
      e?.error?.message? setCardError(e?.error?.message):setCardError("")
   };

   const handlePayment=async(e)=>{
    e.preventDefault();

    if (!stripe || !elements) {
    console.error("Stripe.js is not ready");
    return;
  }
   

    //contact the backend to connect to client secret

try{
  setprocess(true)

if (!total || total <= 0) {
  console.error("❌ Invalid total amount:", total);
  return;
}



  const response=await axiosInstance.post(`/payment/create?total=${Math.round(total * 100)}`)
  //   method:"POST",
  //   url:`/payment/create?total=${Math.round(total * 100)}`
  // })
 
  const clientSecret=response.data.clientSecret;

   if (!clientSecret) {
      console.error("No clientSecret returned from backend!");
      return;
    }


    console.log("Client Secret Used:", clientSecret);

   
   //client side confirmation
   const {paymentIntent}=await stripe.confirmCardPayment(
    clientSecret,
    {
       payment_method:{
       card: elements.getElement(CardElement),
       },
    }
   ) ;  
   
   console.log(paymentIntent)

const orderRef = doc(db, "users", user.uid, "orders", paymentIntent.id);

await setDoc(orderRef, {
  basket: basket,
  amount: paymentIntent.amount,
  created: paymentIntent.created,
});
   setprocess(false)
}


  
catch(err){
  console.log(err)
   setprocess(false)
}

dispatch({type:Type.EMPTY_BASKET});

navigate("/orders",{state:{msg:"you have placed your order"}})
}

  return (
    <Layout>
     <div className={Class.header}>Checkout ({totalItem}) items</div>
     <section className={Class.payment}>
      <div className={Class.flex}>
        <h3>Delivery Address</h3>
        <div>
          <div>{user?.email}</div>
          <div>123 React Lane</div>
          <div>Chicago</div>
        </div>
      </div>
      <hr />
      <div className={Class.flex}>
        <h3>Review items and delivery</h3>
        <div  >
           {
            basket?.map((item,index)=><ProductCard item={item} flex={true } key={index}/>)
           }
        </div>
      </div>
      <hr />
      <div className={Class.flex}>
        <h3>Payment Method</h3>
        <div className={Class.payment_card_container}>
         <div className={Class.payment_details}>
           <form method="post"onSubmit={handlePayment} >
            {error && <small style={{color:"red"}}>{error}</small>}
              <CardElement onChange={handleChange}/>
            <div className={Class.price}>
              <div>
                <span style={{display:'flex',gap:'10'}}>
                 <p>Total Order |  </p> <CurrencyFormat amount={total}/>
                </span>
              </div>
              <button type="submit">
                {
                  processing?(
                    <div className={Class.loader}>
                      <ClipLoader color='grey' size={12}/>
                      <p>Pleas Wait... </p>
                    </div>
                  ):"pay now"
                }
               </button>
            </div>
           </form>
         </div>
        </div>
      </div>

     </section>
    </Layout>
  )
}


