import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import PropTypes from 'prop-types';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((control) => (
            <BuildControl removed={() => props.ingredientRemoved(control.type)}
                          added={() => props.ingredientAdded(control.type)}
                          key={control.label}
                          label={control.label}
                          disabled={props.disabled[control.type]}/>
        ))}
        <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.ordered}>{props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
        </button>
    </div>
);

BuildControls.propType = {
    price: PropTypes.number.isRequired,
    ingredientRemoved: PropTypes.func.isRequired,
    ingredientAdded: PropTypes.func.isRequired,
    purchaseable: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default BuildControls;
