import { useEffect, useState } from "react";
import loader from "./assets/loader.svg"
import "./App.css"
import browser from "./assets/browser.svg"
const APIKEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {

  const [weatherData, setWeatherData] = useState(null)
  const [errorInfo, setErrorInfo] = useState(null)

  useEffect(() => {
    fetch(`http://api.airvisual.com/v2/nearest_ciy?key=${APIKEY}`)
      .then(response => {
        console.log(response);
        // pour les erreurs 400-499 (erreur clients) et erreur 500-599 (erreur serveur)
        // la methode catch ne les "catch" pas
        if (!response.ok) throw new Error (`Error ${response.status}, ${response.statusText}`)
        return response.json();
      })
      .then(responseData => {
        console.log(responseData);
        setWeatherData({
          city: responseData.data.city,
          contry: responseData.data.contry,
          iconId: responseData.data.current.weather.ic,
          temperature: responseData.data.current.weather.tp,

        })
      })
      .catch(err => {
        setErrorInfo(err.message)
      })
  }, [])

  return (

    <main>
      <div className={`loader-container ${(!weatherData && !errorInfo) && "active"}`}>
        <img src={loader} alt="Loading icon" />
      </div>
      {weatherData && (
        <>
          <p className="city-name">{weatherData.city}</p>
          <p className="contry-name">{weatherData.contry}</p>
          <p className="temperature">{weatherData.temperature}°</p>
          <div className="info-icon-container">
            <img src={`/icons/${weatherData.iconId}.svg`} className="info-icon" alt="weather icon" />
          </div>
        </>
      )}

      {(errorInfo && !weatherData) && (
        <>
          <p className="error-information">
            {errorInfo}
          </p>
          <img src={browser} alt="" />
        </>
      )}
    </main>

  );
}

export default App;
