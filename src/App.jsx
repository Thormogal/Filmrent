import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector } from 'react-redux'
import Cart from './Components/cart'
import CheckOut from './Components/CheckOut'


function App() {



const apiURL = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_READTOKEN;

  return (
    <>
      <div>
      <h1>Filmrent</h1>
        
      </div>
    </>
  )
}

export default App
