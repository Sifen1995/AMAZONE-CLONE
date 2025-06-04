import React from 'react';
import {img} from './img/data';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Class from './carousel.module.css';

export default function Carousele() {
  return (
    <div>
       <div className={Class.hero__img}>  
       <Carousel 
          autoPlay={true}  
          infiniteLoop={true}
          showIndicators={false}
          showThumbs={false}   >
          {
            img.map((imageItem)=>{
                return <img src={imageItem} alt="image" />
            })
          }
       </Carousel>
      </div> 
      
    </div>
  )
}
