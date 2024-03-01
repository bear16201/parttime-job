
import axios1 from "./customizeAxios";
import axios from "axios";

const ApplyJob = (appJobRequest,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios1.post("/Home/jobapplycant",appJobRequest ,{headers})
}
const getCanById = (id,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios1.get(`/Candidate/getCandidteByAccId?canid=${id}`,{headers})
}
const SaveProfile = (profileRequest,accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Có thể thêm các header khác nếu cần
      };
    return axios1.put("/Candidate/SaveProfile",profileRequest,{headers})
}
const getCity = async (id) => {
    try {
        const response = await axios.get(`https://provinces.open-api.vn/api/?depth=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching city data:', error);
        throw error; // Re-throw the error to propagate it to the caller
    }
}


export {getCity,ApplyJob, getCanById,SaveProfile}