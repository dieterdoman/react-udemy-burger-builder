import {takeEvery} from 'redux-saga/effects';
import {logoutSage} from './auth';
import * as actionTypes from '../actions/actionsTypes';

export function* watchAll() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSage);
}
