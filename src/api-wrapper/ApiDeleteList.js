"use client"
import axios from "axios";

let url = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const ApiDeletedFormList = (data) => {
    return axios.post(`${url}/superAdmin/forms/cancelledForms`, data)
        .then(res => res.data).catch(res => res.data)
}
const ApiDeleteForm = (data) => {
    return axios.post(`${url}/superAdmin/forms/cancelForm`, data)
        .then(res => res.data).catch(res => res.data)
}
export { ApiDeletedFormList, ApiDeleteForm }

