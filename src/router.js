import { Route, Routes } from "react-router-dom";
import { ROUTERS } from "./Untils/Router";
import Login from "./Pages/Common/Login/login";
import ChooseRole from "./Pages/Common/Register/chooseRole";
import RegisterEmployer from "./Pages/Common/Register/registerForEmployer";
import HomePage from "./Pages/User/HomePage";
import Job from "./Pages/User/Job/job";
import JobDetail from "./Pages/User/Job/jobDetail"
import ChangePass from "./Pages/User/Profile/changePass";
import ChangePassEmp from "./Pages/User/Profile/changePassEmp";
import HistoryOfJob from "./Pages/User/Job/JobManage/historyOfJob";
import Profile from "./Pages/User/Profile/profile";
import Profilemp from "./Pages/User/Profile/profilemp";
import StatusFindJob from "./Pages/User/Job/JobManage/statusFindJob";
import MasterLayout from "./Pages/User/Themes/MasterLayout/masterLayout";
import CV from "./Pages/User/CV/cv";
import CVGenarel from "./Pages/User/CV/cvGenarel";
import Contact from "./Pages/User/Contact/Contact";
import RegisterCandidate from "./Pages/Common/Register/registerFofCandidate";
import Verify from "./Pages/Common/Verify/verify";
import Otp from "./Pages/Common/Verify/otpCode";
import EmployerPage from "./Pages/User/Employer/MangementPage/employerPage";
import CandidateManage from "./Pages/User/Employer/ManagementCandidate/candidateManage";
import Interview from "./Pages/User/Employer/ManagementInterview/interviewManage";
import Post from "./Pages/User/Employer/ManagementPost/post";
import CreatePost from "./Pages/User/Employer/ManagementPost/createPost";
import FindCandidate from "./Pages/User/Employer/ManagementCandidate/findCandidate";
import OtpRegister from "./Pages/Common/Register/otpRegister";
import JobManage from "./Pages/User/Job/JobManage/jobManage";
import JobCancel from "./Pages/User/Job/JobManage/jobCanceled";
import JobFavorite from "./Pages/User/Job/JobManage/jobFavorite";
import CandidateRecruited from "./Pages/User/Employer/ManagementCandidate/candidateRecruited";
import CandidateCancel from "./Pages/User/Employer/ManagementCandidate/candidateCancel";
import CandidateReject from "./Pages/User/Employer/ManagementCandidate/candidateReject";
import CandidateSave from "./Pages/User/Employer/ManagementCandidate/candidateSave";
import PostClose from "./Pages/User/Employer/ManagementPost/postClose";
import PostManage from "./Pages/User/Employer/ManagementPost/postManage";
import PostRejected from "./Pages/User/Employer/ManagementPost/postRejected";
import PostWrap from "./Pages/User/Employer/ManagementPost/postWrap";
import EditPost from "./Pages/User/Employer/ManagementPost/editPost";
import PostDetail from "./Pages/User/Employer/ManagementPost/postDetail";
import AdminDashboard from "./Pages/Admin/adminDashboard";
import AdminManageUser from "./Pages/Admin/adminManageUser";
import ViewPost from "./Pages/User/Employer/ManagementPost/viewPost";
import AdminContact from "./Pages/Admin/adminContact";
import AdminApprovePost from "./Pages/Admin/adminApprovePost";
import AdminBlacklist from "./Pages/Admin/adminBlacklist";
import TinNhapPost from './Pages/User/Employer/ManagementPost/tinnhapPost';
import PostDetailForAdmin from "./Pages/User/Employer/ManagementPost/postDetailForAdmin";

