import React from 'react';
import { Weather } from './Weather';

export const Details = ({ data }) => {
  const { name, languages, area, capital, flags } = data;

  return (
    <>
      <h2>{name.common}</h2>
      <p>Capital: {capital} </p>
      <p>Area: {area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt={`flag of ${name.official}`} />
      <Weather city={capital} />
    </>
  );
};
