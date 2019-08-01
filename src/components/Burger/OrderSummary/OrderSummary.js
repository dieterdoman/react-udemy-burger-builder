import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from "../../ui/Button/Button";
import PropTypes from 'prop-types';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(ingredientKey => {
        return (
            <li key={ingredientKey}>
                <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>: {props.ingredients[ingredientKey]}
            </li>
        );
    });
    return (
        <Auxiliary>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button buttonType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button buttonType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Auxiliary>
    );
};

OrderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  purchaseCanceled: PropTypes.func.isRequired,
  purchaseContinue: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired
};

export default OrderSummary;
