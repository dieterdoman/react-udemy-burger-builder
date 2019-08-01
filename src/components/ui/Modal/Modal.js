import React from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from "../Backdrop/Backdrop";
import PropTypes from 'prop-types';

const Modal = (props) => (
    <Auxiliary>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div className={classes.Modal}
             style={{transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: props.show ? '1' : '0'}}>
            {props.children}
        </div>
    </Auxiliary>
);

Modal.propType = {
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired
};

export default Modal;
