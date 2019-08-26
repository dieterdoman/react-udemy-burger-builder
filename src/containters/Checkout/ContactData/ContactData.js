import React, {useState} from 'react';
import Button from "../../../components/ui/Button/Button";
import classes from './ContactData.module.css';
import axios from '../../../axious-orders';
import Spinner from "../../../components/ui/Spinner/Spinner";
import Input from "../../../components/ui/Input/Input";
import {connect} from 'react-redux';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../../store/actions/index';
import {updateObject, checkValidity} from "../../../shared/utility";

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            displayValue: 'Name'
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            displayValue: 'Street'
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false,
            displayValue: 'Zip code'
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            displayValue: 'Country'
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            displayValue: 'Email'
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: 'fastest',
            displayValue: 'Shipping',
            validation: {},
            valid: true
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementId in orderForm) {
            formData[formElementId] = orderForm[formElementId].value;
        }
        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData,
            userId: props.userId
        };
        props.onOrderBurger(order, props.token);
    };

    const inputChangedHandler = (event, inputId) => {
        const updatedFormElement = updateObject(orderForm[inputId], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputId].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(orderForm, {
            [inputId]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    };

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(element => (
                <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    changed={(event) => inputChangedHandler(event, element.id)}
                    invalid={!element.config.valid}
                    shouldValidate={element.config.validation}
                    touched={element.config.touched}
                    valueDisplayType={element.config.displayValue}
                />
            ))}
            <Button buttonType="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner/>
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actionTypes.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
