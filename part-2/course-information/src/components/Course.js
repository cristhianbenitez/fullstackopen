import React from 'react';

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ name, exercise }) => {
  return (
    <p>
      {name} {exercise}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part name={part.name} exercise={part.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts
    .map((part) => part.exercises)
    .reduce((prevValue, currValue) => prevValue + currValue);

  return <p>Number of exercises {totalExercises} </p>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
