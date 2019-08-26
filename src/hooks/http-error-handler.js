import {useState, useEffect} from 'react';

export default httpclient => {
    const [error, setError] = useState(null);
    const reqInterceptor = httpclient.interceptors.request.use(req => {
        setError(null);
        return req;
    });
    const resInterceptor = httpclient.interceptors.response.use(res => res, err => {
        setError(err);
    });

    useEffect(() => {
        return () => {
            httpclient.interceptors.request.eject(reqInterceptor);
            httpclient.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor, httpclient.interceptors.request, httpclient.interceptors.response]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler]
};
