import React, { useState } from 'react'
import Footer from '../../Themes/Footer/footer'
import Header from '../../Themes/Header/header'
import './jobManage.scss';
import logo_job from '../../../../Assets/logo-job.png';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { GetJobByStatus } from '../../../../Service/jobService';
import { SentFeedback } from '../../../../Service/feedbackService';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Rating from '@mui/material/Rating';
export default function HistoryOfJob() {

  const [listJob, setListJob] = useState([]);
  const [apply, setApply] = useState();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [Jobid, setJobid] = useState();
  const [feedback, setFeedback] = useState({ content: '', from: '', to: '', status: 0, star: '' })
  useEffect(() => {
    getJobs();
  }, [apply,rating])
  const getJobs = async () => {
    const candidateId = sessionStorage.getItem("candidateId");
    let res = await GetJobByStatus(2, candidateId);
    if (res) {
      setListJob(res);
    }
    console.log("check", res);
  }

  const handleClickOpen = (jobid) => {
    setJobid(jobid);
    setOpen(true);
  };

  const handleClose = () => {
    setReason("");
    setRating(0);
    setOpen(false);
  };

  const handleSubmit = async (id) => {
    const accoutnId = sessionStorage.getItem("candidateId");
    feedback.content = reason;
    feedback.from = accoutnId;
    feedback.to = id;
    feedback.star = rating;
    console.log(feedback);
    setApply(id);  
    await SentFeedback(feedback);
    toast.success("Bạn đã đánh giá công việc ");
    // Điều gì xảy ra khi bạn nhấn "Gửi" ở đây
    handleClose(); // Đóng popup sau khi gửi
  }
  const [reason, setReason] = useState('');

  const handleChange = (event) => {
    setReason(event.target.value);
  };
  return (
    <>
      <Header />
      <div className='container'>
        <div className='job-manage-button'>
          <div className='job-manage-button-item'>
            <Link to="/job-favorite">
              <Button id='job-manage-btn' variant="success">
                <i className="fa-regular fa-heart" id='job-manage-icon'></i>Công việc quan tâm
              </Button>
            </Link>
          </div>
          <div className='job-manage-button-item'>
            <Link to="/job-history">
              <Button id='job-manage-btn' variant="primary">
                <i className="fa-solid fa-laptop-file active" id='job-manage-icon'></i>Công việc đã nhận
              </Button>
            </Link>
          </div>
          <div className='job-manage-button-item'>
            <Link to="/job-status">
              <Button id='job-manage-btn' variant="success">
                <i className="fa-solid fa-briefcase" id='job-manage-icon'></i>Công việc chờ duyệt
              </Button>
            </Link>
          </div>
          <div className='job-manage-button-item'>
            <Link to="/job-cancel" className="job-manage-button-item">
              <Button id='job-manage-btn' variant="success">
                <i className="fa-solid fa-ban" id='job-manage-icon'></i>Công việc bị từ chối
              </Button>
            </Link>
          </div>
        </div>

        <div className='job-manage-quantity'>
          <div className='job-manage-quantity-item'>
            Danh sách đang có <span>{listJob.length || 0} công việc</span> đã làm
          </div>
        </div>
        <div className='job-manage-list'>
          {listJob && listJob.length > 0 &&
            listJob.map((item, index) => {
              return (
                <div className="all-job-list-detail">
                  <div className='job-list-item'>
                    <div className='job-list-item-left'>
                      <div className="job-list-logo">
                        <img id='company-logo' src={logo_job} alt="" />
                      </div>
                      <div className='job-list-item-left-content'>
                        <div className='job-list-name'><a href={`/job-detail?jobid=${item.id}`}>{item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}</a></div>
                        <div className='job-list-des'>
                          <div className='job-list-company'>VinGroup</div>
                        </div>
                      </div>
                    </div>
                    {item.isComment == 1 ? (
                      <div className='job-list-item-right'>
                        <Button disabled style={{
                          fontSize: '14px',     // Điều chỉnh kích thước chữ
                          padding: '10px 20px',   // Điều chỉnh kích thước nút
                          marginTop: '50px',
                          marginLeft: '80px'     // Điều chỉnh khoảng cách từ top
                        }} id='btn-apply' variant="success">Feedback</Button>                       
                      </div>
                    ) : (
                      <div className='job-list-item-right'>
                        <Button onClick={() => handleClickOpen(item.id)} style={{
                          fontSize: '14px',     // Điều chỉnh kích thước chữ
                          padding: '10px 20px',   // Điều chỉnh kích thước nút
                          marginTop: '50px',
                          marginLeft: '80px'     // Điều chỉnh khoảng cách từ top
                        }} id='btn-apply' variant="success">Feedback</Button>
                        <Dialog open={open} onClose={handleClose} className="custom-dialog-content">
                          <img src="data:image/png;base64,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"
                            alt="Logo" style={{ width: '100%' }} />
                          <DialogContent className="custom-dialog-content-container">
                            <textarea
                              value={reason}
                              onChange={handleChange}
                              placeholder="Nhập nội dung feedback" style={{ width: '400px', height: '200px', opacity: '0.7', fontWeight: 'bold' }}></textarea>
                          </DialogContent>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span>Đánh giá sao:</span>
                            <Rating
                              value={rating}
                              onChange={(event, newValue) => {
                                setRating(newValue);
                              }}
                            />
                          </div>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Đóng
                            </Button>
                            <Button onClick={handleSubmit} color="primary">
                              Gửi
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    )}

                    <ToastContainer />
                  </div>

                  <div className='job-list-sumary'>
                    <div className='job-list-sumary-item'>Thời gian làm việc: {item.jobTime}</div>
                    <div className='job-list-sumary-item'>{item.location}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <Footer />
    </>
  )
}
