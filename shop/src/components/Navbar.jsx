import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Card from './Card';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCard, setShowCard, totalQuantities } = useStateContext();
  return (
    <div className='navbar-container'>
      <p>
        <Link to='/'>TechnoShop GSM</Link>
      </p>
      <button className='card-icon' type='button' onClick={() => setShowCard(true)}>
        <AiOutlineShopping/>
        <span className='card-item-qty'>{totalQuantities}</span>
      </button>

      { showCard && <Card/> }
    </div>
  )
}

export default Navbar