const renderUserRouter = () => {
    const Routers = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />,
        },
        {
            path: ROUTERS.USER.PROFILE,
            component: <Profile />,
        },
        {
            path: ROUTERS.USER.PROFILEEMP,
            component: <Profilemp />,
        },
        {
            path: ROUTERS.USER.LOGIN,
            component: <Login />,
        },
        {
            path: ROUTERS.USER.REGISTEREMPLOYER,
            component: <RegisterEmployer />,
        },
        {
            path: ROUTERS.USER.REGISTERCANDIDATE,
            component: <RegisterCandidate />,
        },
        {
            path: ROUTERS.USER.CHOOSEROLE,
            component: <ChooseRole />,
        },
        {
            path: ROUTERS.USER.JOB,
            component: <Job />,
        },
        {
            path: ROUTERS.USER.JOBDETAIL,
            component: <JobDetail />,
        },
        {
            path: ROUTERS.USER.CHANGEPASS,
            component: <ChangePass />,
        },
        {
            path: ROUTERS.USER.CHANGEPASSEMP,
            component: <ChangePassEmp />,
        },
        {
            path: ROUTERS.USER.JOBMANAGE,
            component: <JobManage />,
        },
        {
            path: ROUTERS.USER.JOBCANCELED,
            component: <JobCancel />,
        },
        {
            path: ROUTERS.USER.JOBFAVORITE,
            component: <JobFavorite />,
        },
        {
            path: ROUTERS.USER.HISTORY,
            component: <HistoryOfJob />,
        },
        {
            path: ROUTERS.USER.STATUSJOB,
            component: <StatusFindJob />,
        },
        {
            path: ROUTERS.USER.CV,
            component: <CV />,
        },
        {
            path: ROUTERS.USER.CVGenarel,
            component: <CVGenarel />,
        },
        {
            path: ROUTERS.USER.CONTACT,
            component: <Contact />,
        },
        {
            path: ROUTERS.USER.VERIFY,
            component: <Verify />,
        },
        {
            path: ROUTERS.USER.OTP,
            component: <Otp />,
        },
        {
            path: ROUTERS.USER.OTPR,
            component: <OtpRegister />,
        },
        {
            path: ROUTERS.USER.EMPLOYERPAGE,
            component: <EmployerPage />,
        },
        {
            path: ROUTERS.USER.POST,
            component: <Post />,
        },
        {
            path: ROUTERS.USER.POSTCLOSE,
            component: <PostClose />,
        },
        {
            path: ROUTERS.USER.POSTMANAGE,
            component: <PostManage />,
        },
        {
            path: ROUTERS.USER.POSTREJECT,
            component: <PostRejected />,
        },
        {
            path: ROUTERS.USER.POSTWRAP,
            component: <PostWrap />,
        },
        {
            path: ROUTERS.USER.EDITPOST,
            component: <EditPost />,
        },
        {
            path: ROUTERS.USER.TINNHAP,
            component: <TinNhapPost />,
        },
        {
            path: ROUTERS.USER.VIEWPOST,
            component: <ViewPost />,
        },
        {
            path: ROUTERS.USER.CREATEPOST,
            component: <CreatePost />,
        },
        {
            path: ROUTERS.USER.POSTDETAIL,
            component: <PostDetail />,
        },
        {
            path: ROUTERS.USER.POSTDETAILFORADMIN,
            component: <PostDetailForAdmin />,
        },
        {
            path: ROUTERS.USER.CANDIDATEMANAGE,
            component: <CandidateManage />,
        },
        {
            path: ROUTERS.USER.CANDIDATERECRUITED,
            component: <CandidateRecruited />,
        },
        {
            path: ROUTERS.USER.CANDIDATECANCEL,
            component: <CandidateCancel />,
        },
        {
            path: ROUTERS.USER.CANDIDATEREJECT,
            component: <CandidateReject />,
        },
        {
            path: ROUTERS.USER.CANDIDATESAVE,
            component: <CandidateSave />,
        },
        {
            path: ROUTERS.USER.FINDCANDIDATE,
            component: <FindCandidate />,
        },
        {
            path: ROUTERS.USER.INTERVIEWMANAGE,
            component: <Interview />,
        },
        {
            path: ROUTERS.ADMIN.ADMINDASHBOARD,
            component: <AdminDashboard />,
        },
        {
            path: ROUTERS.ADMIN.ADMINMANAGEUSER,
            component: <AdminManageUser />,
        },
        {
            path: ROUTERS.ADMIN.ADMINCONTACT,
            component: <AdminContact />,
        },
        {
            path: ROUTERS.ADMIN.ADMINMAPPROVEPOST,
            component: <AdminApprovePost />,
        },
        {
            path: ROUTERS.ADMIN.ADMINBLACKLIST,
            component: <AdminBlacklist />,
        },
    ]

    return (
        <MasterLayout>
            <Routes>
                {
                    Routers.map((item, key) => (
                        <Route key={key} path={item.path} element={item.component} />
                    ))
                }
            </Routes>
        </MasterLayout>
    )
};

const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;