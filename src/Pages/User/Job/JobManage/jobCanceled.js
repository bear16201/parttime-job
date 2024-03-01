import React, { useState } from 'react'
import Footer from '../../Themes/Footer/footer'
import Header from '../../Themes/Header/header'
import './jobManage.scss';
import logo_job from '../../../../Assets/logo-job.png';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { ApplyjobCance, GetJobByStatus } from '../../../../Service/jobService';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
export default function JobCancel() {

  const [listJob, setListJob] = useState([]);
  const [apply, setApply] = useState();
  useEffect(() => {
    getJobs();
  }, [apply])
  const getJobs = async () => {
    const candidateId = sessionStorage.getItem("candidateId");
    let res = await GetJobByStatus(3, candidateId);
    if (res) {
      setListJob(res);
    }
    console.log("check", res);
  }

  const Apply = async (jobId) => {
    const userConfirmed = window.confirm('Bạn có chắc muốn ứng tuyển lại không?');

    // Nếu người dùng đồng ý, thực hiện xóa
    if (userConfirmed) {
      await ApplyjobCance(jobId);
      toast.success("Bạn đã ứng tuyển lại công việc vừa rồi thành công");
      setApply(jobId);
    }

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
              <Button id='job-manage-btn' variant="success">
                <i className="fa-solid fa-briefcase" id='job-manage-icon'></i>Công việc chờ duyệt
              </Button>
            </Link>
          </div>
          <div className='job-manage-button-item'>
            <Link to="/job-cancel" className="job-manage-button-item">
              <Button id='job-manage-btn' variant="primary">
                <i className="fa-solid fa-ban active" id='job-manage-icon'></i>Công việc bị từ chối
              </Button>
            </Link>
          </div>
        </div>

        <div className='job-manage-quantity'>
          <div className='job-manage-quantity-item'>
            Danh sách đang có <span>{listJob.length || 0} công việc</span> bị từ chối
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
                      <Button onClick={() => Apply(item.jobAppId)} style={{
                        fontSize: '14px',     // Điều chỉnh kích thước chữ
                        padding: '10px 20px',   // Điều chỉnh kích thước nút
                        marginTop: '50px',
                        marginLeft: '50px'     // Điều chỉnh khoảng cách từ top
                      }} id='btn-apply' variant="success">Ứng tuyển lại</Button>

                    </div>
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
