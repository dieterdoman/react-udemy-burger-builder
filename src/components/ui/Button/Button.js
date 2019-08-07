import React from 'react';
import classes from './Button.module.css';
import PropTypes from 'prop-types';

const Button = (props) => (
    <button disabled={props.disabled} className={[classes.Button, classes[props.buttonType]].join(' ')} onClick={props.clicked}>{props.children}</button>
);

Button.propTypes = {
  buttonType: PropTypes.string.isRequired,
  clicked: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;
