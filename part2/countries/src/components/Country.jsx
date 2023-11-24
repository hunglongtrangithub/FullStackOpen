import React, { useEffect, useState } from "react";
import weatherService from "../services/weather";

const Country = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching weather data for", country.name.common);
    weatherService
      .getWeatherInCapital(country)
      .then((data) => {
        setWeatherInfo(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setIsLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.keys(country.languages).map((key, index) => (
          <li key={index}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
      {isLoading ? (
        <p>Loading weather information...</p>
      ) : (
        <>
          <p>{weatherInfo.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
            alt={weatherInfo.weather[0].main}
          ></img>
          <p>description: {weatherInfo.weather[0].description}</p>
          <p>wind: {weatherInfo.wind.speed} m/s</p>
          <p>direction: {weatherInfo.wind.deg} degrees</p>
        </>
      )}
    </div>
  );
};

export default Country;
