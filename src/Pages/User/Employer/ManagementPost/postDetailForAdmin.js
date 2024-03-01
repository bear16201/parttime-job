import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../Job/job.scss'
import moment from 'moment';
// import {useParams} from 'react-router';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import logo_job from '../../../../Assets/logo-job.png'
import { useState } from 'react';
import { GetAllEmployer, GetJobById } from '../../../../Service/userService';
import { GetFeedbackForEmployer } from '../../../../Service/feedbackService';
import { GetJobByTypeId, CareJob, ApplyJob, getJobApplication, CanceApplyJob, ApplyjobCance, GetJobCare } from '../../../../Service/jobService';
import { useEffect } from 'react';
import Header from '../../Themes/Header/headerGuest';
import Footer from '../../Themes/Footer/footer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Rating from '@mui/material/Rating';
import { format } from 'date-fns';
function PostDetailForAdmin(props) {

    const navigate = useNavigate();
    const [jobDetail, setJobDetail] = useState([]);
    const [jobList, setJobList] = useState([]);
    const [jobid, setjobid] = useState("");
    const [jobApplicationId, setjobApplicationId] = useState();
    const [apply, setApply] = useState();
    const [applyRequest, setApplyRequest] = useState({ applicantId: '', jobId: '' });
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [rating, setRating] = useState(0);
    const [emid, setEid] = useState(sessionStorage.getItem("employerId"));
    const [listEmployer, setListEmployer] = useState([]);
    const [cid, setCid] = useState('');
    const [care, setcare] = useState();
    const [listJobCare, setListJobCare] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [Mess, setMess] = useState('');
    const token = localStorage.getItem("token");
    useEffect(() => {
        console.log("emid", emid);
        const searchParams = new URLSearchParams(window.location.search);
        setjobid(searchParams.get('jobid'));
        const fetchData = async () => {
            const candidateId = sessionStorage.getItem("candidateId");
            setApplyRequest({
                applicantId: candidateId,
                jobId: jobid
            });
            console.log("setApplyRequest:", applyRequest);
        };
        fetchData();
        getJobDeatail();
        getListJobType();
        getEmployer();
    }, [jobid, rating]);

    useEffect(() => {
        console.log("setApplyRequest:", applyRequest);
        SetStatus();
    }, [applyRequest]);

    const SetStatus = async () => {
        let res = await getJobApplication(applyRequest.applicantId, applyRequest.jobId)
        console.log("getJobApplication", res);
        console.log("getJobApplication 1:", res.id);
        setjobApplicationId(res.id);
        console.log("setjobApplicationId", jobApplicationId);
        if (res) {
            if (res.status === 0) {
                console.log(res.status);
                setApply(false);
            } else {
                console.log(res.status);
                setApply(true);
            }
        }
    }

    const getEmployer = async () => {
        let res = await GetAllEmployer();
        if (res) {
            setListEmployer(res);
        }
        console.log("checkEmploy", res);
    }

    const getListJobType = async () => {
        let job = await GetJobByTypeId(jobid);
        setJobList(job);
        console.log("GetJobByType", job);
    }
    const getFeedback = async (eid) => {
        let job = await GetFeedbackForEmployer(eid);
        setFeedback(job);
        console.log("GetFeedbackForEmployer", job);
    }
    const getJobDeatail = async () => {
        let res = await GetJobById(jobid);
        if (res) {
            setJobDetail(res);
            console.log("setJobDetail", res);
            if (res.length > 0) {
                console.log("res.employerId 2:", res[0].employerId);
                getFeedback(res[0].employerId);
            }
            // setTid(res[0].jobTypeId);
            // getListJobType(res[0].jobTypeId);
            // let job = await GetJobByTypeId(res[0].jobTypeId);
            // console.log("tid", res[0].jobTypeId);
            // console.log("GetJobByType", jobDetail);
            // setJobList(job);
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("candidateId")) {
            setCid(sessionStorage.getItem("candidateId"));
            getJobsCare();
        }
    }, [care]);

    const getJobsCare = async () => {
        const candidateId = sessionStorage.getItem("candidateId");
        let res = await GetJobCare(candidateId);
        if (res && JSON.stringify(res) !== JSON.stringify(listJobCare)) {
            setListJobCare(res);
        }
        console.log("getJobsCare", listJobCare);
    }
    const ApplyHandler = async () => {
        const accountid = sessionStorage.getItem("candidateId");
        if (sessionStorage.getItem("idOfEmp") != null && sessionStorage.getItem("idOfCandidate") == null) {
            toast.error("Bạn hãy đăng xuất tài khoản nhà tuyển dụng");
            return;
        }
        if (accountid != null) {
            if (!apply) {
                handleClickOpen();
            } else {
                let app = await ApplyJob(applyRequest, token);
                console.log(app);
                if (app.message === "CV") {
                    setMess("Bạn cần điền đầy đủ thông tin cơ bản trước khi ứng tuyển");
                    handleClickOpen1();
                } else if (app.message === "MaxApply") {
                    setMess("Vì đánh giá sao của bạn thấp nên bạn bị giới hạn số lần ứng tuyển");
                    handleClickOpen2();
                }
                else if (app.message === "Huy ung tuyen") {
                    setApply(true);
                    toast.success("Hủy ứng tuyển thành công");
                } else {
                    setApply(false);
                    toast.success("Ứng tuyển thành công");
                }
            }
        } else {
            navigate("/login?jobid=" + jobid);
            return;
        }
    }

    const SaveJobHandler = async () => {
        const accountid = sessionStorage.getItem("id");
        if (accountid === null) {
            navigate("/login?jobid=" + jobid);
            return;
        }
        await CareJob(applyRequest, token);
        toast.success("Bạn đã lưu công việc vào mục quan tâm");
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpen1(false);
        setOpen2(false);
    };

    const handleSubmit = async () => {
        Cancel.jobId = jobApplicationId;
        Cancel.resonCancel = reason;
        console.log("Cancel", Cancel);
        await CanceApplyJob(Cancel, token);
        // toast.success("Hủy ứng tuyển thành công");
        // Điều gì xảy ra khi bạn nhấn "Gửi" ở đây
        handleClose(); // Đóng popup sau khi gửi
        setApply(true);
        toast.success("Hủy ứng tuyển thành công");
    };
    const [reason, setReason] = useState('');
    const [Cancel, setCancel] = useState({ jobId: 0, resonCancel: '' });

    const handleChange = (value) => {
        setReason(value);
    };

    const SaveJobHandler1 = async (jid) => {
        const candidateId = sessionStorage.getItem("candidateId");
        if (candidateId === null) {
            navigate("/login");
            return;
        }
        applyRequest.applicantId = candidateId;
        applyRequest.jobId = jid;
        console.log("setApplyRequest job type:", applyRequest);
        console.log("jid:", jid);
        await CareJob(applyRequest, token);
        setcare(jid);
        toast.success("Bạn đã lưu công việc vào mục quan tâm");
    }
    function convertDaysOfWeek(inputString) {
        // Tách các số từ chuỗi
        try {
            const numbers = inputString.split(',').map(Number);

            // Chuyển đổi số thành tên ngày trong tuần
            const dayNames = numbers.map(number => {
                switch (number) {
                    case 1:
                        return 'Tất cả các ngày trong tuần';
                    case 2:
                        return 'thứ 2';
                    case 3:
                        return 'thứ 3';
                    case 4:
                        return 'thứ 4';
                    case 5:
                        return 'thứ 5';
                    case 6:
                        return 'thứ 6';
                    case 7:
                        return 'thứ 7';
                    case 8:
                        return 'chủ nhật';
                    default:
                        return ''; // Nếu có số không hợp lệ, bạn có thể xử lý tùy thuộc vào yêu cầu của mình
                }
            });

            // Lọc ra các tên ngày không rỗng
            const sortedDayNames = dayNames.sort((a, b) => numbers[dayNames.indexOf(a)] - numbers[dayNames.indexOf(b)]);

            // Kết hợp các tên ngày thành chuỗi mới
            const resultString = sortedDayNames.join(', ');

            return resultString;
        } catch {
            return inputString;
        }

    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }
    );

    return (
        <>
            <div className='container-all-post-for-admin'>
                <div className='container'>
                    <div>
                        <Button href='./adminApprovePost' >Trở về trang duyệt bài</Button>
                    </div>
                    <div className='job-detail'>
                        <div className='job-detail-left'>
                            {jobDetail && jobDetail.length > 0 && jobDetail.map((item, index) => {
                                return (
                                    <div className='box-for-admin'>
                                        <div className='job-detail-left-name-for-admin'>{item.title}</div>
                                        <div className='job-detail-left-top'>
                                            <div className='job-detail-left-top-item'>
                                                <i class="fa-solid fa-sack-dollar" id='job-detail-icon'></i>
                                                <div>
                                                    <div className='job-detail-title-for-admin'>Mức lương</div>
                                                    <div className='job-detail-content-for-admin'>{VND.format(item.salary)}/{item.typeSalary}</div>
                                                </div>
                                            </div>

                                            <div className='job-detail-left-top-item'>
                                                <i class="fa-solid fa-location-dot" id='job-detail-icon'></i>
                                                <div>
                                                    <div className='job-detail-title-for-admin'>Địa điểm</div>
                                                    <div className='job-detail-content-for-admin'>{item.location}</div>
                                                </div>
                                            </div>

                                            <div className='job-detail-left-top-item' >
                                                <i class="fa-regular fa-hourglass-half" id='job-detail-icon'></i>
                                                <div>
                                                    <div className='job-detail-title-for-admin'>Kinh nghiệm</div>
                                                    <div className='job-detail-content-for-admin'>{item.experient}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='job-detail-left-top-due-for-admin'><i class="fa-regular fa-clock"></i>  Hạn nộp: {moment(item.deadline).format('DD/MM/yyyy')}</div>
                                        
                                    </div>
                                )
                            })
                            }

                            <div className='content-for-admin'>
                                {jobDetail && jobDetail.length > 0 && jobDetail.map((item, index) => {
                                    return (
                                        <div>
                                            <div className='content-detail'>
                                                <div className='content-detail-common-for-admin'>Chi tiết tin tuyển dụng</div>
                                            </div>
                                            <div className='content-title-for-admin'>Mô tả công việc</div>
                                            <div className='content-detail-job-for-admin'>
                                                <ul>
                                                    <li>{item.description}.</li>
                                                    {/* <li>Ghi đơn và đặt hàng: Họ lắng nghe yêu cầu của khách hàng, ghi đơn và truyền đơn đến bếp hoặc quầy pha chế. Họ cũng phải đảm bảo rằng các món đồ uống và món ăn được gửi đúng cho khách hàng.</li> */}
                                                </ul>
                                            </div>
                                            {item.daywork.includes(",") ? (
                                                <div>
                                                    <div className='content-title-for-admin'>Ngày làm việc hàng tuần: <div className='content-title-item'> {convertDaysOfWeek(item.daywork)}</div></div>
                                                    <div className='content-title-for-admin'>Ngày bắt đầu: <div className='content-title-item'> {format(new Date(item.startdate), 'dd-MM-yyyy')}</div></div>
                                                    <div className='content-title-for-admin'>Ngày kết thúc: <div className='content-title-item'> {format(new Date(item.startdate), 'dd-MM-yyyy')}</div></div>
                                                </div>
                                            ) : (
                                                <div className='content-title-for-admin'>Thời gian làm việc: <div className='content-title-item'> {format(new Date(item.daywork), 'dd-MM-yyyy')}</div></div>
                                            )}

                                            <div className='content-title-for-admin'>Thời gian làm việc trong ngày: <div className='content-title-item'> {item.jobTime}</div></div>

                                            <div className='content-title-for-admin'>Độ tuổi: <div className='content-title-item'> {item.toage}-{item.fromage} tuổi</div></div>

                                            <div className='content-title-for-admin'>Yêu cầu</div>
                                            <div className='content-detail-job-for-admin'>
                                                <ul>
                                                    <li>{item.description}.</li>
                                                    {/* <li>Kỹ năng giao tiếp:  Kỹ năng giao tiếp cơ bản bằng tiếng địa phương hoặc tiếng Anh có thể được yêu cầu, tùy theo vị trí làm việc.</li>
                          <li>Khả năng làm việc trong môi trường nhanh chóng.</li>
                          <li>Kiên nhẫn và thái độ tích cực.</li>
                          <li>Kỹ năng tổ chức: Quản lý đơn đặt hàng, đồ uống và thực đơn đòi hỏi khả năng tổ chức tốt.</li> */}
                                                </ul>
                                            </div>

                                            <div className='content-title-for-admin'>Ghi chú:</div>
                                            <div className='content-detail-job-for-admin'>
                                                <ul>
                                                    <li>{item.note}.</li>
                                                    {/* <li>Có mức thu nhập hấp dẫn.</li> */}
                                                </ul>
                                            </div>

                                            <div className='content-title-for-admin'>Quyền lợi</div>
                                            <div className='content-detail-job-for-admin'>
                                                <ul>
                                                    <li>{item.welfare}.</li>
                                                    {/* <li>Có mức thu nhập hấp dẫn.</li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>

                        </div>
                        <ToastContainer />
                        {jobDetail && jobDetail.length > 0 && jobDetail.map((item, index) => {
                            return (
                                <div className='job-detail-right'>
                                    <div className='job-company-detail-for-admin'>
                                        <div className='job-company-box'>
                                            <div className='job-company-logo'>
                                                <div><img id='company-logo' src={item.employer.image} alt="" /></div>
                                            </div>
                                            <div className='job-company-name-for-admin'>{item.employer.company}</div>
                                        </div>
                                        {/* <div className='job-company-address'>
                      <div className='job-company-title-for-admin'><i class="fa-solid fa-cake-candles"></i> Ngày sinh:</div>
                      <div className='job-company-address-detail'>{format(new Date(item.employer.dob), 'dd-MM-yyyy')}</div>
                    </div>
                    <div className='job-company-address'>
                      <div className='job-company-title-for-admin'><i class="fa-solid fa-phone"></i> Số điện thoại:</div>
                      <div className='job-company-address-detail'>{item.employer.phone}</div>
                    </div> */}
                                        <div className='job-company-address-for-admin'>
                                            <div className='job-company-title-for-admin'><i class="fa-solid fa-envelope"></i> Email:</div>
                                            <div className='job-company-address-detail'>{item.employer.account.email}</div>
                                        </div>
                                        {/* <div className='job-company-address'>
                      <div className='job-company-title-for-admin'><i class="fa-solid fa-location-dot"></i> Địa điểm:</div>
                      <div className='job-company-address-detail'>{item.employer.addressdetail}-{item.employer.distric}-{item.employer.city}</div>
                    </div> */}
                                    </div>
                                    <div className='infomation-common-for-admin'>
                                        <div className='infomation-common-title-for-admin'>Thông tin chung</div>
                                        <div className='infomation-private'>
                                            <div className='job-company-title-for-admin'><i class="fa-solid fa-medal" id='job-detail-icon'></i>Chức vụ</div>
                                            <div className='infomation-content-for-admin'>Nhân viên</div>
                                        </div>

                                        <div className='infomation-private'>
                                            <div className='job-company-title-for-admin'><i class="fa-regular fa-hourglass-half" id='job-detail-icon'></i>Trình độ học vấn</div>
                                            <div className='infomation-content-for-admin'>{item.levellearn}</div>
                                        </div>

                                        <div className='infomation-private'>
                                            <div className='job-company-title-for-admin'><i class="fa-solid fa-users" id='job-detail-icon'></i>Số lượng tuyển</div>
                                            <div className='infomation-content-for-admin'>{item.numberApply}</div>
                                        </div>

                                        <div className='infomation-private'>
                                            <div className='job-company-title-for-admin'><i class="fa-solid fa-briefcase" id='job-detail-icon'></i>Hình thức làm việc</div>
                                            {item.typeJob === 0 ? (
                                                <div className='infomation-content-for-admin'>Làm trong ngày</div>
                                            ) :
                                                item.typeJob === 1 ? (
                                                    <div className='infomation-content-for-admin'>Làm ngắn hạn</div>
                                                ) : (
                                                    <div className='infomation-content-for-admin'>Làm dài hạn</div>
                                                )
                                            }

                                        </div>

                                        <div className='infomation-private'>
                                            <div className='job-company-title-for-admin'><i class="fa-solid fa-venus-mars" id='job-detail-icon'></i>Giới tính</div>
                                            <div className='infomation-content-for-admin'>{item.gender}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostDetailForAdmin;
