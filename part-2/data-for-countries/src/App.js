import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Country } from './components/Country';
import { Details } from './components/Details';

export const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => setCountries(res.data));
  }, []);

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const queryResults = countries.filter((country) =>
    country.name.official.toLowerCase().includes(query.toLowerCase())
  );

  const displayQueryResults = () => {
    if (query.length === 0) return 'Please input a country name';
    if (queryResults.length === 0) return 'We did not found any match';
    if (queryResults.length > 10)
      return 'Too many matches, specify another filter';

    return queryResults.map((country) => {
      const { name, capital, area, languages } = country;

      if (queryResults.length === 1)
        return <Details data={country} key={name.official} />;

      return <Country data={country} key={name.official} />;
    });
  };

  return (
    <div>
      <form>
        find countries{' '}
        <input type="text" value={query} onChange={handleQuery} />
      </form>
      <div>
        <ul>{displayQueryResults()}</ul>
      </div>
      <div></div>
    </div>
  );
};
