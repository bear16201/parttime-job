
import axios from "./customizeAxios";

const AddNotiForCandidate = (appJobRequest,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.post("/Notification/CreateNotificationForCandidate",appJobRequest,{headers})
}
const AddNotiForEmployer = (appJobRequest,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.post("/Notification/CreateNotificationForEmployer",appJobRequest,{headers})
}
const AddListNotification = (appJobRequest,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.post("Notification/AddListNotification",appJobRequest,{headers})
}
const GetNotiForCandidate = (aid,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Notification/GetNotiForCandidate?aid=${aid}`,{headers})
}
const GetNotiForEmployer = (aid,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Notification/GetNotiForEmployer?aid=${aid}`,{headers})
}
let GetNotiById = (nid,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.put(`/Notification/GetNotiById?nid=${nid}`,{headers})
}
const CreateContact = (request) => {
    return axios.post("/Contact/CreateContact",request)
}
const GetContact = (isAdmin,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Contact/GetContact?isAdmin=${isAdmin}`, { headers })
}
const SentEmail = (toEmail,title,sub,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Account/SentEmail?toEmail=${toEmail}&title=${title}&sub=${sub}`,{headers})
}

export {AddListNotification,SentEmail,GetContact,CreateContact,GetNotiById,AddNotiForCandidate,AddNotiForEmployer,GetNotiForCandidate,GetNotiForEmployer}