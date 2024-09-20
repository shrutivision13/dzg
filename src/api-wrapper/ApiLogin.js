"use client"
import axios from "axios";
let url = `${process.env.NEXT_PUBLIC_API_URL}/api`;

//let url = 'http://132.148.0.138:3000/api';
const ApiLogin = (data) => {
    return axios.post(`${url}/superAdmin/login`, data)
        .then(res => res.data).catch(res => res.data)
}
const ApiLogout = (data) => {
    return axios.get(`${url}/logout`, data)
        .then(res => res.data).catch(res => res.data)
}

export { ApiLogin, ApiLogout }
