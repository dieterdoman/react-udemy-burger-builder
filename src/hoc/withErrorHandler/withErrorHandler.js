import React from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from "../../components/ui/Modal/Modal";
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Auxiliary>
                <Modal show={error} modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </Auxiliary>
        );
    }
};

export default withErrorHandler;
