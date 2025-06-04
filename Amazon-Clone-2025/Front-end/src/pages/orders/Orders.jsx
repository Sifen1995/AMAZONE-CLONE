import React, { useEffect, useState, useContext } from 'react';
import Layout from '../../components/layout/Layout';
import Class from './orders.module.css';
import { db } from '../../utiltiy/fierbase';
import { DataContext } from '../../components/DataProvider/DataProvider';
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

import ProductCard from '../../components/product/ProductCard';

// export default function Orders() {
//   const { user } = useContext(DataContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (!user) {
//       setOrders([]);
//       return;
//     }

//     const ordersRef = collection(db, 'users', user.uid, 'orders');
//     const q = query(ordersRef, orderBy('created', 'desc'));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const updatedOrders = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         data: doc.data(),
//       }));
//       setOrders(updatedOrders);
//     });

//     return () => unsubscribe(); // Clean up on unmount
//   }, []);

//   return (
//     <Layout>
//       <section className={Class.container}>
//         <div className={Class.order__container}>
//           <h2>Your Orders</h2>
//           <div>
//             {orders.length === 0 && <p>You don't have orders yet.</p>}
//             {orders.map((order,i) => (
              
//                 <div key={order.i}>
//                   <hr />
//                   <p>Order ID:{order?.id}</p>
//                   {
//                     order?.data.basket?.map((o)=>{
//                       return  <ProductCard
//                       flex={true}
//                       item={o}
//                       key={o.id}/>
//                     })
//                   }
//                 </div>
               
             
//             ))}
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }

 export default function Orders() {
  const { user, dispatch } = useContext(DataContext)
  const [orders, setOrders] =  useState([])
  
  useEffect(() => {
    if (user) {
    
      const ordersRef = collection(doc(db, "users", user.uid), "orders");

     
      const ordersQuery = query(ordersRef, orderBy("created", "desc"));

     
      onSnapshot(ordersQuery, (snaps) => {
        console.log( snaps);
        
        setOrders(snaps.docs.map((doc) => ({
          id: doc.id,
          data:doc.data()
        })))
      });
    } else {
      setOrders([])
    }


  }, [])
  return (
    <Layout>
      <section className={Class.container}>
        <div className={Class.order__container}>
          <h2> Your Orders</h2>
          {
            orders?.length==0 && <div style={{padding: "20px"}}> You don't have orders yet.</div>
          }
          <div>
            {
              orders?.map((eachorders, i) => {
                return (
                  <div key={i}>
                    <hr />
                    <p>Order ID : {eachorders?.id}</p>
                    {
                      eachorders?.data.basket?.map(order => {
                        return (
                          <ProductCard
                            flex={true}
                            item={order}
                            key={order.id}
                          />
                        );
                      
                      })
                    }
                  </div>
                )
              })
            }

          </div>
        </div>
      </section>
    </Layout>
  )
}

