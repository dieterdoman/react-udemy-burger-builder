import {takeEvery} from 'redux-saga/effects';
import {logoutSage, checkAuthTimeoutSaga, authUserSage, authCheckStateSaga} from './auth';
import * as actionTypes from '../actions/actionsTypes';
import {initIngredientsSaga} from "./burgerBuilder";
import {fetchOrdersSaga, purchaseBurgerSaga} from "./orders";

export function* watchAll() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSage);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSage);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrder() {
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
