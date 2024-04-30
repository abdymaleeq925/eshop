import React from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from '../client'

const Product = ({name, image, price, slug}) => {
  return (
    <div>
      <Link to={`/product/${slug?.current}`}>
        <div className="product-card">
          {image && <img className='product-image' src={urlFor(image && image[0])}/>}
          <p className='product-name'>{name}</p>
          <p className='product-price'>$ {price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
