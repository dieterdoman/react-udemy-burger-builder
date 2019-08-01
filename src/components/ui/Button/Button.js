import React from 'react';
import classes from './Button.module.css';
import PropTypes from 'prop-types';

const Button = (props) => (
    <button className={[classes.Button, classes[props.buttonType]].join(' ')} onClick={props.clicked}>{props.children}</button>
);

Button.propTypes = {
  buttonType: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired
};

export default Button;
