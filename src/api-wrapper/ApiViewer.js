"use client"
import axios from "axios";
let url = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const ApiGenerateOTP = (data) => {
    return axios.post(`${url}/generateOTP`, data)
        .then(res => res.data).catch(res => res.data)
}
const ApiVerifyOTP = (data) => {
    return axios.post(`${url}/verifyOTP`, data)
        .then(res => res.data).catch(res => res.data)
}

export { ApiGenerateOTP, ApiVerifyOTP }

