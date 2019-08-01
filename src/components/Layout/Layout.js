import React from 'react';
import Auxiliry from '../../hoc/Auxiliry';

const Layout = (props) => (
    <Auxiliry>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Auxiliry>
);

export default Layout;
