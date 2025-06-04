import React from 'react';
import Layout from '../../components/layout/Layout';
import Carousele from '../../components/carousel/carousel';
import Category from '../../components/category/Category';
import Productt from '../../components/product/Product';





export default function Home() {
  return (
    <Layout>
     
      <Carousele/>
        <Category/>
        <Productt/>
    </Layout>
  )
}

