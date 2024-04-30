import React, { useState, useEffect } from 'react';
import { client } from '../client';
import { productQuery, bannerQuery } from '../utils/data';
import HeroBanner from './HeroBanner';
import Product from './Product';
import Footer from './Footer';
import FooterBanner from './FooterBanner';

const Homepage = () => {
  const [bannerData, setBannerData] = useState({});
  const [productData, setProductData] = useState([]);
  console.log(productData[0])
  useEffect(() => {
    client.fetch(productQuery).then((data) => setProductData(data))
    client.fetch(bannerQuery).then((data) => setBannerData(data[0]))
  }, [])
  return (
    <div>
      <HeroBanner
        smallText={bannerData?.smallText}
        mediumText={bannerData?.mediumText}
        largeText={bannerData?.largeText}
        image={bannerData?.image}
        buttonText={bannerData?.buttonText}
        descr={bannerData?.descr}
        slug={productData[0]?.slug.current}
      />
      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Speakers of many variation</p>
      </div>
      <div className="products-container">
        {productData?.map((item) => <Product key={item.id} slug={item.slug} name={item.name} image={item.image} price={item.price}/>)}
      </div>
      <FooterBanner
        smallText={bannerData?.smallText}
        mediumText={bannerData?.mediumText}
        largeText={bannerData?.largeText}
        largeText2={bannerData?.largeText2}
        image={bannerData?.image}
        buttonText={bannerData?.buttonText}
        descr={bannerData?.descr}
        discount={bannerData?.discount}
        saletime={bannerData?.saleTime}
        slug={productData[0]?.slug.current}/>
      <Footer/>
    </div>
  )
}

export default Homepage
