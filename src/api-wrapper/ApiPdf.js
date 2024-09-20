"use client"
import axios from "axios";

let url = `${process.env.NEXT_PUBLIC_API_URL}/api`;

//let url = 'http://132.148.0.138:3000/api';
const ApiPdfList = (data) => {
    return axios.post(`${url}/superAdmin/forms/getApprovedForm`, data)
        .then(res => res.data).catch(res => res.data)
}

const ApiApprove = (data) => {
    return axios.post(`${url}/superAdmin/forms/formApprove`, data)
        .then(res => res.data).catch(res => res.data)
}

const ApiResendMail = (data) => {
    return axios.post(`${url}/reSendMail`, data)
        .then(res => res.data).catch(res => res.data)
}
const ApiResetPassword = (data) => {
    return axios.post(`${url}/createNewPassword`, data)
        .then(res => res.data).catch(res => res.data)
}

const ApiArchive = (data) => {
    return axios.post(`${url}/archivedForms`, data)
        .then(res => res.data).catch(res => res.data)
}

const ApiRelease = (data) => {
    return axios.post(`${url}/superAdmin/forms/releaseForm`, data)
        .then(res => res.data).catch(res => res.data)
}
const ApiDeleteDraft = (id) => {
    return axios.delete(`${url}/deleteDraft/${id}`)
        .then(res => res.data).catch(res => res.data)
}

export { ApiArchive, ApiPdfList, ApiApprove, ApiResendMail, ApiResetPassword, ApiRelease,ApiDeleteDraft }
