import axios from "./customizeAxios";

const GetJobFromJobDetailByTypeId = (canid,typeid) => {
    return axios.get(`/JobDetail/GetJobCareFromJobDetailByTypeId?canId=${canid}&typeId=${typeid}`)
}
const ViecLamTotNhat = () => {
    return axios.get("/JobDetail/ViecLamTotNhat")
}
const ViecLamSieuCap = () => {
    return axios.get("/JobDetail/ViecLamSieuCap")
}
const ViecLamSinhVien = () => {
    return axios.get("/JobDetail/ViecLamSinhVien")
}
const ViecLamGanBanNhat = (cid) => {
    return axios.get(`/JobDetail/ViecLamGanBanNhat?cId=${cid}`)
}
const ViecLamMoiNhat = () => {
    return axios.get("/JobDetail/ViecLamMoiNhat")
}
const NhaTuyendungNoiBat = () => {
    return axios.get("/Home/NhaTuyendungNoiBat")
}
const Xemtatca = (url) => {
    return axios.get(`/JobDetail/${url}`)
}
const ListAllJobOfEmployer = (eid) => {
    return axios.get(`/JobDetail/ListAllJobOfEmployer?eid=${eid}`)
}

export {ListAllJobOfEmployer,NhaTuyendungNoiBat,Xemtatca,ViecLamSieuCap,ViecLamMoiNhat,ViecLamSinhVien,ViecLamGanBanNhat,ViecLamTotNhat,GetJobFromJobDetailByTypeId}