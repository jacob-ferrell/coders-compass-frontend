import { useState, useEffect } from 'react'
import './App.css'
import LoginPage from './pages/Login/LoginPage'
function App() {
  const [data, setData] = useState(null)
  useEffect(() => {
    const apiURL = 'http://127.0.0.1:8000/api';
    fetch(apiURL)
      .then((res => res.json()))
      .then(data => setData(data.data))
      .then(() => console.log(data))
  }, [])
  return (
    <LoginPage />
  )
}

export default App
