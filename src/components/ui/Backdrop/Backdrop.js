import React from 'react';
import classes from './Backdrop.module.css';
import PropTypes from 'prop-types';

const Backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}/> : null
);

Backdrop.propTypes = {
  clicked: PropTypes.func.isRequired
};

export default Backdrop;
