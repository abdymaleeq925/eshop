import React from 'react';
import { AiOutlineTwitter, AiOutlineInstagram } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2024 TechnoShop GSM All Rights Reserved</p>
      <div className="icons">
        <AiOutlineInstagram/> <AiOutlineTwitter/>
      </div>
    </div>
  )
}

export default Footer
