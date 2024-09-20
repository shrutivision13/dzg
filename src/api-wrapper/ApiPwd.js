"use client"
import axios from "axios";

let url = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const ApiChangePwd = (data) => {
    return axios.post(`${url}/changePassword`, data)
        .then(res => res.data).catch(res => res.data)
}


export { ApiChangePwd }
