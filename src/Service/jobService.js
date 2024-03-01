
import axios from "./customizeAxios";

const ApplyJob = (appJobRequest, accessToken) => {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
  };
  return axios.post("/Home/jobapplycant", appJobRequest, { headers })
}
const getCanById = (id) => {
  return axios.get(`/Candidate/getCandidteByAccId?aid=${id}`)
}
const getImformationcan = (id, accessToken) => {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
  };
  return axios.get(`Candidate/getImformationcan?id=${id}`, { headers })
}
const getEmpById = (id) => {
  return axios.get(`/Employer/GetEmployerByAId?aId=${id}`)
}
const getJobApplication = (cid, jid, accessToken) => {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
  };
  return axios.get(`/Job/GetjobApplycationByCandidateId?candidateId=${cid}&jobId=${jid}`, { headers })
}
const CareJob = (applyRequest, accessToken) => {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
  };
  return axios.post("/Job/CareJob", applyRequest, { headers })
}
const GetJobByStatus = (status, canid, accessToken) => {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
  };
  return axios.get(`/Job/GetJobByStatus?status=${status}&canId=${canid}`, { headers })
}

const GetJobCare = (canid, accessToken) => {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
  };
  return axios.get(`/Job/GetJobCare?CandidateId=${canid}`, { headers })
}

const DeleteJobCare = (id, accessToken) => {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
  };
  return axios.delete(`/Job/DeleteJobCare?jobApplicationId=${id}`, { headers })
}

const CanceApplyJob = (request, accessToken) => {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
  };
  return axios.put("/Job/CanceApply", request, { headers })
}
const GetJobByTypeId = (typeid, accessToken) => {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
  };
  return axios.get(`/Home/GetAllJobByType?jobid=${typeid}`, { headers })
}
let ApplyjobCance = (id, accessToken) => {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
  };
  return axios.put(`/Job/Apply?jobApplicationId=${id}`, { headers })
}
const countnhatd = (accessToken) => {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
  };
  return axios.get('/Home/countnhatd', { headers });
}
const countcvtd = (accessToken) => {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
  };
  return axios.get("/Home/congviectuyendung", { headers });
}
//http://localhost:5000/api/Home/searbJobAllDetail?title=Job%201&location=Location%201&jobName=IT
const searchAllJobDetail = (title, location, jobName, time) => {
  return axios.get(`/Home/searbJobAllDetail`, {
    params: {
      title: title,
      location: location,
      jobName: jobName,
      time: time
    }
  });
}
const countWeb = () => {
  return axios.post("/Home/countweb");
}
const getWeb = () => {
  return axios.get("/Home/getweb");
}
export { getWeb, countWeb, getImformationcan, countcvtd, countnhatd, getEmpById, GetJobByTypeId, ApplyjobCance, CanceApplyJob, DeleteJobCare, ApplyJob, getCanById, searchAllJobDetail, CareJob, GetJobByStatus, GetJobCare, getJobApplication }