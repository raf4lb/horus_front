import axios from 'axios';

const ApiContacts = axios.create({
    baseURL: 'http://127.0.0.1:8000/api-v1/',
})

const ApiAuth = axios.create({
    baseURL: 'http://127.0.0.1:8000/api-auth/',
})

export {
    ApiContacts,
    ApiAuth,
}