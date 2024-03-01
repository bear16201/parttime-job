import React, { useState } from 'react'
import Footer from '../../Themes/Footer/footer'
import Header from '../../Themes/Header/header'
import './jobManage.scss';
import logo_job from '../../../../Assets/logo-job.png';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { GetJobByStatus,CanceApplyJob } from '../../../../Service/jobService';
import { Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
export default function StatusFindJob() {

  const [listJob, setListJob] = useState([]);
  const [apply, setApply] = useState();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getJobs();
  }, [apply])
  const getJobs = async () => {
    const candidateId = sessionStorage.getItem("candidateId");
    let res = await GetJobByStatus(0,candidateId);
    if (res) {
      setListJob(res);
    }
    console.log("check", res);
  }
  const [reason, setReason] = useState('');
  const [Cancel, setCancel] = useState({jobId:0,resonCancel:''});
  const handleChange = (event) => {
    setReason(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const CanceApply = (id) => {
    Cancel.jobId=id;
    console.log(Cancel);
    handleClickOpen();
  };
  

  const handleSubmit = async(id)=>{
    Cancel.resonCancel=reason;
    if(reason.length<=0){
      handleClose();
      return;
    }
    console.log(Cancel);
    await CanceApplyJob(Cancel);
    setApply(id);
    console.log("Hủy Ứng tuyển",id);
    toast.success("Bạn đã hủy Ứng tuyển thành công");
    handleClose();
  }
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
              <Button id='job-manage-btn' variant="success">
                <i className="fa-solid fa-laptop-file" id='job-manage-icon'></i>Công việc đã nhận
              </Button>
            </Link>
          </div>
          <div className='job-manage-button-item'>
            <Link to="/job-status">
              <Button id='job-manage-btn' variant="primary">
                <i className="fa-solid fa-briefcase active" id='job-manage-icon'></i>Công việc chờ duyệt
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
            Danh sách đang có <span>{listJob.length || 0} công việc</span> chờ duyệt
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

                    <div className='job-list-item-right'>
                      <Button onClick={() => CanceApply(item.jobAppId)} style={{
                        fontSize: '14px',     // Điều chỉnh kích thước chữ
                        padding: '10px 20px',   // Điều chỉnh kích thước nút
                        marginTop: '50px',
                        marginLeft: '50px'     // Điều chỉnh khoảng cách từ top
                      }} id='btn-apply' variant="success">Hủy ứng tuyển</Button>
                      
                    </div>
                    <Dialog open={open} onClose={handleClose} className="custom-dialog-content">
                        <img src="data:image/jpeg;base64,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"
                          alt="Logo" style={{ width: '100%' }} />
                        <DialogContent className="custom-dialog-content-container">
                          <textarea 
                          value={reason}
                          onChange={handleChange}
                          placeholder="Nhập lý do hủy công việc" style={{ width: '400px', height: '200px', opacity: '0.7', fontWeight: 'bold' }}></textarea>
                        </DialogContent>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span>Lý do hủy công việc của bạn là gì?</span>
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
