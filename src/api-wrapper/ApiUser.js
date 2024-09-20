"use client"
import axios from "axios";

let url = `${process.env.NEXT_PUBLIC_API_URL}/api`;

//let url = 'http://132.148.0.138:3000/api';
const ApiCreate = (data) => {
    return axios.post(`${url}/superAdmin/users/create`, data)
        .then(res => res.data).catch(res => res.data)
}
const ApiList = (data) => {
    return axios.post(`${url}/superAdmin/users/get`, data)
        .then(res => res.data).catch(res => res.data)
}

const ApiDelete = (id) => {
    return axios.delete(`${url}/superAdmin/users/delete/${id}`)
        .then(res => res.data).catch(res => res.data)
}
const ApiUpdate = (id, data) => {
    return axios.put(`${url}/superAdmin/users/update/${id}`, data)
        .then(res => res.data).catch(res => res.data)
}

export { ApiCreate, ApiList, ApiDelete, ApiUpdate }

