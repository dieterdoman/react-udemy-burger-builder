import React from 'react';
import classes from './NavigationItem.module.css';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

const NavigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink to={props.link} exact activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>
);

NavigationItem.propTypes = {
  link: PropTypes.string.isRequired
};

export default NavigationItem;
