import React, {Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from "../../components/ui/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null,
                reqInterceptor: axios.interceptors.request.use(req => {
                    this.setState({error: null});
                    return req;
                }),
                resInterceptor: axios.interceptors.response.use(res => res, error => {
                    this.setState({error: error});
                })
            };
        };

        componentWillUnmount() {
            axios.interceptors.request.eject(this.state.reqInterceptor);
            axios.interceptors.response.eject(this.state.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        };

        render() {
            return (
                <Auxiliary>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxiliary>
            )
        }
    }
};

export default withErrorHandler;
