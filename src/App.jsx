
import MovieCollection from './Components/movieCollection';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomeScreen from './HomeScreen';
import './App.css';
import Cart from './Components/cart';
import Profile from './Components/Profile';
import Contact from './Contact'; 
import CheckOut from './Components/CheckOut';
import IndividualMovieInfo from './Components/individualMovieInfo';
import CartSmall from './Components/CartSmall';
import {animate, motion} from 'framer-motion';
import CartToast from './Components/CartToast';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const apiURL = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiToken = import.meta.env.VITE_API_READTOKEN;
  const [showSmallCart, setShowSmallCart] = useState(false);
  // const [showToast, setShowToast] = useState(false);
  const dispatch =  useDispatch();
  const showToast = useSelector(state => state.cart.showToast);

  return (
    <div className="app-container">
      <Header showSmallCart={showSmallCart} setShowSmallCart={setShowSmallCart}/>
      <main className="main-content">
        <motion.div className='cart-small'
        initial={{x: "100%"}}
          animate={{x: showSmallCart ? '0%': '100%'}}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }} >
            <CartSmall showSmallCart={showSmallCart} setShowSmallCart={setShowSmallCart} />

        </motion.div>
       
       <motion.div className='cart-toast'
        initial={{opacity: 0}}
        animate={{opacity: showToast ? 1 : 0}}
       >
          <CartToast/>
       </motion.div>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path='/movies' element={<MovieCollection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie-info/:movieId" element={<IndividualMovieInfo />} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
