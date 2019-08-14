import React from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from "./containters/BurgerBuilder/BurgerBuilder";
import Checkout from "./containters/Checkout/Checkout";
import {Route, Switch} from "react-router";
import Orders from "./containters/Orders/Orders";
import Auth from "./containters/Auth/Auth";
import Logout from "./containters/Auth/Logout/Logout";

function App() {
  return (
    <div>
        <Layout>
            <Switch>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/orders" component={Orders}/>
                <Route path="/auth" component={Auth} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={BurgerBuilder}/>
            </Switch>
        </Layout>
    </div>
  );
}

export default App;
