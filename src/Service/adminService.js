import axios from "./customizeAxios";

const GetAllAccount = (accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get("/Admin/getallcanaccount",{headers})
}
const GetAllJobDetail = (accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get("/Admin/getAllJobDetail",{headers})
}
const accessJobDeatail = (formintid,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.post("/Admin/approve",formintid,{headers});
}
const creatresoncancel = (formreson,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.put("/Admin/createReject",formreson,{headers});
}
const creatresoncancelclose = (formreson,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.put("/Admin/closejob",formreson,{headers});
}
const blockAccount = (formidacc,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.post("/Admin/upadateaccountstatus1",formidacc,{headers});
}
const unblockAccount = (formidacc,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.post("/Admin/upadateaccountstatus0",formidacc,{headers});
}
const removeAccount = (formidacc,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.post("/Admin/upadateaccountstatus2",formidacc,{headers});
}
const BlackListUser = (accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get("/Admin/BlackList",{headers});
}


export {BlackListUser,removeAccount,unblockAccount,blockAccount,creatresoncancelclose,creatresoncancel,accessJobDeatail,GetAllJobDetail,GetAllAccount}