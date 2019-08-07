import React, {Component} from 'react';
import Button from "../../../components/ui/Button/Button";
import classes from './ContactData.module.css';
import axious from '../../../axious-orders';
import Spinner from "../../../components/ui/Spinner/Spinner";
import Input from "../../../components/ui/Input/Input";

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'name',
                address: {
                    street: 'street',
                    zipCode: '1231',
                    country: 'sa'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axious.post('/orders.json', order).then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        }).catch(error => {
            this.setState({loading: false});
        });
    };

    render() {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your name"/>
                <Input inputtype="input" type="email" name="email" placeholder="Your email"/>
                <Input inputtype="input" type="text" name="street" placeholder="Street"/>
                <Input inputtype="input" type="text" name="postal" placeholder="Postal code"/>
                <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
