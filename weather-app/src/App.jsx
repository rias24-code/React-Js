import { useState } from 'react'
import './App.css'
import Clock from "./components/Clock"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"

function App() {
  const [darkMode,setDarkMode] = useState(false);
  return (
    <>
    <div className={darkMode ? 'app dark' : 'app'}>
      <button className='theme-toggle' onClick={ () => setDarkMode(!darkMode)}>
        {darkMode ? " 🌞 Light mode " : "🌚 Dark mode"}
      </button>
      <div className="container">
          <h1>⛅ Weather App</h1>
          <Clock />
          <SearchBar />
          <WeatherCard />
          <footer>- Built by Riaz</footer>
      </div>
      </div>
    </>
  )
}

export default App
