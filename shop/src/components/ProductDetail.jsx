import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillStar, AiOutlineStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { client, urlFor } from '../client';

import { useStateContext } from '../context/StateContext';
import Product from './Product';
import Footer from './Footer';

const ProductDetail = () => {
  const { slug } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const [imgIndex, setImgIndex] = useState(0);
  const [likeProduct, setLikeProduct] = useState([]);
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const queryLike = `*[_type == "product"]`;

  const { quantity, incQty, decQty, onAdd, setShowCard } = useStateContext()
  const { cartItems, totalQuantities, totalPrice } = useStateContext();

  useEffect(() => {
    client.fetch(query).then((data) => {
      setProductDetail(data);
    })
    client.fetch(queryLike).then((data) => {
      setLikeProduct(data);
    })
  }, []);

  const handleBuyNow = () => {
    onAdd(productDetail, quantity);
    setShowCard(true);
  }

  const { image, name, details, price, _id } = productDetail;

  return (
    <div>
      <div className="product-detail-container">
        <div className="image-gallery">
          <div className="image-container">
            {image && <img src={urlFor(image && image[imgIndex])} className="product-detail-image" alt=''/>}
          </div>
          <div className='small-images-container'>
            {
              image && image?.map((img, index) => <img key={index} src={urlFor(img)} alt='' className={index === imgIndex ? 'selected-image small-image' : 'small-image'} onMouseEnter={() => setImgIndex(index)}/>)
            }
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiOutlineStar/>
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus/></span>
              <span className="num">{quantity}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus/></span>
            </p>
          </div>
          <div className="buttons">
            <button className='btn add-to-cart'onClick={() => onAdd(productDetail, quantity)}>Add to cart</button>
            <button className='btn buy-now' onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {
              likeProduct && likeProduct?.filter(product => product?._id !== _id).map((product) => (
                <Product key={product?._id} name={product?.name} image={product?.image} price={product?.price} slug={product?.slug}/>
              ))
            }
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default ProductDetail