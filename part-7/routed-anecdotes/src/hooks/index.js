import React from 'react';

export const useFields = (type) => {
  const [value, setValue] = React.useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => setValue('');

  return { value, onChange, type, reset };
};
