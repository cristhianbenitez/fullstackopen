import React from 'react';
import { Details } from './Details';

export const Country = ({ data }) => {
  const [show, setShow] = React.useState(false);
  const { name } = data;

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <p>
        {name.common} <button onClick={handleShow}>show</button>
      </p>

      {show && <Details data={data} />}
    </>
  );
};
