import axios from "./customizeAxios";

const GetAllCate = () => {
    return axios.get("/Category/GetAllCate")
}
const GetAllJobType = () => {
    return axios.get("/Category/GetAllJobType")
}
const GetAllJobTypeByCate = (cid) => {
    return axios.get(`/Category/GetAllJobTypeBycate?cateid=${cid}`)
}
export {GetAllCate,GetAllJobType,GetAllJobTypeByCate}