import React, {useEffect, Suspense} from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from "./containters/BurgerBuilder/BurgerBuilder";
import {Route, Switch, withRouter, Redirect} from "react-router";
import Logout from "./containters/Auth/Logout/Logout";
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
    return import('./containters/Checkout/Checkout')
});

const Orders = React.lazy(() => {
    return import('./containters/Orders/Orders')
});

const Auth = React.lazy(() => {
    return import('./containters/Auth/Auth')
});

const App = props => {
    useEffect(() => {
        props.onTryAutoSignUp();
    }, [props]);

    let routes = (
        <Switch>
            <Route path="/auth" render={() => <Auth/>}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/"/>
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/checkout"  render={() => <Checkout/>}/>
                <Route path="/orders" render={() => <Orders/>}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth"  render={() => <Auth/>}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/"/>
            </Switch>
        )
    }
    return (
        <div>
            <Layout>
                <Suspense fallback={<p>Loading</p>}>
                    {routes}
                </Suspense>
            </Layout>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
