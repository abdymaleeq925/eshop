import React from 'react';
import { urlFor } from '../client';
import { Link } from 'react-router-dom';

const FooterBanner = (props) => {
  return (
    <div className='footer-banner-container'>
        <div className='banner-desc'>
          <div className='left-desc'>
            <p>{props.discount}</p>
            <h1>{props.largeText}</h1>
            <h1>{props.largeText2}</h1>
            <p>{props.saletime}</p>
            {props.image && <img src={urlFor(props?.image)} className='footer-banner-image'/>}
          </div>
        </div>  
        <div className='banner-desc'>
          <div className='right-desc'>
            <p>{props.smallText}</p>
            <h3>{props.mediumText}</h3>
            <p>{props.descr}</p>
          </div>
          <Link to={`/product/${props.slug}`}><button type="button" className='btn btn-secondary'>{props.buttonText}</button></Link>
        </div>
    </div>
  )
}

export default FooterBanner
