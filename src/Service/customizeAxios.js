import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
    // baseURL: 'https://sacred-mastodon-just.ngrok-free.app/api',
    // headers: { 'ngrok-skip-browser-warning': '1' }
});

instance.interceptors.response.use(function (response) {
    return response.data ? response.data : { statusCode: response.status };
}, function (error) {
    let res = {};
    if (error.response) {
        res.data = error.response.data;
        res.status = error.response.status;
        res.headers = error.response.headers;
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
    return res;
    // return Promise.reject(error);
}
);

export default instance;
