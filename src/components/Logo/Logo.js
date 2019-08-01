import React from 'react';
import image from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = () => (
    <div className={classes.Logo}>
        <img src={image} alt="MyBurger"/>
    </div>
);

export default Logo;
