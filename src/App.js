import React from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from "./containters/BurgerBuilder/BurgerBuilder";
import Checkout from "./containters/Checkout/Checkout";

function App() {
  return (
    <div>
        <Layout>
            <BurgerBuilder />
            <Checkout />
        </Layout>
    </div>
  );
}

export default App;
