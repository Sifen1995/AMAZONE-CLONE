import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import  Class from './lowerheader.module.css'

export default function LowerHeader() {
  return (
    <div className={Class.container}>
       <ul>
         <li className={Class.container__list}>
            <MenuIcon/>
            <p>All</p>
         </li>
         <li>Today's Deals</li>
         <li>Coustomer Service</li>
         <li>Registry</li>
         <li>Gift Card</li>
         <li>Sell</li>
       </ul>
    </div>
  )
}


