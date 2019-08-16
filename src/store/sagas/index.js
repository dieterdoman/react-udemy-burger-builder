import {takeEvery} from 'redux-saga/effects';
import {logoutSage, checkAuthTimeoutSaga} from './auth';
import * as actionTypes from '../actions/actionsTypes';

export function* watchAll() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSage);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
}
