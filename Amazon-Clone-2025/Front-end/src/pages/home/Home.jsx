import React from 'react';
import Layout from '../../components/layout/Layout';
import Carousele from '../../components/carousel/carousel';
import Category from '../../components/category/Category';
import Product from '../../components/product/product';





export default function Home() {
  return (
    <Layout>
     
      <Carousele/>
        <Category/>
        <Product/>
    </Layout>
  )
}

