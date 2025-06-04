import { Type } from '../../utiltiy/ActionType';
import React,{useState,useEffect,useContext} from 'react';
import Layout from '../../components/layout/Layout';
import Class from './auth.module.css';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { auth } from '../../utiltiy/fierbase';
import { signInWithEmailAndPassword ,createUserWithEmailAndPassword } from 'firebase/auth';
import { DataContext } from '../../components/DataProvider/DataProvider';
import {PulseLoader} from "react-spinners";



export default function Signup() {
   const[email,setEmail]=useState("")
   const[password,setPassword]=useState("")
   const [error,setError]=useState("")
   const [loading, setLoading] = useState({
    signIn:false,
    signUP:false
   }); 
   const { user, dispatch } = useContext(DataContext);
   const navigation=useNavigate();
   const navStateData=useLocation();
   console.log(navStateData);


//  console.log(user) 
 const authHandeler=async(e)=>{  
    e.preventDefault()

    const buttonName = e.nativeEvent.submitter?.name;
  console.log(buttonName); 

    
    if(buttonName==="signIn"){
     setLoading(prev => ({ ...prev, signIn: true }));
     signInWithEmailAndPassword(auth,email,password)
     .then((userInfo)=>{
    
      dispatch({
        type:Type.SET_USER,
        user:userInfo.user
      })
       setLoading(prev => ({ ...prev, signIn: false }));
       navigation(navStateData?.state?.redirect || "/")
    })
     .catch((err)=>{
      console.log(err.message)
      setError(err.message)})
      setLoading(prev => ({ ...prev, signIn: false }));
    }
    else{
     setLoading(prev => ({ ...prev, signUP: true }));
   createUserWithEmailAndPassword(auth,email,password)
    
   .then((userInfo)=>{
    
     dispatch({
        type:Type.SET_USER,
        user:userInfo.user
      })
      
   setLoading(prev => ({ ...prev, signUP: false }));
   navigation(navStateData?.state?.redirect || "/")
   })
   .catch((err)=>{
    console.log(err)
    setError(err.message)
    setLoading(prev => ({ ...prev, signUP: false }));
   })

    }
 }
  return (
    <Layout >
      <Link  to={"/"}> <img src="https://pngimg.com/uploads/amazon/amazon_PNG12.png" alt="logo"
       className={Class.logo} />
      </Link>
       <section className={Class.container}>
        <h3>Sign-in</h3>
        {navStateData?.state?.msg && ( <small style={{
          padding:"5px",
          textAlign:"center",
          color:"red",
          fontWeight:"bold",
        }}>{navStateData?.state?.msg}</small>)}
         <form action="submit" method="post" onSubmit={authHandeler}>
           <label htmlFor="email">E-mail</label>
           <input value={email} type="email" placeholder='E-mail' onChange={(e)=>setEmail(e.target.value)} />
           <label htmlFor="Password">Password</label>
           <input type="password" placeholder='Password' width={10} value={password} onChange={(e)=>setPassword(e.target.value)}/>

            <button type="submit" className={Class.signin_button}  name='signIn'>{loading.signIn?(<PulseLoader color='#fff' size={10}></PulseLoader>):("Sign In") }</button>
         <div className={Class.discription}>
          <p>By signing in you agree to the AMAZON FAKE CLONE Condithions of use & Sale. Pleas see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice</p>
         </div>
         <button type="submit" className={Class.signup_button}  name='signUp'>Create your Amazone Account</button>
         {
          error && <small style={
            {
              alignSelf:"center",
              justifyContent:"center",
              padding:"5px",
              color:"red"
            }
          }>
            {error}
          </small>
         }
         </form>
        
       </section>
    </Layout>
  )
}
