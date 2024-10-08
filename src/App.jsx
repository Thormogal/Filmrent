import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)


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
