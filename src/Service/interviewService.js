import axios from "./customizeAxios";
//http://localhost:5000/api/Employer/getEmployerByAccId?aid=20
const SetinterviewCandidate = (cid,interviewId,jid) => {
    return axios.put(`/Interview/SetinterviewCandidate?cId=${cid}&InterviewId=${interviewId}&jobId=${jid}`)
}
const EditLich = (requets,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.put("/Interview/EditLich",requets,{headers})
}
const DeleteCandidateInterview = (cid,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.put(`/Interview/DeleteCandidateInterview?cid=${cid}`,{headers})
}
const GetListCandidateInterviewByEid = (eid,status,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Interview/GetListCandidateInterviewByEid?eId=${eid}&status=${status}`,{headers})
}
const GetListCandidateApply = (eid,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Interview/GetListCandidateApply?eId=${eid}`,{headers})
}
const SelectOptionInterviewByEmp = (eid,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Interview/SelectOptionInterviewByEmp?eId=${eid}`,{headers})
}
const GetInterviewOfcandidate = (cid,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Interview/GetInterviewOfcandidate?cid=${cid}`,{headers})
}
const CandidateCancelInterview = (jobApplicationId,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Interview/CandidateCancelInterview?jobApplicationId=${jobApplicationId}`,{headers})
}
const GetInterViewById = (id,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Interview/GetInterViewById?id=${id}`,{headers})
}
const GetCandidateOfPostDetail = (jobid,tatus,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Interview/GetCandidateOfPostDetail?jobId=${jobid}&status=${tatus}`,{headers})
}
const GetCandidateOfPostDetailWatting = (jobid,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Interview/GetCandidateOfPostDetailWatting?jobId=${jobid}`,{headers})
}
export {GetCandidateOfPostDetailWatting,GetListCandidateApply,GetCandidateOfPostDetail,GetInterViewById,CandidateCancelInterview,GetInterviewOfcandidate,EditLich,DeleteCandidateInterview,GetListCandidateInterviewByEid,SelectOptionInterviewByEmp,SetinterviewCandidate}

