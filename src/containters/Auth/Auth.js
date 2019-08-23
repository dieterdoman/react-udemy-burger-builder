import React, {useState, useEffect} from 'react';
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from "../../components/ui/Spinner/Spinner";
import {Redirect} from "react-router";
import {updateObject, checkValidity} from "../../shared/utility";

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email address'
            },
            value: '',
            validation: {
                required: true,
                isMail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    const [isSignUp, setIsSignUp] = useState(true);

    useEffect(() => {
        if (!props.building && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath('/');
        }
    }, []);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        });
        setControls(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    };

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    };

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        });
    }

    let form = formElementsArray.map(element => (
        <Input key={element.id}
               elementType={element.config.elementType}
               elementConfig={element.config.elementConfig}
               value={element.config.value}
               changed={(event) => inputChangedHandler(event, element.id)}
               invalid={!element.config.valid}
               shouldValidate={element.config.validation}
               touched={element.config.touched}
               valueDisplayType={element.config.displayValue}
        />
    ));

    if (props.loading) {
        form = <Spinner/>;
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button buttonType="Success">SUBMIT</Button>
                <Button buttonType="Danger" clicked={switchAuthModeHandler}>SWITCH
                    TO {isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
