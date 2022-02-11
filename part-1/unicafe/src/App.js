import React, { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td> {text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ data }) => {
  const { good, neutral, bad } = data;
  const all = good + neutral + bad;
  const average = all / 3;
  const positive = (good / all) * 100;

  const displayStatistics = () => {
    if (all === 0) return 'No feedback given';
    return (
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positive}%`} />
      </table>
    );
  };

  return (
    <div>
      <h1>Statistics</h1>
      {displayStatistics()}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodFeedback = () => {
    setGood(good + 1);
  };
  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1);
  };
  const handleBadFeedback = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <Button text="good" handleClick={handleGoodFeedback} />
        <Button text="neutral" handleClick={handleNeutralFeedback} />
        <Button text="bad" handleClick={handleBadFeedback} />
      </div>
      <Statistics data={{ good, neutral, bad }} />
    </div>
  );
};

export default App;
