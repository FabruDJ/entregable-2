import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [weather, setWeather] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isCelsius, setIsCelsius] = useState(true)

  const celsius = Number((weather.main?.temp - 273.15).toFixed(1))
  const celsiusMin = Number((weather.main?.temp_min - 273.15).toFixed(1))
  const celsiusMax = Number((weather.main?.temp_max - 273.15).toFixed(1))

  const fahrenheit = Number(((celsius * 9/5) + 32).toFixed(1))
  const fahrenheitMin = Number(((celsiusMin * 9/5) + 32).toFixed(1))
  const fahrenheitMax = Number(((celsius * 9/5) + 32).toFixed(1))

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succes)

    function succes (pos) {
      const crd = pos.coords 

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=d1b18195925d0f28f0afeed59754248a`)
        .then(res => {
          setWeather(res.data)
          setIsLoading(false)
        })
    }
  }, [])
  
  return (
    <div className="App">
      {
        isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
          <div className="weather-card">
            <h1>Weather</h1>
            <h2>{weather.name} | {weather.sys?.country}</h2>
            <div className="icon-temp">
              <img src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
              <p>{isCelsius ? celsius : fahrenheit} {isCelsius ? 'ºC' : 'ºF'}</p>
            </div>
            <div className="max-min">
              <div className="min">
                <i className="fa-solid fa-temperature-three-quarters"></i>
                <p>MIN: {isCelsius ? celsiusMin : fahrenheitMin} {isCelsius ? 'ºC' : 'ºF'}</p>
              </div>
              <div className="max">
                <i className="fa-solid fa-temperature-three-quarters"></i>
                <p>MAX: {isCelsius ? celsiusMax : fahrenheitMax} {isCelsius ? 'ºC' : 'ºF'}</p>
              </div>
            </div>
            <button onClick={() => {setIsCelsius(!isCelsius)}}>Change to {isCelsius ? 'Fahrenheit' : 'Celsius'}</button>
        </div>
      </>
        )
      }
    </div>
  )
}

export default App
