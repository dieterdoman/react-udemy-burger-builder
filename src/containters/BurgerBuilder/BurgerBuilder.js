import React, {useState, useEffect} from 'react';
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axious-orders';
import Spinner from "../../components/ui/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);
    const {onInitIngredients} = props;

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    };

    const determinePurchaseState = () => {
        const ingredients = {
            ...props.ingredients
        };

        const sum = Object.keys(ingredients).map((ingredientKey) => {
            return ingredients[ingredientKey];
        }).reduce((sum, newValue) => sum + newValue, 0);
        return sum > 0;
    };

    const disabledInfo = {
        ...props.ingredients
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

    if (props.ingredients) {
        orderSummary = <OrderSummary ingredients={props.ingredients}
                                     purchaseCanceled={purchaseCancelHandler}
                                     purchaseContinue={purchaseContinueHandler}
                                     price={props.totalPrice}/>;
        burger = (
            <Auxiliary>
                <Burger ingredients={props.ingredients}/>
                <BuildControls ingredientAdded={props.onIngredientAdded}
                               ingredientRemoved={props.onIngredientRemoved}
                               disabled={disabledInfo}
                               price={props.totalPrice}
                               isAuthenticated={props.isAuthenticated}
                               purchaseable={determinePurchaseState()}
                               ordered={purchaseHandler}/>
            </Auxiliary>
        );
    }

    return (
        <Auxiliary>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
