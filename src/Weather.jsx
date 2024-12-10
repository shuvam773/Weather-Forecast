import React, { useState } from "react";
import './Weather.css';

const api = {
  key: "bdb9ddb48a0f8eb60c54155ec2400c33",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const search = async (evt) => {
    if (evt.key === "Enter") {
      setError(""); // Clear any previous error
      try {
        const res = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
        const result = await res.json();
        if (result.cod === 200) {
          setWeather(result);
          setQuery("");
        } else {
          setError("City not found. Please try again.");
          setWeather({});
        }
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Failed to fetch data. Please try again later.");
      }
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];
    let days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className={(typeof weather.main !== "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={search}
          />
        </div>
        {error && <div className="error-message">{error}</div>} {/* Error message */}

        {weather.main ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys?.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather">
                {weather.weather ? weather.weather[0].main : ''}
              </div>
            </div>
          </div>
        ) : (
          <div className="no-data">Enter a city to get the weather forecast.</div>
        )}
      </main>
    </div>
  );
};

export default Weather;
