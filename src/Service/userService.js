import axios from "./customizeAxios";
// import { id } from "../Pages/User/Job/jobDetail";




const loginApi = (loginRequest) => {
    return axios.post("/Authentication/LoginWithAccount",  loginRequest )
}


const GetAllJob = () => {
    return axios.get("/Home/getAllJob" )
}
// const {id} = useParams();
const GetJobById = (id) => {
    return axios.get(`/Home/getJobByID?id=${id}`)
}
const GetAccountById = (id) => {
    return axios.get(`/Account/getAccountById?id=${id}`)
}

const GetAllEmployer = () => {
    return axios.get("/Account/GetAllEmployer" )
}

const RegistCandidate = (CandidateRequest) => {
    return axios.post("/Account/RegisterAccountByEmail",CandidateRequest )
}

const Sentcode = (CandidateRequest) => {
    return axios.get(`/Account/SentCodeVerify?toEmail=${CandidateRequest}` )
}
const ForgetPassword = (ForgetPasswordRequest) => {
    return axios.put("/Account/ResetPassword",ForgetPasswordRequest )
}
const ChangePassword = (changePasswordRequets) => {
    return axios.put("/Account/ChangePassword",changePasswordRequets )
}
const GetToken = (token) => {
    return axios.get(`/Authentication/GetAccountByToken?token=${token}`)
}

const RegisterGoogle = (request) => {
    return axios.post("/Authentication/RegisterGoogle",request)
}
const CheckRegister = (request) => {
    return axios.post("/Account/CheckRegister",request)
}
const CheckForget = (request) => {
    return axios.post("/Account/CheckForgetPassword",request)
}

export { CheckForget,CheckRegister,RegisterGoogle, GetAccountById, loginApi, GetAllJob, GetJobById, GetAllEmployer, RegistCandidate, Sentcode, ForgetPassword, ChangePassword, GetToken };