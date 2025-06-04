import React from 'react';
import {categoryImage} from './categoryInfo';
import CategoryCard from './categoryCard';
import Class from './category.module.css';


export default function Category() {
  return (
    <div className={Class.category__container}>
       {
        categoryImage.map((obj,index)=>(
          <CategoryCard data={obj}/> 
        ))
       }
    </div>
  )
}
