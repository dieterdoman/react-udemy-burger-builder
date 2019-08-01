import React from 'react';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.module.css';
import Backdrop from "../../ui/Backdrop/Backdrop";
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import PropTypes from 'prop-types';

const SideDrawer = (props) => {
    let attachedClasses = [];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    } else {
        attachedClasses = [classes.SideDrawer, classes.Close]
    }
    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Auxiliary>
    );
};

SideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired
};

export default SideDrawer;
