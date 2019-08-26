import React, {useState, useEffect, useCallback} from 'react';
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axious-orders';
import Spinner from "../../components/ui/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);
    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);
    const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
    const onIngredientRemoved = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    };

    const determinePurchaseState = () => {
        const ings = {
            ...ingredients
        };

        const sum = Object.keys(ings).map((ingredientKey) => {
            return ings[ingredientKey];
        }).reduce((sum, newValue) => sum + newValue, 0);
        return sum > 0;
    };

    const disabledInfo = {
        ...ingredients
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

    if (ingredients) {
        orderSummary = <OrderSummary ingredients={ingredients}
                                     purchaseCanceled={purchaseCancelHandler}
                                     purchaseContinue={purchaseContinueHandler}
                                     price={totalPrice}/>;
        burger = (
            <Auxiliary>
                <Burger ingredients={ingredients}/>
                <BuildControls ingredientAdded={onIngredientAdded}
                               ingredientRemoved={onIngredientRemoved}
                               disabled={disabledInfo}
                               price={totalPrice}
                               isAuthenticated={isAuthenticated}
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

export default withErrorHandler(BurgerBuilder, axios);
