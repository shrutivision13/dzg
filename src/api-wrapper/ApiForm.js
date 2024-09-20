"use client"
import axios from "axios";

let url = `${process.env.NEXT_PUBLIC_API_URL}/api`;

//let url = 'http://132.148.0.138:3000/api';
const ApiFormList = () => {
    return axios.get(`${url}/superAdmin/forms/getFormName`)
        .then(res => res.data).catch(res => res.data)
}
const ApiViewerList = () => {
    return axios.get(`${url}/reviewer/get`)
        .then(res => res.data).catch(res => res.data)
}

const ApiSaveList = (data) => {
    return axios.post(`${url}/superAdmin/forms/create`, data)
        .then(res => res.data).catch(res => res.data)
}
const ApiViewList = (id) => {
    return axios.get(`${url}/superAdmin/forms/getById/${id}`)
        .then(res => res.data).catch(res => res.data)
}

const ApiUpdateList = (id, data) => {
    return axios.put(`${url}/superAdmin/forms/update/${id}`, data)
        .then(res => res.data).catch(res => res.data)
}

const ApiProfileDetails = () => {
    return axios.get(`${url}/superAdmin/users/getProfile`)
        .then(res => res.data).catch(res => res.data)
}

const ApiSearchCustomerNumber = (data) => {
    return axios.post(`${url}/searchCustomer`, data)
        .then(res => res.data).catch(res => res.data)
}
const ApiSpecificatioData = (data) => {
    return axios.post(`${url}/specificationData`, data)
        .then(res => res.data).catch(res => res.data)
}
const ApiSearchContactPerson = (data) => {
    return axios.post(`${url}/contactPerson`, data)
        .then(res => res.data).catch(res => res.data)
}
export { ApiProfileDetails, ApiFormList, ApiViewerList, ApiSaveList, ApiViewList, ApiUpdateList, ApiSearchCustomerNumber, ApiSpecificatioData, ApiSearchContactPerson }

