import axios from "./customizeAxios";
//http://localhost:5000/api/Employer/getEmployerByAccId?aid=20
const getEmployById = (id) => {
    return axios.get(`/Employer/getEmployerByEmpId?eid=${id}`)
}
const saveProfileEmp = (formInput,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.put("/Employer/SaveProfileEmploy",formInput,{headers});
}
const getAllCandidateApplyJobzzzzz = (accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get("/Employer/getAllCandidateByApply");
}
const CreateInterview = (request,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.post("/Interview/CreateInterview",request,{headers});
}
const GetInterViewByEmpId = (id,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Interview/GetInterViewByEmpId?aId=${id}`,{headers});
}
const GetCandidateByInterviewId = (id,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Interview/GetCandidateByInterviewId?InterviewId=${id}`,{headers});
}
const createPost= (formInputEmp,accessToken) =>{ 
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.post("/Employer/createJobDetail", formInputEmp,{headers});
}
const createPosttinhanp = (formInputtinnhap,accessToken) =>{ 
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.post("/Employer/createJobDetailtinnhap", formInputtinnhap,{headers});
}
const getAllJObByEid = (eid,accessToken) =>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Employer/getAllJobDetailByEid?empid=${eid}`,{headers})
}
const getAllJObStatusByEid = (eid,accessToken) =>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Employer/getallstatuseid?empid=${eid}`,{headers})
}

const closeJobDetail = (idjob, empid,accessToken) =>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.put(`/Employer/closejobdetailBystatus?idjob=${idjob}&empid=${empid}`,{headers});
}
const getJobByStatus0 = (idemp,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Employer/getJobBystatus0?idemp=${idemp}`,{headers});
}
const getJobByStatus3 = (idemp,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Employer/getJobBystatus3?idemp=${idemp}`,{headers});
}
const getJobByStatus2 = (idemp,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Employer/getJobBydWithstatus2?idemp=${idemp}`,{headers});
}
const deleteJobDetail = (idjob,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.delete(`/Employer/deleteJob?id=${idjob}`,{headers});
}
const getjobbyid =(idjob,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Employer/getjobbyid?id=${idjob}`,{headers});
}
const updatejob =(formInputJob,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.put("/Employer/updatejobDetail",formInputJob,{headers});
}
const updatejobnhap =(formInputJob,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.put("/Employer/updatejobDetailnhap",formInputJob,{headers});
}
const updatestatusjobtn =(formInputJobtn,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.put("/Employer/updatestatustinnhap",formInputJobtn,{headers});
}

const tindangtrongtuan =(eid,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Employer/tindangtrongtuan?idemp=${eid}`,{headers});
}
const tindangtrongthang =(eid,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Employer/tindangtrongthang?idemp=${eid}`,{headers});
}
const ungvientrongthang =(eid,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Employer/ungvientrongthang?idemp=${eid}`,{headers});
}
const ungvientrongtuan =(eid,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Employer/ungvientrongtuan?idemp=${eid}`,{headers});
}
const tindangtuyendung =(eid,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Employer/tindangtuyendung?idemp=${eid}`,{headers});
}
const ungviendaungtuyen =(eid,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Employer/ungviendaungtuyen?idemp=${eid}`,{headers});
}
const getJobstatus4 =(eid,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Employer/getstatus4?idemp=${eid}`,{headers});
}
const getJobreson =(idjob,accessToken)=>{
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios.get(`/Employer/getReasonJob?idjob=${idjob}`,{headers});
}

export {updatejobnhap,getAllJObStatusByEid,getJobreson,updatestatusjobtn,getJobstatus4,createPosttinhanp,tindangtuyendung,ungviendaungtuyen,tindangtrongtuan,ungvientrongtuan,ungvientrongthang,tindangtrongthang,updatejob,getjobbyid,deleteJobDetail,getJobByStatus2,getJobByStatus3,getJobByStatus0,closeJobDetail,getAllJObByEid,createPost, GetCandidateByInterviewId, GetInterViewByEmpId, CreateInterview, getEmployById, saveProfileEmp, getAllCandidateApplyJobzzzzz}

