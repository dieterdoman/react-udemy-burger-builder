import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-udemy-burger-build-5cf81.firebaseio.com/'
});

export default instance;
