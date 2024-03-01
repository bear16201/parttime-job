import React, { useState } from 'react'
import Footer from '../../Themes/Footer/footer'
import Header from '../../Themes/Header/header'
import './jobManage.scss';
import moment from 'moment';
import logo_job from '../../../../Assets/logo-job.png';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Rating from '@mui/material/Rating';
import { GetJobCare, DeleteJobCare, ApplyjobCance, GetJobByStatus, CanceApplyJob } from '../../../../Service/jobService';
import { ToastContainer, toast } from 'react-toastify';
import { SentFeedback } from '../../../../Service/feedbackService';
import { AddNotiForEmployer } from '../../../../Service/notificationService.js';


export default function JobManage() {
    const [listJobCare, setListJobCare] = useState([]);
    const [listJobHistory, setListJobHistory] = useState([]);
    const [listJobWait, setListJobWait] = useState([]);
    const [listJobCancel, setListJobCancel] = useState([]);

    const [dele, setdele] = useState();

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [rating, setRating] = useState(0);
    const [Jobid, setJobid] = useState();
    const [reasonHistory, setReasonHistory] = useState('');
    const [MessageError, setMessageError] = useState('');
    const [feedback, setFeedback] = useState({ content: '', from: '', to: '', status: 0, star: '' })
    const [notification, setNotification] = useState({ accountId: '', fromAccountId: '', title: '', content: '' })

    const [Mess, setMess] = useState('');
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const [reasonWait, setReasonWait] = useState('');
    const [Cancel, setCancel] = useState({ jobId: 0, resonCancel: '' });

    const [emid, setEid] = useState(sessionStorage.getItem("employerId"));
    const [toggleTab, setToggleTab] = useState(1)

    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 4;
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const token = localStorage.getItem("token");
    console.log("localStorage.getItem token", token);
    //---------------------------------Care---------------------------------//
    useEffect(() => {
        getJobsWait();
        getJobsCancel();
        getJobsCare();
        getJobsHistory();
    }, [dele, rating])


    const getJobsCare = async () => {
        const candidateId = sessionStorage.getItem("candidateId");
        console.log("candidateId", candidateId);
        let res = await GetJobCare(candidateId, token);
        if (res) {
            setListJobCare(res);
        }
        console.log("check", res);
    }

    const recordsJobCare = listJobCare.slice(firstIndex, lastIndex);
    const npageJobCare = Math.ceil(listJobCare.length / recordPerPage);
    const numbersJobCare = [...Array(npageJobCare + 1).keys()].slice(1);

    const nextPageJobCare = () => {
        if (currentPage != npageJobCare) {
            setCurrentPage(currentPage + 1)
        }
    }

    const Delete = async (yourParameter) => {
        console.log("localStorage.getItem token Delete", token);
        await DeleteJobCare(yourParameter, token);
        setdele(yourParameter);
        // showToast("Bạn đã xóa công việc ra khỏi danh sách công việc quan tâm");
        toast.success("Bạn đã xóa công việc ra khỏi danh sách công việc quan tâm");
    }
    const handleClickOpen1 = () => {
        setOpen2(true);
    };
    const handleClickOpen2 = () => {
        setOpen3(true);
    };

    const Apply = async (jobId) => {
        console.log(jobId)
        if (sessionStorage.getItem("idOfEmp") != null && sessionStorage.getItem("idOfCandidate") == null) {
            toast.error("Bạn dãy đăng xuất tài khoản nhà tuyển dụng");
            return;
        }
        console.log("localStorage.getItem token ApplyjobCance", token);
        const userConfirmed = window.confirm('Bạn có chắc muốn ứng tuyển không?');
        // Nếu người dùng đồng ý, thực hiện xóa
        if (userConfirmed) {
            let res = await ApplyjobCance(jobId, token);
            if (res.message === "CV") {
                setMess("Bạn cần điền đầy đủ thông tin cơ bản trước khi ứng tuyển");
                handleClickOpen1();
            } else if (res.message === "MaxApply") {
                setMess("Vì đánh giá sao của bạn thấp nên bạn bị giới hạn số lần ứng tuyển");
                handleClickOpen2();
            } else if (res.message === "CanApply") {
                setMess("Không thể ứng tuyển vì công việc đã được nhận hoặc đã bị từ chối");
                handleClickOpen2();
            }
            else {
                console.log("ApplyjobCance", res)
                setdele(jobId);
                // showToast("Bạn đã ứng tuyển công việc thành công");
                toast.success("Bạn đã ứng tuyển công việc thành công");
            }

        }

    }
    const handleDeleteClick = (id) => {
        // Hiển thị cảnh báo và xác nhận từ người dùng
        const userConfirmed = window.confirm('Bạn có chắc muốn bỏ quan tâm không?');

        // Nếu người dùng đồng ý, thực hiện xóa
        if (userConfirmed) {
            Delete(id);
        }
    };
    //---------------------------------History---------------------------------//
    // useEffect(() => {
    //     getJobsHistory();
    // }, [apply, rating])
    const getJobsHistory = async () => {
        const candidateId = sessionStorage.getItem("candidateId");
        let res = await GetJobByStatus(2, candidateId, token);
        if (res) {
            setListJobHistory(res);
        }
        console.log("getJobsHistory", res);
    }

    const recordsJobHistory = listJobHistory.slice(firstIndex, lastIndex);
    const npageJobHistory = Math.ceil(listJobHistory.length / recordPerPage);
    const numbersJobHistory = [...Array(npageJobHistory + 1).keys()].slice(1);

    const nextPageJobHistory = () => {
        if (currentPage != npageJobHistory) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handleClickOpenHistory = (jobid) => {
        setJobid(jobid);
        setOpen1(true);
    };

    const handleCloseHistory = () => {
        setReasonHistory("");
        setMessageError("");
        setRating(0);
        setOpen1(false);
    };
    const handleClose = () => {
        setOpen2(false);
        setOpen3(false);
    };

    const handleSubmitHistory = async (empId) => {
        if (!reasonHistory.length > 0) {
            setMessageError("Mời bạn nhập nôi dung");
            return;
        }
        const accoutnId = sessionStorage.getItem("candidateId");
        feedback.content = reasonHistory;
        feedback.from = accoutnId;
        feedback.to = Jobid;
        feedback.star = rating;
        console.log(feedback);
        setdele(Jobid);
        let res = await SentFeedback(feedback, token);
        if (res.message === "successfull") {
            notification.accountId = empId;
            notification.fromAccountId = sessionStorage.getItem("idOfCandidate");
            notification.title = `Bạn đã nhận được đánh giá từ: ${sessionStorage.getItem("fullname")}`;
            notification.content = `Nội dung đánh giá: ${reasonHistory}. Đánh giá sao: ${rating} sao`;
            await AddNotiForEmployer(notification, token);
            toast.success("Bạn đã đánh giá công việc ");
            // showToast("Bạn đã đánh giá công việc ");
            // Điều gì xảy ra khi bạn nhấn "Gửi" ở đây
            handleCloseHistory(); // Đóng popup sau khi gửi
        }

    }

    const handleChangeHistory = (event) => {
        setReasonHistory(event.target.value);
    };
    //---------------------------------Wait---------------------------------//
    // useEffect(() => {
    //     getJobsWait();
    // }, [waitApply])
    const getJobsWait = async () => {
        const candidateId = sessionStorage.getItem("candidateId");
        let res = await GetJobByStatus(0, candidateId, token);
        if (res) {
            setListJobWait(res);
        }
        console.log("check", res);
    }

    const recordsJobWait = listJobWait.slice(firstIndex, lastIndex);
    const npageJobWait = Math.ceil(listJobWait.length / recordPerPage);
    const numbersJobWait = [...Array(npageJobWait + 1).keys()].slice(1);

    const nextPageJobWait = () => {
        if (currentPage != npageJobWait) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handleChange = (value) => {
        setReasonWait(value);
    };

    const handleClickOpenWait = () => {
        setOpen(true);
    };

    const handleCloseWait = () => {
        setReasonWait("");
        setOpen(false);
    };
    const CanceApplyWait = (id) => {
        Cancel.jobId = id;
        console.log(Cancel);
        handleClickOpenWait();
    };


    const handleSubmitWait = async (id) => {
        Cancel.resonCancel = reasonWait;
        if (reasonWait.length <= 0) {
            handleCloseWait();
            return;
        }
        console.log(Cancel);
        await CanceApplyJob(Cancel, token);
        setdele(id);
        console.log("Hủy Ứng tuyển", id);
        // showToast("Bạn đã hủy Ứng tuyển thành công");
        toast.success("Bạn đã hủy Ứng tuyển thành công");
        handleCloseWait();
    }
    //---------------------------------Cancel---------------------------------//
    // useEffect(() => {
    //     getJobsCancel();
    // }, [applyAgain])

    const getJobsCancel = async () => {
        const candidateId = sessionStorage.getItem("candidateId");
        let res = await GetJobByStatus(3, candidateId, token);
        if (res) {
            setListJobCancel(res);
        }
        console.log("check", res);
    }

    const recordsJobCancel = listJobCancel.slice(firstIndex, lastIndex);
    const npageJobCancel = Math.ceil(listJobCancel.length / recordPerPage);
    const numbersJobCancel = [...Array(npageJobCancel + 1).keys()].slice(1);

    const nextPageJobCancel = () => {
        if (currentPage != npageJobCancel) {
            setCurrentPage(currentPage + 1)
        }
    }

    const toggleTabHandle = (index) => {
        setToggleTab(index);
    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

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
            <Header />
            <div className='container'>
                <div className='job-manage-button'>
                    <div className='job-manage-button'>
                        <div className='job-manage-button-item'>
                            <div className={toggleTab === 1 ? "job-manage-btn active-btn" : "job-manage-btn"} onClick={() => toggleTabHandle(1)}>
                                <i className="fa-regular fa-heart" id='job-manage-icon'></i>Công việc quan tâm ({listJobCare.length})
                            </div>
                        </div>
                        <div className='job-manage-button-item'>
                            <div className={toggleTab === 3 ? "job-manage-btn active-btn" : "job-manage-btn"} onClick={() => toggleTabHandle(3)} variant="primary">
                                <i className="fa-solid fa-briefcase" id='job-manage-icon'></i>Công việc đang ứng tuyển({listJobWait.length})
                            </div>
                        </div>
                        <div className='job-manage-button-item'>
                            <div className={toggleTab === 2 ? "job-manage-btn active-btn" : "job-manage-btn"} onClick={() => toggleTabHandle(2)} variant="primary">
                                <i className="fa-solid fa-laptop-file" id='job-manage-icon'></i>Công việc đã được nhận({listJobHistory.length})
                            </div>
                        </div>

                        <div className='job-manage-button-item'>
                            <div className={toggleTab === 4 ? "job-manage-btn active-btn" : "job-manage-btn"} onClick={() => toggleTabHandle(4)} variant="primary">
                                <i className="fa-solid fa-ban" id='job-manage-icon'></i>Công việc bị từ chối({listJobCancel.length})
                            </div>
                        </div>
                    </div>

                </div>

                <div className={toggleTab === 1 ? "job-favorite" : "job-favorite none-active-post-content"}>
                    <div className='job-manage-quantity'>
                        <div className='job-manage-quantity-item'>
                            Danh sách đang có <span>{listJobCare.length || 0} công việc</span> quan tâm
                        </div>
                    </div>

                    <div className='job-manage-list'>
                        {recordsJobCare && recordsJobCare.length > 0 &&
                            recordsJobCare.map((item, index) => {
                                return (
                                    <div className="all-job-list-detail" style={{ height: '180px' }}>
                                        <div className='job-list-item'>
                                            <div className='job-list-item-left-manage'>
                                                <div className="job-list-logo">
                                                    <img id='company-logo' src={logo_job} alt="" />
                                                </div>
                                                <div className='job-list-item-left-content'>
                                                    <div className='job-list-name'><a href={`/job-detail?jobid=${item.id}`}>{item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}</a></div>
                                                    <div className='job-list-des'>
                                                        <div className='job-list-company'>{item.company}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='job-list-item-right'>
                                                <div className='btn-manage-choice'>
                                                    <div>
                                                        <Button onClick={() => handleDeleteClick(item.jobAppId)} id='btn-dis-care' variant="success">Bỏ quan tâm</Button>
                                                    </div>
                                                    {(item.employerId == emid) ? (
                                                        <div>
                                                            <Button disabled id='btn-dis-care' variant="success">Của bạn</Button>
                                                        </div>
                                                    ) : (
                                                        (item.status === 1) ? (
                                                            <div>
                                                                <Button onClick={() => Apply(item.jobAppId)} id='btn-dis-care' variant="success">Ứng tuyển ngay</Button>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <Button disabled id='btn-dis-care' variant="success">Đã ứng tuyển</Button>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='job-list-sumary'>
                                            <div className='job-list-sumary-item'><i class="fa-solid fa-hourglass-half"></i> {item.jobTime}</div>
                                            <div className='job-list-sumary-item'><i class="fa-solid fa-money-bill-wave"></i> {VND.format(item.salary)}/{item.typeSalary}</div>
                                            <div className='job-list-sumary-item'><i class="fa-regular fa-clock"></i> {moment(item.deadline).format('DD/MM/YYYY')}</div>
                                            <div className='job-list-sumary-item'><i class="fa-solid fa-location-dot"></i> {item.location}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Dialog open={open2} onClose={handleClose} className="custom-dialog-content">
                        <div style={{ display: 'flex', alignItems: 'center', margin: 50, fontSize: 20 }}>
                            <span>{Mess}</span>
                        </div>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Đóng
                            </Button>
                            <Button href="/profile" color="primary">
                                Điền thông tin
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={open3} onClose={handleClose} className="custom-dialog-content">
                        <div style={{ display: 'flex', alignItems: 'center', margin: 50, fontSize: 20 }}>
                            <span>{Mess}</span>
                        </div>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Đóng
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {recordsJobCare && recordsJobCare.length > 0 &&
                        <nav style={{ textAlign: 'center' }}>
                            <ul className="pagination">
                                <li className="page-item">
                                    <a className="page-link" onClick={prePage}>Prev</a>
                                </li>
                                {
                                    numbersJobCare.map((n, i) => (
                                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                            <a className="page-link" onClick={() => changePage(n)}>{n}</a>
                                        </li>
                                    ))
                                }
                                <li className="page-item">
                                    <a className="page-link" onClick={nextPageJobCare}>Next</a>
                                </li>
                            </ul>
                        </nav>
                    }
                </div>

                <div className={toggleTab === 2 ? "job-wait" : "job-wait none-active-post-content"}>
                    <div className='job-manage-quantity'>
                        <div className='job-manage-quantity-item'>
                            Danh sách đang có <span>{listJobHistory.length || 0} công việc</span> đã làm
                        </div>
                    </div>

                    <div className='job-manage-list'>
                        {recordsJobHistory && recordsJobHistory.length > 0 &&
                            recordsJobHistory.map((item, index) => {
                                return (
                                    <div className="all-job-list-detail" style={{ height: '180px' }}>
                                        <div className='job-list-item'>
                                            <div className='job-list-item-left-manage'>
                                                <div className="job-list-logo">
                                                    <img id='company-logo' src={logo_job} alt="" />
                                                </div>
                                                <div className='job-list-item-left-content'>
                                                    <div className='job-list-name'><a href={`/job-detail?jobid=${item.id}`}>{item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}</a></div>
                                                    <div className='job-list-des'>
                                                        <div className='job-list-company'>{item.company}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {item.isComment === 1 ? (
                                                <div className='job-list-item-right'>
                                                    <div className='btn-manage-choice'>
                                                        <Button disabled id='btn-dis-care' variant="success">Đã Feedback</Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='job-list-item-right'>
                                                    <div className='btn-manage-choice'>
                                                        <Button onClick={() => handleClickOpenHistory(item.jobAppId)} id='btn-dis-care' variant="success">Feedback</Button>
                                                    </div>
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
                                                            <Button onClick={() => handleSubmitHistory(item.employerId)} color="primary">
                                                                Gửi
                                                            </Button>
                                                        </DialogActions>
                                                        <p className="error-message">{MessageError}</p>
                                                    </Dialog>
                                                </div>
                                            )}
                                        </div>

                                        <div className='job-list-sumary'>
                                            <div className='job-list-sumary-item'><i class="fa-solid fa-hourglass-half"></i> {item.jobTime}</div>
                                            <div className='job-list-sumary-item'><i class="fa-solid fa-money-bill-wave"></i> {VND.format(item.salary)}/{item.typeSalary}</div>
                                            <div className='job-list-sumary-item'><i class="fa-regular fa-clock"></i> {moment(item.deadline).format('DD/MM/YYYY')}</div>
                                            <div className='job-list-sumary-item'><i class="fa-solid fa-location-dot"></i> {item.location}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {recordsJobHistory && recordsJobHistory.length > 0 &&
                        <nav style={{ textAlign: 'center' }}>
                            <ul className="pagination">
                                <li className="page-item">
                                    <a className="page-link" onClick={prePage}>Prev</a>
                                </li>
                                {
                                    numbersJobHistory.map((n, i) => (
                                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                            <a className="page-link" onClick={() => changePage(n)}>{n}</a>
                                        </li>
                                    ))
                                }
                                <li className="page-item">
                                    <a className="page-link" onClick={nextPageJobHistory}>Next</a>
                                </li>
                            </ul>
                        </nav>
                    }
                </div>

                <div className={toggleTab === 3 ? "job-wait" : "job-wait none-active-post-content"}>
                    <div className='job-manage-quantity'>
                        <div className='job-manage-quantity-item'>
                            Danh sách đang có <span>{listJobWait.length || 0} công việc</span> chờ duyệt
                        </div>
                    </div>

                    <div className='job-manage-list'>
                        {recordsJobWait && recordsJobWait.length > 0 &&
                            recordsJobWait.map((item, index) => {
                                return (
                                    <div className="all-job-list-detail" style={{ height: '180px' }}>
                                        <div className='job-list-item'>
                                            <div className='job-list-item-left-manage'>
                                                <div className="job-list-logo">
                                                    <img id='company-logo' src={logo_job} alt="" />
                                                </div>
                                                <div className='job-list-item-left-content'>
                                                    <div className='job-list-name'><a href={`/job-detail?jobid=${item.id}`}>{item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}</a></div>
                                                    <div className='job-list-des'>
                                                        <div className='job-list-company'>{item.company}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='job-list-item-right'>
                                                <div className='btn-manage-choice'>
                                                    <Button onClick={() => CanceApplyWait(item.jobAppId)} id='btn-dis-care' variant="success">Hủy ứng tuyển</Button>
                                                </div>
                                            </div>
                                            <Dialog open={open} onClose={handleCloseWait} className="custom-dialog-content">
                                                <img src="data:image/jpeg;base64,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"
                                                    alt="Logo" style={{ width: '100%' }} />
                                                <DialogContent className="custom-dialog-content-container">
                                                    <div>
                                                        <input type="radio"
                                                            onChange={() => handleChange("không muốn ứng tuyển công việc nữa")}
                                                            value="không muốn ứng tuyển công việc nữa" checked={reasonWait === "không muốn ứng tuyển công việc nữa"}
                                                        />không muốn ứng tuyển công việc nữa
                                                    </div>
                                                    <div>
                                                        <input type="radio"
                                                            onChange={() => handleChange("Vì lý do cá nhân không muốn ứng tuyển nữa")}
                                                            value="Vì lý do cá nhân không muốn ứng tuyển nữa" checked={reasonWait === "Vì lý do cá nhân không muốn ứng tuyển nữa"}
                                                        />Vì lý do cá nhân không muốn ứng tuyển nữa
                                                    </div>
                                                    <div>
                                                        <input type="radio"
                                                            onChange={() => handleChange("Nghe feedback không tốt về cửa hàng/ người quản lý")}
                                                            value="Nghe feedback không tốt về cửa hàng/ người quản lý" checked={reasonWait === "Nghe feedback không tốt về cửa hàng/ người quản lý"}
                                                        />Nghe feedback không tốt về cửa hàng/ người quản lý
                                                    </div>
                                                    <div>
                                                        <input type="radio"
                                                            onChange={() => handleChange("Tìm được công việc có mức đãi ngộ tốt hơn")}
                                                            value="Tìm được công việc có mức đãi ngộ tốt hơn" checked={reasonWait === "Tìm được công việc có mức đãi ngộ tốt hơn"}
                                                        />Tìm được công việc có mức đãi ngộ tốt hơn
                                                    </div>
                                                    <div>
                                                        <input type="radio"
                                                            onChange={() => handleChange("Công việc không phù hợp với bản thân")}
                                                            value="Công việc không phù hợp với bản thân" checked={reasonWait === "Công việc không phù hợp với bản thân"}
                                                        />Công việc không phù hợp với bản thân
                                                    </div>
                                                    <div>
                                                        <input type="radio"
                                                            onChange={() => handleChange("Khác")}
                                                            value="Khác" checked={reasonWait === "Khác"}
                                                        />Khác
                                                    </div>
                                                </DialogContent>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <span>Lý do hủy công việc của bạn là gì?</span>
                                                </div>
                                                <DialogActions>
                                                    <Button onClick={handleCloseWait} color="primary">
                                                        Đóng
                                                    </Button>
                                                    <Button onClick={handleSubmitWait} color="primary">
                                                        Gửi
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>

                                        <div className='job-list-sumary'>
                                            <div className='job-list-sumary-item'><i class="fa-solid fa-hourglass-half"></i> {item.jobTime}</div>
                                            <div className='job-list-sumary-item'><i class="fa-solid fa-money-bill-wave"></i> {VND.format(item.salary)}/{item.typeSalary}</div>
                                            <div className='job-list-sumary-item'><i class="fa-regular fa-clock"></i> {moment(item.deadline).format('DD/MM/YYYY')}</div>
                                            <div className='job-list-sumary-item'><i class="fa-solid fa-location-dot"></i> {item.location}</div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                    {recordsJobWait && recordsJobWait.length > 0 &&
                        <nav style={{ textAlign: 'center' }}>
                            <ul className="pagination">
                                <li className="page-item">
                                    <a className="page-link" onClick={prePage}>Prev</a>
                                </li>
                                {
                                    numbersJobWait.map((n, i) => (
                                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                            <a className="page-link" onClick={() => changePage(n)}>{n}</a>
                                        </li>
                                    ))
                                }
                                <li className="page-item">
                                    <a className="page-link" onClick={nextPageJobWait}>Next</a>
                                </li>
                            </ul>
                        </nav>
                    }
                </div>

                <div className={toggleTab === 4 ? "job-cancel" : "job-cancel none-active-post-content"}>
                    <div className='job-manage-quantity'>
                        <div className='job-manage-quantity-item'>
                            Danh sách đang có <span>{listJobCancel.length || 0} công việc</span> bị từ chối
                        </div>
                    </div>

                    <div className='job-manage-list'>
                        {recordsJobCancel && recordsJobCancel.length > 0 &&
                            recordsJobCancel.map((item, index) => {
                                return (
                                    <div className="all-job-list-detail" style={{ height: '180px' }}>
                                        <div className='job-list-item'>
                                            <div className='job-list-item-left-manage'>
                                                <div className="job-list-logo">
                                                    <img id='company-logo' src={logo_job} alt="" />
                                                </div>
                                                <div className='job-list-item-left-content'>
                                                    <div className='job-list-name'><a href={`/job-detail?jobid=${item.id}`}>{item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}</a></div>
                                                    <div className='job-list-des'>
                                                        <div className='job-list-company'>{item.company}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='job-list-sumary'>
                                            <div className='job-list-sumary-item'><i class="fa-solid fa-hourglass-half"></i> {item.jobTime}</div>
                                            <div className='job-list-sumary-item'><i class="fa-solid fa-money-bill-wave"></i> {VND.format(item.salary)}/{item.typeSalary}</div>
                                            <div className='job-list-sumary-item'><i class="fa-regular fa-clock"></i> {moment(item.deadline).format('DD/MM/YYYY')}</div>
                                            <div className='job-list-sumary-item'><i class="fa-solid fa-location-dot"></i> {item.location}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {recordsJobCancel && recordsJobCancel.length > 0 &&
                        <nav style={{ textAlign: 'center' }}>
                            <ul className="pagination">
                                <li className="page-item">
                                    <a className="page-link" onClick={prePage}>Prev</a>
                                </li>
                                {
                                    numbersJobCancel.map((n, i) => (
                                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                            <a className="page-link" onClick={() => changePage(n)}>{n}</a>
                                        </li>
                                    ))
                                }
                                <li className="page-item">
                                    <a className="page-link" onClick={nextPageJobCancel}>Next</a>
                                </li>
                            </ul>
                        </nav>
                    }
                </div>
                <ToastContainer />
            </div>
            <Footer />
        </>
    )
}
