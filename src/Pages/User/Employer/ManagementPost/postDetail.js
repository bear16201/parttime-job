import React from 'react'
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import logo_job from '../../../../Assets/logo-job.png'
import { useState } from 'react';
import { GetJobById } from '../../../../Service/userService';
import { getJobApplication } from '../../../../Service/jobService';
import { useEffect } from 'react';
import HeaderEmployer from "../../Themes/Header/headerEmployer";
import Footer from '../../Themes/Footer/footer';
import './post.scss';
import { Modal } from 'react-bootstrap';
import { format } from 'date-fns';
import Rating from '@mui/material/Rating';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import PopupInterview from '../../../Admin/components/popupContact'
import { GetCandidateOfPostDetail, GetCandidateOfPostDetailWatting } from '../../../../Service/interviewService';
import { GetChangeStatus, GetChangeStatus1, GetReasonCancelByJobApplicationId } from '../../../../Service/jobApplicationService.js';
import { AddNotiForCandidate } from '../../../../Service/notificationService.js';
import { SentFeedbackToCandidate } from '../../../../Service/feedbackService';
function PostDetail(props) {

    const navigate = useNavigate();
    const [jobDetail, setJobDetail] = useState([]);
    const [jobid, setjobid] = useState("");
    const [apply, setApply] = useState();
    const [applyRequest, setApplyRequest] = useState({ applicantId: '', jobId: '' });
    const [toggleTab, setToggleTab] = useState(1)
    //   ------------------------------------------------xử lý các nút bấm và danh sách ứng viên-----------------------------------
    const [notification, setNotification] = useState({ accountId: '', fromAccountId: '', title: '', content: '' })

    // --------------------------------phỏng vấn-----------------------------------
    const [emid, setEmid] = useState(sessionStorage.getItem("employerId"));
    const [listJobWaiting, setListJobWaiting] = useState([]);
    const [listJobDone, setListJobDone] = useState([]);
    const [listJobDeny, setListJobDeny] = useState([]);
    const [listCandidatecance, setlistCandidatecance] = useState([]);
    const [status, setStatus] = useState()


    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [rating, setRating] = useState(0);
    const [reasonHistory, setReasonHistory] = useState('');
    const [feedback, setFeedback] = useState({ content: '', from: '', to: '', status: 0, star: '' })
    const [Jobid, setJobid] = useState();

    const [btnPopup, setBtnPopup] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 4;
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const tokenE = localStorage.getItem("tokenE");
    console.log("tokenE", tokenE);
    useEffect(() => {
        GetJobWaiting();
        GetJobDone();
        GetJobDeny();
        getlistCandidatecance();
    }, [status, rating, jobid])

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        console.log("searchParams.get('jobid')", searchParams.get('jobid'))
        if (searchParams.get('jobid')) {
            setjobid(searchParams.get('jobid'));
        }
        getJobDeatail();
    }, [jobid]);

    const getJobDeatail = async () => {
        let res = await GetJobById(jobid, tokenE);
        if (res) {
            setJobDetail(res);
        }
        console.log("check", res);
    }
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }
    );

    const toggleTabHandle = (index) => {
        setToggleTab(index)
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

    //   ------------------------------------------------xử lý các nút bấm và danh sách ứng viên----------------------------------

    //---------------------------------Job Watting---------------------------------//
    const GetJobWaiting = async () => {
        let res = await GetCandidateOfPostDetailWatting(jobid, tokenE);
        if (res) {
            setListJobWaiting(res);
        }
        console.log("JobWaiting", res);
    }

    // const recordsWaitting = listJobWaiting.slice(firstIndex, lastIndex);
    // const npageJobWatting = Math.ceil(listJobWaiting.length / recordPerPage);
    // const numbersJobWatting = [...Array(npageJobWatting + 1).keys()].slice(1);

    // const nextPageJobWatting = () => {
    //     if (currentPage != npageJobWatting) {
    //         setCurrentPage(currentPage + 1)
    //     }
    // }

    //---------------------------------Job Done---------------------------------//

    const GetJobDone = async () => {
        let res = await GetCandidateOfPostDetail(jobid, 2, tokenE);
        if (res) {
            setListJobDone(res);
        }
        console.log("JobDone", res);
    }

    // const recordsDone = listJobDone.slice(firstIndex, lastIndex);
    // const npageJobDone = Math.ceil(listJobDone.length / recordPerPage);
    // const numbersJobDone = [...Array(npageJobDone + 1).keys()].slice(1);

    // const nextPageJobDone = () => {
    //     if (currentPage != npageJobDone) {
    //         setCurrentPage(currentPage + 1)
    //     }
    // }
    //---------------------------------Job Reject---------------------------------//
    const GetJobDeny = async () => {
        let res = await GetCandidateOfPostDetail(jobid, 3, tokenE);
        if (res) {
            setListJobDeny(res);
        }
        console.log("Cance", res);
    }

    // const recordsReject = listJobDeny.slice(firstIndex, lastIndex);
    // const npageJobReject = Math.ceil(listJobDeny.length / recordPerPage);
    // const numbersJobReject = [...Array(npageJobReject + 1).keys()].slice(1);

    // const nextPageJobReject = () => {
    //     if (currentPage != npageJobReject) {
    //         setCurrentPage(currentPage + 1)
    //     }
    // }
    //---------------------------------Candidate Cancel---------------------------------//
    const getlistCandidatecance = async () => {
        let res = await GetCandidateOfPostDetail(jobid, 1, tokenE);
        if (res) {
            setlistCandidatecance(res);
        }
        console.log("setlistCandidatecance", res);
    }

    // const recordsCandidateCancel = listCandidatecance.slice(firstIndex, lastIndex);
    // const npageJobCandidateCancel = Math.ceil(listCandidatecance.length / recordPerPage);
    // const numbersJobCandidateCancel = [...Array(npageJobCandidateCancel + 1).keys()].slice(1);

    // const nextPageJobCandidateCancel = () => {
    //     if (currentPage != npageJobCandidateCancel) {
    //         setCurrentPage(currentPage + 1)
    //     }
    // }
    //-------------------------------------------------------------------------------------------//
    const PhongVan = async (jobApplicationId) => {
        const userConfirmed = window.confirm('Bạn có chắc muốn chuyển người này sang chế độ phỏng vấn không?');
        // Nếu người dùng đồng ý, thực hiện xóa
        if (userConfirmed) {
            let res = await GetChangeStatus(jobApplicationId, 4, tokenE);
            console.log("GetJobApplicationChangeStatus", res);
            if (res) {
                toast.success("Chuyển sang phỏng vấn thành công");
                setStatus(jobApplicationId);
            }
        }
    }
    const handleClose = () => {
        setOpen3(false);
    };
    const [CID, setCID] = useState("");
    const [TITLE, setTITLE] = useState("");
    const [JOBAPPLICATIONID, setJOBAPPLICATIONID] = useState("");
    const [open3, setOpen3] = useState(false);
    const ChapNhan = async (cid, title, jobApplicationId) => {
        const userConfirmed = window.confirm('Bạn có chắc muốn nhận ứng viên này không?');
        // Nếu người dùng đồng ý, thực hiện xóa
        if (userConfirmed) {
            setCID(cid);
            setTITLE(title);
            setJOBAPPLICATIONID(jobApplicationId);
            let res = await GetChangeStatus(jobApplicationId, 2, tokenE);
            console.log("GetJobApplicationChangeStatus", res);
            if (res.message === "Quantity") {
                setOpen3(true);
            } else {
                notification.accountId = cid;
                notification.fromAccountId = sessionStorage.getItem('idOfEmp');
                notification.title = title + " thông báo";
                notification.content = `Bạn đã trúng tuyển công việc ${title}. Chi tiết công việc sẽ được thông báo sau bởi nhà tuyển dụng. Xin cảm ơn `;
                await AddNotiForCandidate(notification, tokenE);
                toast.success("Bạn đã nhận ứng viên thành công");
                setStatus(jobApplicationId);
            }
        }
    }

    const ChapNhanThem = async () => {
        // Nếu người dùng đồng ý, thực hiện xóa
        let res = await GetChangeStatus1(JOBAPPLICATIONID, 2, tokenE);
        console.log("GetJobApplicationChangeStatus", res);
        if (res) {
            notification.accountId = CID;
            notification.fromAccountId = sessionStorage.getItem('idOfEmp');
            notification.title = TITLE + " thông báo";
            notification.content = `Bạn đã trúng tuyển công việc ${TITLE}. Chi tiết công việc sẽ được thông báo sau bởi nhà tuyển dụng. Xin cảm ơn `;
            await AddNotiForCandidate(notification, tokenE);
            toast.success("Bạn đã nhận ứng viên thành công");
            setStatus(JOBAPPLICATIONID);
            setOpen3(false);
        }
    }
    const TuChoi = async (cid, title, jobApplicationId) => {
        const userConfirmed = window.confirm('Bạn có chắc muốn từ chối ứng viên này không?');
        // Nếu người dùng đồng ý, thực hiện xóa
        if (userConfirmed) {
            let res = await GetChangeStatus(jobApplicationId, 3, tokenE);
            console.log("GetJobApplicationChangeStatus", res);
            if (res) {
                notification.accountId = cid;
                notification.fromAccountId = sessionStorage.getItem('idOfEmp');
                notification.title = title + " thông báo";
                notification.content = `Công việc ${title} bạn ứng tuyển đã bị từ chối. Xin cảm ơn `;
                await AddNotiForCandidate(notification, tokenE);
                toast.success("Bạn đã từ chối ứng viên thành công");
                setStatus(jobApplicationId);
            }
        }
    }
    // --------------------------------Chờ duyệt-----------------------------------


    // Thêm useState để lưu trữ thông tin lý do hủy và hiển thị Modal
    const [showReasonModal, setShowReasonModal] = useState(false);
    const [reasonCancel, setReasonCancel] = useState('');

    // Tạo hàm để hiển thị Modal và thiết lập thông tin lý do hủy
    const handleShowReasonModal = async (id) => {
        try {
            const reason = await GetReasonCancelByJobApplicationId(id, tokenE); // Đợi Promise được giải quyết
            setShowReasonModal(true);
            setReasonCancel(reason);
        } catch (error) {
            console.error('Error fetching reason:', error);
        }
    };

    // Tạo hàm để ẩn Modal
    const handleCloseReasonModal = () => {
        setShowReasonModal(false);
    };
    const handleClickOpenHistory = (jobid) => {
        setJobid(jobid);
        setOpen1(true);
    };

    const handleCloseHistory = () => {
        setReasonHistory("");
        setRating(0);
        setOpen1(false);
    };
    const handleChangeHistory = (event) => {
        setReasonHistory(event.target.value);
    };
    const handleSubmitHistory = async () => {
        feedback.content = reasonHistory;
        feedback.from = emid;
        feedback.to = Jobid;
        feedback.star = rating;
        console.log(feedback);
        setStatus(Jobid);
        await SentFeedbackToCandidate(feedback, tokenE);
        toast.success("Bạn đã đánh giá công việc ");
        // showToast("Bạn đã đánh giá công việc ");
        // Điều gì xảy ra khi bạn nhấn "Gửi" ở đây
        handleCloseHistory(); // Đóng popup sau khi gửi
    }

    const prePage = () => {
        if (currentPage != 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const changePage = (id) => {
        setCurrentPage(id)
    }


    return (
        <>
            <HeaderEmployer />

            <div className='container-all-1'>
                <div className='container'>
                    <div className='post-detail-tabs'>
                        <div className={toggleTab === 1 ? "post-detail-tabs-item active-tab" : "post-detail-tabs-item"}
                            onClick={() => toggleTabHandle(1)}
                        >Chi tiết tuyển dụng</div>
                        <div className={toggleTab === 2 ? "post-detail-tabs-item active-tab" : "post-detail-tabs-item"}
                            onClick={() => toggleTabHandle(2)}>Ứng viên ({listJobWaiting.length})</div>
                        <div className={toggleTab === 3 ? "post-detail-tabs-item active-tab" : "post-detail-tabs-item"}
                            onClick={() => toggleTabHandle(3)}>Đã tuyển ({listJobDone.length})</div>
                        <div className={toggleTab === 4 ? "post-detail-tabs-item active-tab" : "post-detail-tabs-item"}
                            onClick={() => toggleTabHandle(4)}>Từ chối ({listJobDeny.length})</div>
                        <div className={toggleTab === 5 ? "post-detail-tabs-item active-tab" : "post-detail-tabs-item"}
                            onClick={() => toggleTabHandle(5)}>Ứng viên hủy ({listCandidatecance.length})</div>

                        <div className='btn-back'>
                            <Button href='./post' id="btn-back-to-post">Về quản lý bài đăng</Button>
                        </div>
                    </div>
                    <div className={toggleTab === 1 ? "post-detail-candidate" : "post-detail-candidate none-active-post-content"}>
                        {jobDetail && jobDetail.length > 0 && jobDetail.map((item, index) => {
                            return (
                                <div className={toggleTab === 1 ? "job-detail" : "job-detail none-active-post-content"}>
                                    <div className='job-detail-left'>
                                        <div className='box'>
                                            <div className='job-detail-left-name'>{item.title}</div>
                                            <div className='job-detail-left-top'>
                                                <div className='job-detail-left-top-item'>
                                                    <i class="fa-solid fa-sack-dollar" id='job-detail-icon'></i>
                                                    <div>
                                                        <div className='job-detail-title'>Mức lương</div>
                                                        <div className='job-detail-content'>{VND.format(item.salary)}/{item.typeSalary}</div>
                                                    </div>
                                                </div>

                                                <div className='job-detail-left-top-item'>
                                                    <i class="fa-solid fa-location-dot" id='job-detail-icon'></i>
                                                    <div>
                                                        <div className='job-detail-title'>Địa điểm</div>
                                                        <div className='job-detail-content'>{item.location}</div>
                                                    </div>
                                                </div>

                                                <div className='job-detail-left-top-item' >
                                                    <i class="fa-regular fa-hourglass-half" id='job-detail-icon'></i>
                                                    <div>
                                                        <div className='job-detail-title'>Kinh nghiệm</div>
                                                        <div className='job-detail-content'>{item.experient}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='job-detail-left-top-due'><i class="fa-regular fa-clock"></i>  Hạn nộp: {moment(item.deadline).format('DD/MM/YYYY')}</div>
                                        </div>

                                        <div className='content'>
                                            <div className='content-detail'>
                                                <div className='content-detail-common'>Chi tiết tin tuyển dụng</div>
                                            </div>
                                            <div className='content-title'>Mô tả công việc</div>
                                            <div className='content-detail-job'>
                                                <ul>
                                                    <li>{item.description}.</li>
                                                    {/* <li>Ghi đơn và đặt hàng: Họ lắng nghe yêu cầu của khách hàng, ghi đơn và truyền đơn đến bếp hoặc quầy pha chế. Họ cũng phải đảm bảo rằng các món đồ uống và món ăn được gửi đúng cho khách hàng.</li> */}
                                                </ul>
                                            </div>
                                            {item.daywork.includes(",") ? (
                                                <div>
                                                    <div className='content-title'>Ngày làm việc hàng tuần: <div className='content-title-item'> {convertDaysOfWeek(item.daywork)}</div></div>
                                                    <div className='content-title'>Ngày bắt đầu: <div className='content-title-item'> {format(new Date(item.startdate), 'dd-MM-yyyy')}</div></div>
                                                </div>
                                            ) : (
                                                <div className='content-title'>Ngày làm việc: <div className='content-title-item'> {format(new Date(item.daywork), 'dd-MM-yyyy')}</div></div>
                                            )}

                                            <div className='content-title'>Thời gian làm việc trong ngày: <div className='content-title-item'> {item.jobTime}</div></div>

                                            <div className='content-title'>Độ tuổi: <div className='content-title-item'> {item.toage}-{item.fromage} tuổi</div></div>

                                            <div className='content-title'>Yêu cầu</div>
                                            <div className='content-detail-job'>
                                                <ul>
                                                    <li>{item.description}.</li>
                                                </ul>
                                            </div>

                                            <div className='content-title'>Ghi chú:</div>
                                            <div className='content-detail-job'>
                                                <ul>
                                                    <li>{item.note}.</li>
                                                </ul>
                                            </div>

                                            <div className='content-title'>Quyền lợi</div>
                                            <div className='content-detail-job'>
                                                <ul>
                                                    <li>{item.welfare}.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='job-detail-right'>
                                        {/* <div className='job-company-detail'>
                                            <div className='job-company-box'>
                                                <div className='job-candidate-logo'>
                                                    <div><img id='candidate-logo' src={item.applicant.image} alt="" /></div>
                                                </div>
                                                <div className='job-company-name'>{item.company}</div>
                                            </div>
                                            <div className='job-company-address'>
                                                <div className='job-company-title'><i class="fa-solid fa-cake-candles"></i> <span><i class="fa-solid fa-cake-candles"></i> Ngày sinh:</span> </div>
                                                <div className='job-company-address-detail'>{format(new Date(item.employer.dob), 'dd-MM-yyyy')}</div>
                                            </div>
                                            <div className='job-company-address'>
                                                <div className='job-company-title'><i class="fa-solid fa-phone"></i> Số điện thoại:</div>
                                                <div className='job-company-address-detail'>{item.employer.phone}</div>
                                            </div>
                                            <div className='job-company-address'>
                                                <div className='job-company-title'><i class="fa-solid fa-envelope"></i> Email:</div>
                                                <div className='job-company-address-detail'>{item.employer.account.email}</div>
                                            </div>
                                            <div className='job-company-address'>
                                                <div className='job-company-title'><i class="fa-solid fa-location-dot"></i> Địa điểm:</div>
                                                <div className='job-company-address-detail'>{item.employer.addressdetail}-{item.employer.distric}-{item.employer.city}</div>
                                            </div>
                                        </div> */}
                                        <div className='infomation-common-post-detail'>
                                            <div className='infomation-common-title'>Thông tin chung</div>
                                            <div className='infomation-private'>
                                                <div className='job-company-title'><i class="fa-solid fa-medal" id='job-detail-icon'></i>Chức vụ</div>
                                                <div className='infomation-content'>Nhân viên</div>
                                            </div>

                                            <div className='infomation-private'>
                                                <div className='job-company-title'><i class="fa-regular fa-hourglass-half" id='job-detail-icon'></i>Trình độ học vấn</div>
                                                <div className='infomation-content'>{item.levellearn}</div>
                                            </div>

                                            <div className='infomation-private'>
                                                <div className='job-company-title'><i class="fa-solid fa-users" id='job-detail-icon'></i>Số lượng tuyển</div>
                                                <div className='infomation-content'>{item.numberApply}</div>
                                            </div>

                                            <div className='infomation-private'>
                                                <div className='job-company-title'><i class="fa-solid fa-briefcase" id='job-detail-icon'></i>Hình thức làm việc</div>
                                                {item.typeJob === 0 ? (
                                                    <div className='infomation-content'>Làm trong ngày</div>
                                                ) :
                                                    item.typeJob === 1 ? (
                                                        <div className='infomation-content'>Làm ngắn hạn</div>
                                                    ) : (
                                                        <div className='infomation-content'>Làm dài hạn</div>
                                                    )
                                                }

                                            </div>

                                            <div className='infomation-private'>
                                                <div className='job-company-title'><i class="fa-solid fa-venus-mars" id='job-detail-icon'></i>Giới tính</div>
                                                <div className='infomation-content'>{item.gender}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>

                    <div className={toggleTab === 2 ? "post-detail-candidate" : "post-detail-candidate none-active-post-content"}>
                        {listJobWaiting && listJobWaiting.length > 0 &&
                            listJobWaiting.map((item, index) => {
                                return (
                                    <div className="candidate-manage-item-job-cv" style={{ height: 160 }}>
                                        <div className='job-list-item'>
                                            <div className='candidate-manage-item-left'>
                                                <div className="job-list-logo">
                                                    <img id='candidate-logo' src={item.applicant.image} alt="" />
                                                </div>
                                                <div className='job-list-item-left-content'>
                                                    <div className='candidate-manage-item-job-cv-name'><a href={`/cvGenarel?candidateId=${item.applicantId}`}>{item.applicant.account.fullName}</a></div>
                                                    <div className='candidate-job-list-des'>
                                                        <div className='job-list-company'><span><i class="fa-solid fa-location-dot"></i> Địa chỉ:</span> {item.applicant.distric}-{item.applicant.city}</div>
                                                    </div>
                                                    <div className='candidate-job-list-des'>
                                                        <div className='job-list-company'><span><i class="fa-solid fa-cake-candles"></i> Ngày sinh:</span> {format(new Date(item.applicant.dob), 'dd-MM-yyyy')}</div>
                                                    </div>
                                                    <div className='candidate-job-list-des'>
                                                        <div className='job-list-company'><span><i class="fa-solid fa-phone"></i> Liên hệ:</span> {item.applicant.phone}</div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='candidate-manage-item-right'>
                                                <div className='candidate-manage-item-right-content'>
                                                    {item.status === 5 ? (
                                                        <Button id="btn-manage-can" disabled variant="info" >Đang phỏng vấn</Button>
                                                    ) : (
                                                        <Button id="btn-manage-can" onClick={() => PhongVan(item.id, 4)} variant="info" >Chờ phỏng vấn</Button>
                                                    )}
                                                    <Button id="btn-manage-can" onClick={() => ChapNhan(item.applicantId, item.job.title, item.id, 2)} variant="success">Chấp nhận</Button>
                                                    <Button id="btn-manage-can" onClick={() => TuChoi(item.applicantId, item.job.title, item.id, 3)} variant="danger">Từ chối</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        {/* {listJobWaiting && listJobWaiting.length > 0 &&
                            <nav>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" onClick={prePage}>Prev</a>
                                    </li>
                                    {
                                        numbersJobWatting.map((n, i) => (
                                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                                <a className="page-link" onClick={() => changePage(n)}>{n}</a>
                                            </li>
                                        ))
                                    }
                                    <li className="page-item">
                                        <a className="page-link" onClick={nextPageJobWatting}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                        } */}
                        <Dialog open={open3} onClose={handleClose} className="custom-dialog-content">
                            <div style={{ display: 'flex', alignItems: 'center', margin: 50, fontSize: 20 }}>
                                <span>Bạn đã tuyển đủ số lượng cần tuyển cho công việc này. Bạn có muốn tuyển thêm không?</span>
                            </div>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Đóng
                                </Button>
                                <Button onClick={ChapNhanThem} color="primary">
                                    Tuyển
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <div className={toggleTab === 3 ? "post-detail-candidate" : "post-detail-candidate none-active-post-content"}>
                        {listJobDone && listJobDone.length > 0 &&
                            listJobDone.map((item, index) => {
                                return (
                                    <div className="candidate-manage-item-job-cv" style={{ height: 160 }}>
                                        <div className='job-list-item'>
                                            <div className='candidate-manage-item-left'>
                                                <div className="job-list-logo">
                                                    <img id='candidate-logo' src={item.applicant.image} alt="" />
                                                </div>
                                                <div className='job-list-item-left-content'>
                                                    <div className='candidate-manage-item-job-cv-name'><a href={`/cvGenarel?candidateId=${item.applicantId}`}>{item.applicant.account.fullName}</a></div>
                                                    <div className='candidate-job-list-des'>
                                                        <div className='job-list-company'><span><i class="fa-solid fa-location-dot"></i> Địa chỉ:</span> {item.applicant.distric}-{item.applicant.city}</div>
                                                    </div>
                                                    <div className='candidate-job-list-des'>
                                                        <div className='job-list-company'><span><i class="fa-solid fa-cake-candles"></i> Ngày sinh:</span> {format(new Date(item.applicant.dob), 'dd-MM-yyyy')}</div>
                                                    </div>
                                                    <div className='candidate-job-list-des'>
                                                        <div className='job-list-company'><span><i class="fa-solid fa-phone"></i> Liên hệ:</span> {item.applicant.phone}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='candidate-manage-item-right'>
                                                <div className='candidate-manage-item-right-content'>
                                                    {item.isEmployerComment === 1 ? (
                                                        <div className='job-list-item-right'>
                                                            <Button disabled id="btn-manage-can">Đã Feedback</Button>
                                                        </div>
                                                    ) : (
                                                        <div className='job-list-item-right'>
                                                            <Button onClick={() => handleClickOpenHistory(item.id)} id="btn-manage-can">Feedback</Button>
                                                            <Dialog open={open1} onClose={handleCloseHistory} className="custom-dialog-content">
                                                                <img src="data:image/png;base64,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"
                                                                    alt="Logo" style={{ width: '100%' }} />
                                                                <DialogContent className="custom-dialog-content-container">
                                                                    <textarea
                                                                        value={reasonHistory}
                                                                        onChange={handleChangeHistory}
                                                                        placeholder="Nhập nội dung feedback" style={{ width: '400px', height: '200px', opacity: '0.7', fontWeight: 'bold' }}></textarea>
                                                                </DialogContent>
                                                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 50 }}>
                                                                    <span>Đánh giá sao:</span>
                                                                    <Rating
                                                                        value={rating}
                                                                        onChange={(event, newValue) => {
                                                                            setRating(newValue);
                                                                        }}
                                                                    />
                                                                </div>
                                                                <DialogActions>
                                                                    <Button onClick={handleCloseHistory} color="primary">
                                                                        Đóng
                                                                    </Button>
                                                                    <Button onClick={() => handleSubmitHistory()} color="primary">
                                                                        Gửi
                                                                    </Button>
                                                                </DialogActions>
                                                            </Dialog>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        {/* {listJobDone && listJobDone.length > 0 &&
                            <nav>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" onClick={prePage}>Prev</a>
                                    </li>
                                    {
                                        numbersJobDone.map((n, i) => (
                                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                                <a className="page-link" onClick={() => changePage(n)}>{n}</a>
                                            </li>
                                        ))
                                    }
                                    <li className="page-item">
                                        <a className="page-link" onClick={nextPageJobDone}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                        } */}
                    </div>

                    <div className={toggleTab === 4 ? "post-detail-candidate" : "post-detail-candidate none-active-post-content"}>
                        {listJobDeny && listJobDeny.length > 0 &&
                            listJobDeny.map((item, index) => {
                                return (
                                    <div className="candidate-manage-item-job-cv" style={{ height: 160 }}>
                                        <div className='job-list-item'>
                                            <div className='candidate-manage-item-left'>
                                                <div className="job-list-logo">
                                                    <img id='candidate-logo' src={item.applicant.image} alt="" />
                                                </div>
                                                <div className='job-list-item-left-content'>
                                                    <div className='candidate-manage-item-job-cv-name'><a href={`/cvGenarel?candidateId=${item.applicantId}`}>{item.applicant.account.fullName}</a></div>
                                                    <div className='candidate-job-list-des'>
                                                        <div className='job-list-company'><span><i class="fa-solid fa-location-dot"></i> Địa chỉ:</span> {item.applicant.distric}-{item.applicant.city}</div>
                                                    </div>
                                                    <div className='candidate-job-list-des'>
                                                        <div className='job-list-company'><span><i class="fa-solid fa-cake-candles"></i> Ngày sinh:</span> {format(new Date(item.applicant.dob), 'dd-MM-yyyy')}</div>
                                                    </div>
                                                    <div className='candidate-job-list-des'>
                                                        <div className='job-list-company'><span><i class="fa-solid fa-phone"></i> Liên hệ:</span> {item.applicant.phone}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        {/* {listJobDeny && listJobDeny.length > 0 &&
                            <nav>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" onClick={prePage}>Prev</a>
                                    </li>
                                    {
                                        numbersJobReject.map((n, i) => (
                                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                                <a className="page-link" onClick={() => changePage(n)}>{n}</a>
                                            </li>
                                        ))
                                    }
                                    <li className="page-item">
                                        <a className="page-link" onClick={nextPageJobReject}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                        } */}
                    </div>

                    <div className={toggleTab === 5 ? "post-detail-candidate" : "post-detail-candidate none-active-post-content"}>
                        {listCandidatecance && listCandidatecance.length > 0 &&
                            listCandidatecance.map((item, index) => {
                                return (
                                    <div className="candidate-manage-item-job-cv" style={{ height: 160 }}>
                                        <div className='job-list-item'>
                                            <div className='candidate-manage-item-left'>
                                                <div className="job-list-logo">
                                                    <img id='candidate-logo' src={item.applicant.image} alt="" />
                                                </div>
                                                <div className='job-list-item-left-content'>
                                                    <div className='candidate-manage-item-job-cv-name'><a href={`/cvGenarel?candidateId=${item.applicantId}`}>{item.applicant.account.fullName}</a></div>
                                                    <div className='candidate-job-list-des'>
                                                        <div className='job-list-company'><span><i class="fa-solid fa-location-dot"></i> Địa chỉ:</span> {item.applicant.distric}-{item.applicant.city}</div>
                                                    </div>
                                                    <div className='candidate-job-list-des'>
                                                        <div className='job-list-company'><span><i class="fa-solid fa-cake-candles"></i> Ngày sinh:</span> {format(new Date(item.applicant.dob), 'dd-MM-yyyy')}</div>
                                                    </div>
                                                    <div className='candidate-job-list-des'>
                                                        <div className='job-list-company'><span><i class="fa-solid fa-phone"></i> Liên hệ:</span> {item.applicant.phone}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='candidate-manage-item-right'>
                                                <div className='candidate-manage-item-right-content'>
                                                    <div className="candidate-cancel-btn">
                                                        <div>
                                                            <Button
                                                                onClick={() => handleShowReasonModal(item.id)}
                                                                id="btn-manage-can">Xem lý do</Button>
                                                        </div>
                                                        <Modal show={showReasonModal} onHide={handleCloseReasonModal}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Lý do hủy</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <p>{reasonCancel}</p>
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="secondary" onClick={handleCloseReasonModal}>
                                                                    Đóng
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        {/* {listCandidatecance && listCandidatecance.length > 0 &&
                            <nav>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" onClick={prePage}>Prev</a>
                                    </li>
                                    {
                                        numbersJobCandidateCancel.map((n, i) => (
                                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                                <a className="page-link" onClick={() => changePage(n)}>{n}</a>
                                            </li>
                                        ))
                                    }
                                    <li className="page-item">
                                        <a className="page-link" onClick={nextPageJobCandidateCancel}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                        } */}
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Footer />
        </>
    )
}

export default PostDetail;
