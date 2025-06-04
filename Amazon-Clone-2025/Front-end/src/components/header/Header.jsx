import React, { useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import logo from '../../assets/amazone_logo.png';
import  Classes from './header.module.css';
import LowerHeader from '../lowerHeader/LowerHeader';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../utiltiy/fierbase';


export default function Header() {
   const { basket, user, dispatch } = useContext(DataContext);
    
    const totalItem=basket?.reduce((amount,item)=>{
      return item.amount +amount
    },0)
  return (
    <>
     <section className={Classes.fixed}>
       <div className={Classes.header__container}>
        <div className={Classes.logo__container}>
            <Link to={"/"}>
            <img src={logo} alt="amazonelogo" /></Link>
            <div className={Classes.delivery}>
            <span><LocationOnOutlinedIcon/> </span>
            <div>
                <p>Deliverd To</p>
                <span>Ethiopia</span>
            </div>
           </div> 
        </div>

        <div className={Classes.search}>
           <select name="" id="">
            <option value="">All</option>
           </select>
           <input type="text" name="" id="" placeholder='search product'/>
            <SearchIcon size={25}/>
        </div>

        <div className={Classes.order__container}>
                <Link href="" className={Classes.language}>
                <img src="https://icons.iconarchive.com/icons/wikipedia/flags/256/US-United-States-Flag-icon.png" alt="" />
                <select name='' id=''>
                    <option value="">EN</option>
                </select>
                </Link>
                <Link to={!user && "/auth"}>

                    <div>
                     { user?(
                         <>
                          <p>{user.email?.split("@")[0]}</p>
                          <span onClick={()=>auth.signOut()}>sign out</span>
                          </>
                        ): (
                          <>
                         <p>Sign In</p>
                         <span >Accoount & Lists</span>
                         </>
                        )
                      }                    
                      
                       
                    </div>
                    
                        
                       
                    
                </Link>

                <Link to={"/orders"}>
                    <p>return</p>
                    <span>& Orders</span>
                </Link>
                <Link to={"/cart"} className={Classes.cart}>
                    <ShoppingCartOutlinedIcon size={40}/> 
                    <span>{totalItem}</span>
                </Link>
           
        </div>
       </div>
       <LowerHeader/>
     </section>  
    </>
  )
}
