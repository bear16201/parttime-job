import Header from "../../Themes/Header/headerEmployer";
import SideBar from "../MangementPage/sidebar";
import Button from 'react-bootstrap/Button';
import logo_job from '../../../../Assets/logo-job.png'
import './post.scss';
import { useEffect, useState } from "react";
import { getJobByStatus2 } from '../../../../Service/employService';
import { format } from 'date-fns';
function PostRejected() {
    const [listJob2, setListJobStatus2] = useState([]);
    let [idemp, setidEmp] = useState(sessionStorage.getItem('employerId'));
    const [showPopup, setShowPopup] = useState(false);

    const handleButtonClick = () => {
        console.log("nhay vao day");    
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        getJobstatus();
        console.log("empid", idemp);
        setidEmp(idemp);
    }, []);

    const getJobstatus = async () => {
        console.log("idemp", idemp);
        let res = await getJobByStatus2(idemp);
        if (res) {
            setListJobStatus2(res);
        }
        console.log("check2", res);
    }

    return (
        <>
            <Header />
            {listJob2 && listJob2.length > 0 &&
                listJob2.map((item, index) => {
                    return (
                        <div className="employer-page">
                            <div className="employer-page-sidebar">
                                <SideBar />
                            </div>

                            <div className="employer-page-content">
                                <div className="post-btn-control">
                                    <div className="post-btn-control-item">
                                        <Button href="/post" id="post-btn" variant="primary">Tin đang hiển thị</Button>
                                        <Button href="/post-manage" id="post-btn" variant="primary">Tin đang chờ duyệt</Button>
                                        <Button href="/post-close" id="post-btn" variant="primary">Tin đã đóng</Button>
                                        <Button href="/post-rejected" id="post-btn" variant="primary">Tin bị từ chối</Button>
                                        <Button href="/post-wrap" id="post-btn" variant="primary">Tin nháp</Button>
                                    </div>
                                </div>

                                <div className="post-manage">
                                    <div className="post-manage-item">
                                        <div className='job-list-item'>
                                            <div className='post-manage-item-left'>
                                                <div className="job-list-logo">
                                                    <img id='company-logo' src={logo_job} alt="" />
                                                </div>
                                                <div className='job-list-item-left-content'>
                                                    <div className='post-manage-item-title'><a href="/edit-post">{item.title}</a></div>
                                                    <div className='job-list-des'>
                                                        <div className='job-list-company'>{item.company}</div>
                                                    </div>
                                                    <div className='job-list-des'>
                                                        <div className='job-list-company'>Mức lương: {item.salary} VND</div>
                                                    </div>
                                                    <div className="job-list-des">
                                                        <div className="job-list-company">Số lượng: {item.numberApply}</div>
                                                        <div>Hạn đăng tuyển :{format(new Date(item.deadline), 'dd/MM/yyyy')}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='post-manage-item-right'>
                                                <div className='post-manage-btn'>
                                                    <div><Button onClick={handleButtonClick} id="candidate-save-btn" variant="danger">Xem lý do</Button>
                                                        {showPopup && (
                                                            <div className="modal">
                                                                <div className="modal-content">
                                                                    <h3>Pop-up Content</h3>
                                                                    <p>This is the content of the pop-up.</p>
                                                                    <button onClick={handlePopupClose}>Close</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div><Button id="candidate-save-btn" href={`/edit-post?jobid=${item.id}`} variant="warning">Chỉnh sửa</Button></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                    )
                })
            }
        </>
    )
}

export default PostRejected;