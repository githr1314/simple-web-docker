import axios from './axios';

const login = (param:any) => {
    return axios.post('/login', param);
}

export {
    login
}