
import axios from "./customizeAxios";

const SentFeedback = (appJobRequest,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.post("/Feedback/CreateFeedbackToEmployer",appJobRequest,{headers} )
}
const SentFeedbackToCandidate = (appJobRequest,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.post("/Feedback/CreateFeedbackToCandidate",appJobRequest,{headers} )
}
const GetFeedbackForCandidate = (aid,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Feedback/GetFeedbackForCandidate?aid=${aid}`,{headers})
}
const GetFeedbackForEmployer = (aid,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Feedback/GetFeedbackForEmployer?aid=${aid}`,{headers})
}

export {SentFeedback,SentFeedbackToCandidate,GetFeedbackForCandidate,GetFeedbackForEmployer}