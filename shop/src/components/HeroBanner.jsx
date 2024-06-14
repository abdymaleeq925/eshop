import React from 'react';
import { urlFor } from '../client';
import { Link } from 'react-router-dom';

const HeroBanner = (props) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{props.smallText}</p>
        <h3>{props.mediumText}</h3>
        <h1>{props.largeText}</h1>
        {props.image && <img src={urlFor(props?.image)} className='hero-banner-image'/>}
        <div>
          <Link to={`/product/${props.slug}`}><button type="button" className='btn btn-primary'>{props.buttonText}</button></Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>{props.descr}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
