"use client"
import axios from "axios";

let url = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const ApiGET = (data) => {
    return axios.post(`${url}/getArchivedForms`, data)
        .then(res => res.data).catch(res => res.data)
}

export { ApiGET }
