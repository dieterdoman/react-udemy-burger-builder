import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let transformedIngredients = TransFormIngredients(props.ingredients)
        .reduce((previousValue, currentValue) => previousValue.concat(currentValue), []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

const TransFormIngredients = (ingredients) => {
    return Object.keys(ingredients).map(ingredientKey => {
        return [...Array(ingredients[ingredientKey])].map((_, i) => {
            return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
        });
    })
};

export default Burger;
