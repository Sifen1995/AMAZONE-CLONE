import React from 'react';
import Class from './category.module.css';
import { Link } from 'react-router-dom';




export default function CategoryCard({data}) {
 
  return (
    <div className={Class.category}>
      <Link to={`/category/${data.name}`}>
        <span>
            <h2>{data.title}</h2>
        </span>
        <img src={data.image} alt={data.name } />
        <p>shope now</p>
      </Link>
    </div>
  )
}
//`${ base_url}/${data.name}`