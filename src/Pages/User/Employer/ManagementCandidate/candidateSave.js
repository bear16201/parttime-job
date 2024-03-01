import HeaderEmployer from "../../Themes/Header/headerEmployer";
import SideBar from "../MangementPage/sidebar";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import logo_job from '../../../../Assets/logo-job.png'
import './candidateManage.scss'
import Rating from '@mui/material/Rating'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns';
import { SetinterviewCandidate, SelectOptionInterviewByEmp, GetListCandidateInterviewByEid } from '../../../../Service/interviewService';

function CandidateSave() {
    const [emid, setEmid] = useState(sessionStorage.getItem("employerId"));
    const [listJob, setListJob] = useState([]);
    const [select, setSelect] = useState([]);
    const [inter, setinter] = useState();
    const [load, setLoad] = useState();

    useEffect(() => {
        Select();
        getJob();
    }, [load])
    const Select = async () => {
        let res = await SelectOptionInterviewByEmp(emid);
        if (res) {
            setSelect(res);
        }
        console.log("SelectOptionInterviewByEmp", res);
    }
    const getJob = async () => {
        let res = await GetListCandidateInterviewByEid(emid, 4);
        if (res) {
            setListJob(res);
        }
        console.log("GetListCandidateInterviewByEid", res);
        console.log("Jobdetai", res);
        console.log("candiate", res);
    }
    const AddInterview = async (cid,jobid) => {
        await SetinterviewCandidate(cid, selectedValues[inter],jobid);
        setLoad(cid);
        console.log("selectedValues",selectedValues[inter]);
        toast.success("Tạo phỏng vấn thành công");
    }
    const [selectedValues, setSelectedValues] = useState(Array(select.length).fill(''));

  // Xử lý sự kiện khi giá trị của một Form.Select thay đổi
  const handleSelectChange = (event, index) => {
    // Tạo một bản sao của mảng state
    setinter(index);
    const newSelectedValues = [...selectedValues];
    // Cập nhật giá trị đã chọn cho Form.Select tại vị trí index
    newSelectedValues[index] = event.target.value;
    // Cập nhật state
    setSelectedValues(newSelectedValues);
  };
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
                            <Button href="/candidate-manage" id="post-btn" variant="primary">Chờ duyệt</Button>
                            <Button href="/candidate-recruited" id="post-btn" variant="primary">Đã tuyển</Button>
                            <Button href="/candidate-cancel" id="post-btn" variant="primary">Từ chối</Button>
                            <Button href="/candidate-save" id="post-btn" variant="primary">Hẹn phỏng vấn</Button>
                            <Button href="/candidate-reject" id="post-btn" variant="primary">Ứng viên hủy</Button>

                        </div>


                    </div>

                    <div className="candidate-manage-item">
                        {listJob && listJob.length > 0 &&
                            listJob.map((item, index) => {
                                return (
                                    (item && item.length > 0) ? (
                                        <div className="candidate-manage-item-job">
                                            <div className="candidate-manage-item-job-name">
                                                {item && item.length > 0 &&
                                                    item.slice(0, 1).map((item4, index3) => {
                                                        return (
                                                            <a>{item4.job.title}</a>
                                                        )
                                                    })}
                                            </div>
                                            {item && item.length > 0 &&
                                                item.map((item2, index2) => {
                                                    return (
                                                        <div className="candidate-manage-list-cv">
                                                            <div className="candidate-manage-item-job-cv">
                                                                <div className='job-list-item'>
                                                                    <div className='candidate-manage-item-left'>
                                                                        <div className="job-list-logo">
                                                                            <img id='company-logo' src={logo_job} alt="" />
                                                                        </div>
                                                                        <div className='job-list-item-left-content'>
                                                                            <div className='candidate-manage-item-job-cv-name'><a>{item2.applicant.account.fullName}</a></div>
                                                                            <div className='job-list-des'>
                                                                                <div className='job-list-company'>{item2.applicant.distric}-{item2.applicant.city}</div>
                                                                            </div>
                                                                            <div className='job-list-des'>
                                                                                <div className='job-list-company'>Ngày sinh:{format(new Date(item2.applicant.dob), 'dd-MM-yyyy')}</div>
                                                                            </div>
                                                                            <div className='job-list-des'>
                                                                                <div className='job-list-company'>Liên hệ: {item2.applicant.phone}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className='candidate-manage-item-right'>
                                                                        <div className='candidate-manage-item-right-content'>
                                                                            <div className="candidate-cancel-btn">
                                                                                <Form.Select 
                                                                                aria-label="Default select example" 
                                                                                id={`interview-select-${index}${index2}`}
                                                                                onChange={(e) => handleSelectChange(e, index+""+index2)}
                                                                                value={selectedValues[index+""+index2]}>
                                                                                    <option style={{ display: "none" }}>Chọn Lịch</option>
                                                                                    {select && select.length > 0 &&
                                                                                        select.map((item1, index1) => {
                                                                                            return (
                                                                                                <option value={item1.id}>Mã lịch : #{item1.id}</option>
                                                                                            )
                                                                                        })}
                                                                                </Form.Select>
                                                                                <td><Button style={{ fontSize: 13 }} variant="primary" onClick={() => AddInterview(item2.applicantId,item2.jobId)}>Tạo lịch phỏng vấn</Button></td>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    ) : (null)
                                )
                            })}
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default CandidateSave;