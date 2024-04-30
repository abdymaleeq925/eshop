import React from 'react'; 
import { Routes, Route } from 'react-router-dom';
import { Homepage, Navbar, ProductDetail, Success} from './components'

import './App.css';

function App() {
  return (
    <div className="App">
      <div className='main-container'>
        <Navbar/>
        <Routes>
          <Route path='/' element = {<Homepage/>}/>
          <Route path='/product/:slug' element = {<ProductDetail/>}/>
          <Route path='/success' element = {<Success/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
