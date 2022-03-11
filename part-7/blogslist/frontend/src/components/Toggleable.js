import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

export const Toggleable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div style={{ margin: '1em 0 ' }} >
      <div style={hideWhenVisible}>
        <button type="button" className="btn btn-outline-dark" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="btn btn-dark" onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  );
});

Toggleable.displayName = 'Toggleable';
Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
