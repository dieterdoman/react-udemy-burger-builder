import React, {useEffect} from 'react';
import Order from "../../components/Order/Order";
import axios from '../../axious-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from "../../components/ui/Spinner/Spinner";

const Orders = props => {
    const {onFetchOrders, token, userId} = props;
    useEffect( () => {
        onFetchOrders(token, userId);
    }, [token, userId, onFetchOrders]);

    let orders = <Spinner/>;
    if (!props.loading) {
        orders = props.orders.map(order => (
            <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
        ));
    }
    return (
        <div>
            {orders}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
