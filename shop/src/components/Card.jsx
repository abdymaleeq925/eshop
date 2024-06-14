import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/StateContext';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShopping, AiOutlineRight } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { urlFor } from '../client';
import { toast } from 'react-hot-toast';
import { runFireworks } from '../utils/data';


const Card = () => {
  const { setShowCard, cartItems, totalQuantities, totalPrice, toggleCartItemQuantity, onRemove } = useStateContext();
  const navigate = useNavigate();
  const handleCheckout = async()=> {
    try {
      navigate('/');
      setShowCard(false);
      runFireworks();
      toast.success('Your payment has been successfull');
    }
    catch (err) {
      console.error('Error during checkout')
    }
  }

  return (
    <div className='card-wrapper'>
      <div className='card-container'>
        <button className='close-card-icon' type='button' onClick={() => setShowCard(false)}><AiOutlineRight />
          <span className='card-heading'>Your Cart</span>
          <span className='card-num-items'>{totalQuantities}</span>
        </button>
        {
          cartItems.length < 1 &&
          <div className='empty-card'>
            <AiOutlineShopping />
            <h3>Your shopping cart is empty</h3>
            <button className='btn' type='button' onClick={() => setShowCard(false)}>Continue shopping</button>
          </div>
        }
        <div className='product-container'>
          {cartItems.length >= 1 &&
            cartItems?.map((product, index) => (
              <div className='product' key={index}>
                {product?.image && <img src={urlFor(product.image[0])} className='cart-product-image' alt=''/>}
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{product?.name}</h5>
                    <h4>${product?.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                      <p className='quantity-desc'>
                        <span className="minus" onClick={() => toggleCartItemQuantity(product._id, 'dec')}><AiOutlineMinus /></span>
                        <span className="num">{product.quantity}</span>
                        <span className="plus" onClick={() => toggleCartItemQuantity(product._id, 'inc')}><AiOutlinePlus /></span>
                      </p>
                    </div>
                    <button type="button" className='remove-item' onClick={() => onRemove(product)}><TiDeleteOutline /></button>
                  </div>
                </div>
              </div>
            ))}
          {
            cartItems.length > 0 &&
              <div className='cart-bottom'>
                <div className='total'>
                  <h3>Subtotal: </h3>
                  <h3>${totalPrice}</h3>
                </div>
                <div className='btn-container'>
                  <button className='btn' type='button' onClick={handleCheckout}>Pay with Stripe</button>
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Card
