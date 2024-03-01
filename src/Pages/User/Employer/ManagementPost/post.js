import Header from "../../Themes/Header/header";
import SideBar from "../MangementPage/sidebar";
import Button from 'react-bootstrap/Button';
import logo_job from '../../../../Assets/logo-job.png'
import './post.scss';
import { useEffect, useState } from "react";
import { getAllJObByEid, closeJobDetail, getJobByStatus0, deleteJobDetail, getJobByStatus3, getJobByStatus2 } from '../../../../Service/employService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns';
import HeaderEmployer from "../../Themes/Header/headerEmployer";
import numeral from 'numeral';
import { getJobstatus4, getJobreson } from '../../../../Service/employService';
import PopupAdmin from '../../../Admin/components/popupManage';
import Form from 'react-bootstrap/Form';

// function formatCurrency(number) {
//     const formattedNumber = numeral(number).format('0,0.00');
//     return formattedNumber;
// }
function Post() {
    const [listJobView, setListJobView] = useState([]);
    const [listJobWait, setListJobStatusWait] = useState([]);
    const [listJobClose, setListJobStatusClose] = useState([]);
    const [listJobReject, setListJobStatusReject] = useState([]);
    const [listJobtinnhap, setListJobStatustinnhap] = useState([]);
    const [btnPopup, setBtnPopup] = useState(false)
    const [toggleTab, setToggleTab] = useState(1)
    const [popupData, setPopupData] = useState(null);
    const [load, setLoad] = useState();
    const [hasRun1, sethasRun1] = useState(true);
    const [hasRun2, sethasRun2] = useState(true);
    const [hasRun3, sethasRun3] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 3;
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const formatCurrency = (value) => {
        const VND = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        return VND.format(value);
    };
    const tokenE = localStorage.getItem("tokenE");
    console.log("TokenE",tokenE);
    let [idemp, setidEmp] = useState(sessionStorage.getItem('employerId'));
    const [formInputEmp, setFormInput] = useState({
        // "title": "job 4",
        reasonjob: ""
    });
    const handleEmployInput = (name, value) => {
        // Cập nhật giá trị vào đối tượng formInputEmp
        setFormInput((prevFormInputEmp) => ({
            ...prevFormInputEmp,
            [name]: value,
        }));
    };
    const navigate = useNavigate();
    var result;



    let showPopup = async (id) => {
        console.log("idla", id);
        let data = await getJobreson(id,tokenE);
        console.log("datanew", data);
        if (data[0]) {
            setFormInput({
                reasonjob: data[0].reasonjob
            });
            console.log("Dữ liệu mảng:", data[0]);
        }
        setPopupData(data);
        setBtnPopup(true);
    };
    
    //---------------------------------Post View---------------------------------//
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (hasRun1) {           
            if (searchParams.get('toast')) {
                toast.success("Đăng bài thành công");
                sethasRun1(false);
            }
        }
        if (hasRun2) {           
            if (searchParams.get('edit')) {
                toast.success("Sửa bài thành công");
                sethasRun2(false);
            }
        }
        if (hasRun3) {           
            if (searchParams.get('tinnhap')) {
                toast.success("Lưu tin nháp thành công");
                sethasRun3(false);
            } 
        }                    

        if (searchParams.get('to')) {
            setToggleTab(parseInt(searchParams.get('to'), 10));
        }
               
        getPostWait();
        getJobsView();
        getPostClose();
        getPostTinnhap();
        getPostReject();
        console.log("empid", idemp);
        setidEmp(idemp);
    }, [load])

    const getJobsView = async () => {
        console.log("idemp", idemp);
        let res = await getAllJObByEid(idemp,tokenE);
        result = res.length;
        console.log("result", result);
        if (res) {
            setListJobView(res);
        }
        console.log("setListJobView", res);
    }

    const recordsView = listJobView.slice(firstIndex, lastIndex);
    const npageView = Math.ceil(listJobView.length / recordPerPage);
    const numbersView = [...Array(npageView + 1).keys()].slice(1);

    const nextPageView = () => {
        if (currentPage != npageView) {
            setCurrentPage(currentPage + 1)
        }
    }
    // let countall=0;
    // // Duyệt qua từng phần tử của mảng recordsJobWaiting
    // for (let i = 0; i < recordsView.length; i++) {
    //     // Lấy số phần tử của mảng con trong mỗi phần tử của recordsJobWaiting
    //     let numberOfElementsInSubarray = recordsView[i].length;  
    //     countall+=numberOfElementsInSubarray;
    // }


    const HandleCloseJob = async (itemId, idemp) => {
        const closejob = await closeJobDetail(itemId, idemp,tokenE);
        if (closejob) {
            setLoad(itemId);
            toast.success("Tin da dc dong!");

        } else {
            navigate("/post")
        }
    }
    const handleDeleteClick = (id, eid) => {
        // Hiển thị cảnh báo và xác nhận từ người dùng
        const userConfirmed = window.confirm('Bạn có chắc muốn đóng bài này không?');

        // Nếu người dùng đồng ý, thực hiện xóa
        if (userConfirmed) {
            HandleCloseJob(id, eid);
        }
    };
    // delete jon status 0
    const handleDeleteClickJobDetail = (id) => {
        // Hiển thị cảnh báo và xác nhận từ người dùng
        const userConfirmed = window.confirm('Bạn có chắc muốn xóa bài viết này không?');

        // Nếu người dùng đồng ý, thực hiện xóa
        if (userConfirmed) {
            hadleDeleteJob(id);
        }
    };
    //---------------------------------Post Wait---------------------------------//

    const getPostWait = async () => {
        console.log("idemp", idemp);
        let res = await getJobByStatus0(idemp,tokenE);
        console.log("layres", res)
        sessionStorage.setItem("countjob0", res.length);
        if (res) {
            setListJobStatusWait(res);
        }
        console.log("getPostWait", res);
    }

    const recordsWait = listJobWait.slice(firstIndex, lastIndex);
    const npageWait = Math.ceil(listJobWait.length / recordPerPage);
    const numbersWait = [...Array(npageWait + 1).keys()].slice(1);

    const nextPageWait = () => {
        if (currentPage != npageWait) {
            setCurrentPage(currentPage + 1)
        }
    }
    // let countW=0;
    // // Duyệt qua từng phần tử của mảng recordsJobWaiting
    // for (let i = 0; i < recordsWait.length; i++) {
    //     // Lấy số phần tử của mảng con trong mỗi phần tử của recordsJobWaiting
    //     let numberOfElementsInSubarray = recordsWait[i].length;  
    //     countW+=numberOfElementsInSubarray;
    // }

    const hadleDeleteJob = async (idjob) => {
        console.log("nhay vao day");
        let res = await deleteJobDetail(idjob,tokenE);
        if (res) {
            setLoad(idjob);
            toast.success("Tin da dc xoa!");
        }
    }
    //---------------------------------Post Close---------------------------------//

    const getPostClose = async () => {
        console.log("idemp", idemp);
        let res = await getJobByStatus3(idemp,tokenE);
        if (res) {
            setListJobStatusClose(res);
        }
        console.log("getPostClose", res);
    }

    const recordsClose = listJobClose.slice(firstIndex, lastIndex);
    const npageClose = Math.ceil(listJobClose.length / recordPerPage);
    const numbersClose = [...Array(npageClose + 1).keys()].slice(1);

    const nextPageClose = () => {
        if (currentPage != npageClose) {
            setCurrentPage(currentPage + 1)
        }
    }
    // let countC=0;
    // // Duyệt qua từng phần tử của mảng recordsJobWaiting
    // for (let i = 0; i < recordsClose.length; i++) {
    //     // Lấy số phần tử của mảng con trong mỗi phần tử của recordsJobWaiting
    //     let numberOfElementsInSubarray = recordsClose[i].length;  
    //     countC+=numberOfElementsInSubarray;
    // }
    //---------------------------------Post Reject---------------------------------//


    const getPostTinnhap = async () => {
        console.log("idemp", idemp);
        let res = await getJobByStatus2(idemp,tokenE);
        if (res) {
            setListJobStatusReject(res);
        }
        console.log("getPostTinnhap", res);
    }

    const recordsReject = listJobReject.slice(firstIndex, lastIndex);
    const npageReject = Math.ceil(listJobReject.length / recordPerPage);
    const numbersReject = [...Array(npageReject + 1).keys()].slice(1);

    const nextPageReject = () => {
        if (currentPage != npageReject) {
            setCurrentPage(currentPage + 1)
        }
    }
    // let countR=0;
    // // Duyệt qua từng phần tử của mảng recordsJobWaiting
    // for (let i = 0; i < recordsReject.length; i++) {
    //     // Lấy số phần tử của mảng con trong mỗi phần tử của recordsJobWaiting
    //     let numberOfElementsInSubarray = recordsReject[i].length;  
    //     countR+=numberOfElementsInSubarray;
    // }
    //---------------------------------Post Wrap---------------------------------//
    const toggleTabHandle = (index) => {
        setToggleTab(index)
    }

    const getPostReject = async () => {
        console.log("idemp", idemp);
        let res = await getJobstatus4(idemp,tokenE);
        if (res) {
            setListJobStatustinnhap(res);
        }
        console.log("getPostReject", res);
    }

    const recordsWrap = listJobtinnhap.slice(firstIndex, lastIndex);
    const npageWrap = Math.ceil(listJobtinnhap.length / recordPerPage);
    const numbersWrap = [...Array(npageWrap + 1).keys()].slice(1);

    const nextPageWrap = () => {
        if (currentPage != npageWrap) {
            setCurrentPage(currentPage + 1)
        }
    }
    // let countSW=0;
    // // Duyệt qua từng phần tử của mảng recordsJobWaiting
    // for (let i = 0; i < recordsWrap.length; i++) {
    //     // Lấy số phần tử của mảng con trong mỗi phần tử của recordsJobWaiting
    //     let numberOfElementsInSubarray = recordsWrap[i].length;  
    //     countSW+=numberOfElementsInSubarray;
    // }

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
            <div className="employer-page">
                <div className="employer-page-sidebar">
                    <SideBar />
                </div>
                                                                                                       
                <div className="employer-page-content">
                    <div className="post-btn-control">
                        <div className="post-btn-control-item">
                            <div className={toggleTab === 1 ? "post-btn post-btn-active" : "post-btn"} onClick={() => toggleTabHandle(1)}>Tin đang hiển thị({listJobView.length})</div>
                            <div className={toggleTab === 2 ? "post-btn post-btn-active" : "post-btn"} onClick={() => toggleTabHandle(2)}>Tin đang chờ duyệt({listJobWait.length})</div>
                            <div className={toggleTab === 3 ? "post-btn post-btn-active" : "post-btn"} onClick={() => toggleTabHandle(3)}>Tin đã đóng({listJobClose.length})</div>
                            <div className={toggleTab === 4 ? "post-btn post-btn-active" : "post-btn"} onClick={() => toggleTabHandle(4)}>Tin bị từ chối({listJobReject.length})</div>
                            <div className={toggleTab === 5 ? "post-btn post-btn-active" : "post-btn"} onClick={() => toggleTabHandle(5)}>Tin nháp({listJobtinnhap.length})</div>

                            <Button href="post-manage" id="btn-history">Xem lịch sử đăng bài</Button>
                        </div>
                    </div>

                    <div className={toggleTab === 1 ? "post-view" : "post-view none-active-post-content"}>
                        <div style={{ minHeight: 520 }}>
                            {recordsView && recordsView.length > 0 &&
                                recordsView.map((item, index) => {
                                    return (
                                        <div className="post-manage">
                                            <div className="post-manage-item">
                                                <div className='job-list-item'>
                                                    <div className='post-manage-item-left'>
                                                        <div className="job-list-logo">
                                                            <img id='company-logo' src={logo_job} alt="" />
                                                        </div>
                                                        <div className='job-list-item-left-content'>
                                                            <div className='post-manage-item-title'><a style={{color: '#000'}} href={`/post-detail?jobid=${item.id}`}>{item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}</a></div>
                                                            <div className='job-list-des'>
                                                                <div className='job-list-company'>Mức lương:{formatCurrency(item.salary)} /{item.typeSalary}</div>
                                                            </div>
                                                            <div className="job-list-des">
                                                                <div className="job-list-company">Số lượng: {item.numberApply}</div>
                                                                <div>Hạn đăng tuyển : {format(new Date(item.deadline), 'dd/MM/yyyy')}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='post-manage-item-right'>
                                                        <div className='post-manage-btn'>
                                                            {/* <div><Button style={{ backgroundColor: 'green' }} id="candidate-save-btn" >Đã duyệt</Button></div> */}
                                                            <div><Button onClick={() => handleDeleteClick(item.id, item.employerId)} id="candidate-save-btn" variant="danger">Đóng bài</Button></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                        <div>
                            {recordsView && recordsView.length > 0 &&
                                <nav style={{ textAlign: 'center', marginLeft: 60 }}>
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" onClick={prePage}>Prev</a>
                                        </li>
                                        {
                                            numbersView.map((n, i) => (
                                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                                    <a className="page-link" onClick={() => changePage(n)}>{n}</a>
                                                </li>
                                            ))
                                        }
                                        <li className="page-item">
                                            <a className="page-link" onClick={nextPageView}>Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            }
                        </div>
                    </div>

                    <div className={toggleTab === 2 ? "post-wait-approve" : "post-wait-approve none-active-post-content"}>
                        <div style={{ minHeight: 520 }}>
                            {recordsWait && recordsWait.length > 0 &&
                                recordsWait.map((item, index) => {
                                    return (
                                        <div className="post-manage">
                                            <div className="post-manage-item">
                                                <div className='job-list-item'>
                                                    <div className='post-manage-item-left'>
                                                        <div className="job-list-logo">
                                                            <img id='company-logo' src={logo_job} alt="" />
                                                        </div>
                                                        <div className='job-list-item-left-content'>
                                                            <div className='post-manage-item-title'><a>{item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}</a></div>
                                                            <div className='job-list-des'>
                                                                <div className='job-list-company'>{item.company}</div>
                                                            </div>
                                                            <div className='job-list-des'>
                                                                <div className='job-list-company'>Mức lương: {formatCurrency(item.salary)} /{item.typeSalary}</div>
                                                            </div>
                                                            <div className="job-list-des">
                                                                <div className="job-list-company">Số lượng: {item.numberApply}</div>
                                                                <div>Hạn đăng tuyển :{format(new Date(item.deadline), 'dd/MM/yyyy')}</div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className='post-manage-item-right'>
                                                        <div className='post-manage-btn'>
                                                            <div><Button href={`/edit-post?jobid=${item.id}`} id="candidate-save-btn" variant="warning">Chỉnh sửa</Button></div>
                                                            <div><Button id="candidate-save-btn" onClick={() => handleDeleteClickJobDetail(item.id)} variant="danger">Xóa bài</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>

                        {recordsWait && recordsWait.length > 0 &&
                            <nav style={{ textAlign: 'center', marginLeft: 60 }}>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" onClick={prePage}>Prev</a>
                                    </li>
                                    {
                                        numbersWait.map((n, i) => (
                                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                                <a className="page-link" onClick={() => changePage(n)}>{n}</a>
                                            </li>
                                        ))
                                    }
                                    <li className="page-item">
                                        <a className="page-link" onClick={nextPageWait}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                        }
                    </div>

                    <div className={toggleTab === 3 ? "post-close" : "post-close none-active-post-content"}>
                        <div style={{ minHeight: 520 }}>
                            {recordsClose && recordsClose.length > 0 &&
                                recordsClose.map((item, index) => {
                                   
                                    return (
                                        <div className="post-manage">
                                            <div className="post-manage-item">
                                                <div className='job-list-item'>
                                                    <div className='post-manage-item-left'>
                                                        <div className="job-list-logo">
                                                            <img id='company-logo' src={logo_job} alt="" />
                                                        </div>
                                                        <div className='job-list-item-left-content'>
                                                            <div className='post-manage-item-title'><a>{item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}</a></div>
                                                            <div className='job-list-des'>
                                                                <div className='job-list-company'>{item.company}</div>
                                                            </div>
                                                            <div className='job-list-des'>
                                                                <div className='job-list-company'>Mức lương:{formatCurrency(item.salary)} /{item.typeSalary}</div>
                                                            </div>
                                                            <div className="job-list-des">
                                                                <div className="job-list-company">Số lượng: {item.numberApply}</div>
                                                                <div>Hạn đăng tuyển : {format(new Date(item.deadline), 'dd/MM/yyyy')}</div>
                                                            </div>
                                                          
                                                        </div>
                                                    </div>

                                                    <div className='post-manage-item-right'>
                                                        <div className='post-manage-btn'>
                                                                <div><Button href={`/view-post?jobid=${item.id}`} id="candidate-save-btn" variant="info">Xem bài</Button></div>
                                                             <div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })};
                        </div>
                        {recordsClose && recordsClose.length > 0 &&
                            <nav style={{ textAlign: 'center', marginLeft: 60 }}>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" onClick={prePage}>Prev</a>
                                    </li>
                                    {
                                        numbersClose.map((n, i) => (
                                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                                <a className="page-link" onClick={() => changePage(n)}>{n}</a>
                                            </li>
                                        ))
                                    }
                                    <li className="page-item">
                                        <a className="page-link" onClick={nextPageClose}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                        }
                    </div>

                    <div className={toggleTab === 4 ? "post-reject" : "post-reject none-active-post-content"}>
                        <div style={{ minHeight: 520 }}>
                            {recordsReject && recordsReject.length > 0 &&
                                recordsReject.map((item, index) => {
                                    return (
                                        <div className="post-manage">
                                            <div className="post-manage-item">
                                                <div className='job-list-item'>
                                                    <div className='post-manage-item-left'>
                                                        <div className="job-list-logo">
                                                            <img id='company-logo' src={logo_job} alt="" />
                                                        </div>
                                                        <div className='job-list-item-left-content'>
                                                            <div className='post-manage-item-title'><a>{item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}</a></div>
                                                            <div className='job-list-des'>
                                                                <div className='job-list-company'>{item.company}</div>
                                                            </div>
                                                            <div className='job-list-des'>
                                                                <div className='job-list-company'>Mức lương: {formatCurrency(item.salary)} /{item.typeSalary}</div>
                                                            </div>
                                                            <div className="job-list-des">
                                                                <div className="job-list-company">Số lượng: {item.numberApply}</div>
                                                                <div>Hạn đăng tuyển :{format(new Date(item.deadline), 'dd/MM/yyyy')}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='post-manage-item-right'>
                                                        <div className='post-manage-btn'>
                                                            <div><Button onClick={() => showPopup(item.id)} id="candidate-save-btn" variant="danger">Xem lý do</Button></div>
                                                            {/* <div><Button href={`/edit-post?jobid=${item.id}`} id="candidate-save-btn" variant="warning">Chỉnh sửa</Button></div> */}
                                                        </div>
                                                        <div>
                                                            <PopupAdmin trigger={btnPopup} setTrigger={setBtnPopup}>
                                                                <div className='admin-notify-top'>Phản hồi từ admin</div>
                                                                <div className='admin-notify-item'>
                                                                    <Form.Control
                                                                        className="my-class"
                                                                        name="reasonreject"
                                                                        type="text"
                                                                        id="contact-input"
                                                                        value={formInputEmp.reasonjob}
                                                                    />
                                                                </div>
                                                                {/* <Button onClick={() => setBtnPopup(false)} style={{ float: 'inline-end', marginLeft: '10px' }} variant="danger">Hủy bỏ</Button>
                                                            <Button style={{ float: 'inline-end' }} variant="success">Phản hồi</Button> */}
                                                            </PopupAdmin>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {recordsReject && recordsReject.length > 0 &&
                            <nav style={{ textAlign: 'center', marginLeft: 60 }}>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" onClick={prePage}>Prev</a>
                                    </li>
                                    {
                                        numbersReject.map((n, i) => (
                                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                                <a className="page-link" onClick={() => changePage(n)}>{n}</a>
                                            </li>
                                        ))
                                    }
                                    <li className="page-item">
                                        <a className="page-link" onClick={nextPageReject}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                        }
                    </div>

                    <div className={toggleTab === 5 ? "post-wrap" : "post-wrap none-active-post-content"}>
                        <div style={{ minHeight: 520 }}>
                            {recordsWrap && recordsWrap.length > 0 &&
                                recordsWrap.map((item, index) => {
                                    return (
                                        <div className="post-manage">
                                            <div className="post-manage-item">
                                                <div className='job-list-item'>
                                                    <div className='post-manage-item-left'>
                                                        <div className="job-list-logo">
                                                            <img id='company-logo' src={logo_job} alt="" />
                                                        </div>
                                                        <div className='job-list-item-left-content'>
                                                            <div className='post-manage-item-title'><a>{item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}</a></div>
                                                            <div className='job-list-des'>
                                                                <div className='job-list-company'>{item.company}</div>
                                                            </div>
                                                            <div className='job-list-des'>
                                                                <div className='job-list-company'>Mức lương: {formatCurrency(item.salary)} /{item.typeSalary}</div>
                                                            </div>
                                                            <div className="job-list-des">
                                                                <div className="job-list-company">Số lượng: {item.numberApply}</div>
                                                                <div>Hạn đăng tuyển :{format(new Date(item.deadline), 'dd/MM/yyyy')}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='post-manage-item-right'>
                                                        <div className='post-manage-btn'>
                                                            <div><Button href={`/tinnhap-post?jobid=${item.id}`} id="candidate-save-btn" variant="warning">Chỉnh sửa</Button></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {recordsWrap && recordsWrap.length > 0 &&
                            <nav style={{ textAlign: 'center', marginLeft: 60 }}>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" onClick={prePage}>Prev</a>
                                    </li>
                                    {
                                        numbersWrap.map((n, i) => (
                                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                                <a className="page-link" onClick={() => changePage(n)}>{n}</a>
                                            </li>
                                        ))
                                    }
                                    <li className="page-item">
                                        <a className="page-link" onClick={nextPageWrap}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                        }
                    </div>
                </div>
            </div >
            <ToastContainer />
        </>
    )
}

export default Post;