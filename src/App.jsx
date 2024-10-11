
import MovieCollection from './Components/movieCollection'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomeScreen from './HomeScreen';
import './App.css';
import Cart from './Components/cart'
import CheckOut from './Components/CheckOut'


function App() {
  
const apiURL = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_READTOKEN;
  
  return (


    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );



}

export default App;