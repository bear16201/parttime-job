import axios from "./customizeAxios";

const GetAllJobAndCandidateWithStatus = (status,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Job/GetAllJobAndCandidateWithStatus?status=${status}`,{headers})
}
const GetChangeStatus = (jobApplicationId,status,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.put(`/Job/ChangeJobApplicationStatus?jobApplicationId=${jobApplicationId}&status=${status}`,{headers})
}
const GetChangeStatus1 = (jobApplicationId,status,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.put(`/Job/ChangeJobApplicationStatus1?jobApplicationId=${jobApplicationId}&status=${status}`,{headers})
}
const GetReasonCancelByJobApplicationId = (jobApplicationId,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Job/GetReasonCancelByJobApplicationId?jobApplicationId=${jobApplicationId}`,{headers})
}

export {GetChangeStatus1,GetAllJobAndCandidateWithStatus, GetChangeStatus, GetReasonCancelByJobApplicationId}