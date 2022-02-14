import React from 'react';
import axios from 'axios';
const api_key = process.env.REACT_APP_API_KEY;

export const Weather = ({ city }) => {
  const [data, setData] = React.useState([]);
  const { main, wind, weather } = data;
  const icon = weather && weather[0]?.icon;
  React.useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
      )
      .then((res) => {
        setData(res.data);
      });
  }, []);
  return weather ? (
    <div>
      <h2>Weather in {city}</h2>
      <p>temperature {main?.temp}° Celsius </p>
      {weather && (
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather icon"
        />
      )}
      <p>wind {wind?.speed} m/s</p>
    </div>
  ) : (
    <p style={{ color: 'red ' }}>
      we were not able to retrieve weather information
    </p>
  );
};
