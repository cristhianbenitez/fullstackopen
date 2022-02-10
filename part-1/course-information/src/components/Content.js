import React from 'react';
import { Part } from './Part';

export const Content = (props) => {
  const [part1, part2, part3] = props.parts;
  return (
    <>
      <Part part={part1.name} exercise={part1.exercises} />
      <Part part={part2.name} exercise={part2.exercises} />
      <Part part={part3.name} exercise={part2.exercises} />
    </>
  );
};
