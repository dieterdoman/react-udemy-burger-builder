import React from 'react';
import classes from './Toolbar.module.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import PropTypes from 'prop-types';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated}/>
        </nav>
    </header>
);

Toolbar.propTypes = {
    drawerToggleClicked: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default Toolbar;
