
import MovieCollection from './Components/movieCollection';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomeScreen from './HomeScreen';
import './App.css';
import Cart from './Components/cart';
import CheckOut from './Components/CheckOut';
import IndividualMovieInfo from './Components/individualMovieInfo';
import Profile from './Components/Profile'; 

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
          <Route path='/movies' element={<MovieCollection />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/movie-info" element={<IndividualMovieInfo />} />
          <Route path="/movie-info/:movieId" element={<IndividualMovieInfo />} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
