import React, { useState } from 'react'
import Footer from '../../Themes/Footer/footer'
import Header from '../../Themes/Header/header'
import './jobManage.scss';
import logo_job from '../../../../Assets/logo-job.png';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { GetJobCare, DeleteJobCare, ApplyjobCance } from '../../../../Service/jobService';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
export default function JobFavorite() {

  const [listJob, setListJob] = useState([]);
  const [dele, setdele] = useState();
  const [dele1, setdele1] = useState();
  const [emid, setEid] = useState(sessionStorage.getItem("employerId"));
  useEffect(() => {
    getJobs();
  }, [dele, dele1])

  const getJobs = async () => {
    const candidateId = sessionStorage.getItem("candidateId");
    console.log("candidateId", candidateId);
    let res = await GetJobCare(candidateId);
    if (res) {
      setListJob(res);
    }
    console.log("check", res);
  }

  const Delete = async (yourParameter) => {
    await DeleteJobCare(yourParameter);
    setdele(yourParameter);
    toast.success("Bạn đã xóa công việc ra khỏi danh sách công việc quan tâm");
  }

  const Apply = async (jobId) => {
    console.log(jobId)
    let res = await ApplyjobCance(jobId);
    console.log(res)
    setdele1(jobId);
    toast.success("Bạn đã ứng tuyển công việc thành công");
  }
  const handleDeleteClick = (id) => {
    // Hiển thị cảnh báo và xác nhận từ người dùng
    const userConfirmed = window.confirm('Bạn có chắc muốn bỏ quan tâm không?');

    // Nếu người dùng đồng ý, thực hiện xóa
    if (userConfirmed) {
      Delete(id);
    }
  };
  return (
    <>
      <Header />
      <div className='container'>
        <div className='job-manage-button'>
          <div className='job-manage-button-item'>
            <Link to="/job-favorite">
              <Button id='job-manage-btn' variant="primary">
                <i className="fa-regular fa-heart active" id='job-manage-icon'></i>Công việc quan tâm
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
              <Button id='job-manage-btn' variant="success">
                <i className="fa-solid fa-ban" id='job-manage-icon'></i>Công việc bị từ chối
              </Button>
            </Link>
          </div>
        </div>

        <div className='job-manage-quantity'>
          <div className='job-manage-quantity-item'>
            Danh sách đang có <span>{listJob.length || 0} công việc</span> quan tâm
          </div>
          <a className='home-job-best-top-item' href='/job?listjob=ViecLamTotNhat' style={{ display: listJob.length > 6 ? 'block' : 'none', marginLeft: 1100 }}>Xem tất cả<i id='home-job-best-top-item-icon' class="fa-solid fa-arrow-right"></i></a>
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
                      <Button onClick={() => handleDeleteClick(item.jobAppId)} style={{
                        fontSize: '14px',     // Điều chỉnh kích thước chữ
                        padding: '5px 10px',     // Điều chỉnh kích thước nút
                        marginTop: '50px',
                        marginLeft: '80px',
                        width: '100px'    // Điều chỉnh khoảng cách từ top
                      }} id='btn-apply' variant="success">Bỏ quan tâm</Button>
                    </div>
                    {(item.employerId == emid) ? (
                      <div className='job-list-item-right'>
                        <Button disabled style={{
                          fontSize: '14px',     // Điều chỉnh kích thước chữ
                          padding: '5px 10px',   // Điều chỉnh kích thước nút
                          marginTop: '50px',
                          marginLeft: '-300px',
                          width: '130px'    // Điều chỉnh khoảng cách từ top
                        }} id='btn-apply' variant="success">Của bạn</Button>
                      </div>
                    ) : (
                      <div className='job-list-item-right'>
                        <Button onClick={() => Apply(item.jobAppId)} style={{
                          fontSize: '14px',     // Điều chỉnh kích thước chữ
                          padding: '5px 10px',   // Điều chỉnh kích thước nút
                          marginTop: '50px',
                          marginLeft: '-300px',
                          width: '130px'    // Điều chỉnh khoảng cách từ top
                        }} id='btn-apply' variant="success">Ứng tuyển ngay</Button>
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
