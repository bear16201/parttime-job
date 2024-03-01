import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './job.scss'
import moment from 'moment';
// import {useParams} from 'react-router';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import logo_job from '../../../Assets/logo-job.png'
import { useState } from 'react';
import { GetAllEmployer, GetJobById } from '../../../Service/userService';
import { GetFeedbackForEmployer } from '../../../Service/feedbackService';
import { GetJobByTypeId, CareJob, ApplyJob, getJobApplication, CanceApplyJob, ApplyjobCance, GetJobCare } from '../../../Service/jobService';
import { useEffect } from 'react';
import Header from '../Themes/Header/headerGuest';
import Footer from '../Themes/Footer/footer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Rating from '@mui/material/Rating';
import { format } from 'date-fns';
function JobDetail(props) {

  const navigate = useNavigate();
  const [jobDetail, setJobDetail] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [jobid, setjobid] = useState("");
  const [jobApplicationId, setjobApplicationId] = useState();
  const [apply, setApply] = useState(true);
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
  const [NameShop, setNameShop] = useState('');
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
    console.log("setApplyRequest1:", applyRequest);
    SetStatus(applyRequest.applicantId,applyRequest.jobId);
  }, [applyRequest]);

  const SetStatus = async (candidateID,jobID) => {
    let res = await getJobApplication(candidateID, jobID);
    console.log("getJobApplication:", res);
    setjobApplicationId(res.id);
    if (res) {
      if (res.status === 0) {
        console.log(res.status);
        setApply(false);
      } else if (res.status === 1) {
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
        setNameShop(res[0].company);
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
    const userConfirmed = window.confirm('Bạn có chắc muốn ứng tuyển không?');
    // Nếu người dùng đồng ý, thực hiện xóa
    if (userConfirmed) {
      if (accountid != null) {
        if (!apply) {
          handleClickOpen();
        } else {
          console.log("ApplyJobRequest:", applyRequest);
          let app = await ApplyJob(applyRequest, token);
          console.log(app);
          if (app.message === "CV") {
            setMess("Bạn cần điền đầy đủ thông tin cơ bản trước khi ứng tuyển");
            handleClickOpen1();
          } else if (app.message === "MaxApply") {
            setMess("Vì đánh giá sao của bạn thấp nên bạn bị giới hạn số lần ứng tuyển");
            handleClickOpen2();
          } else if (app.message === "CanApply") {
            setMess("Không thể ứng tuyển vì công việc đã được nhận hoặc đã bị từ chối");
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


  }

  const SaveJobHandler = async () => {
    if (sessionStorage.getItem("idOfEmp") != null && sessionStorage.getItem("idOfCandidate") == null) {
      toast.error("Bạn hãy đăng xuất tài khoản nhà tuyển dụng");
      return;
    }
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
    if (sessionStorage.getItem("idOfEmp") != null && sessionStorage.getItem("idOfCandidate") == null) {
      toast.error("Bạn hãy đăng xuất tài khoản nhà tuyển dụng");
      return;
    }
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
      <Header />

      <div className='container-all-1'>
        <div className='container'>
          <div className='job-detail'>
            <div className='job-detail-left'>
              {jobDetail && jobDetail.length > 0 && jobDetail.map((item, index) => {
                return (
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
                    <div className='job-detail-left-top-due'><i class="fa-regular fa-clock"></i>  Hạn nộp: {moment(item.deadline).format('DD/MM/yyyy')}</div>
                    <div id='btn-job-detail'>
                      {(item.employerId == emid) ? (
                        <Button disabled id='btn-apply' variant="success">Của bạn</Button>
                      ) : (
                        apply ? (
                          <Button onClick={ApplyHandler} id='btn-apply' variant="success">Ứng tuyển ngay</Button>
                        ) : (
                          <Button onClick={ApplyHandler} id='btn-apply' variant="success">Hủy ứng tuyển</Button>
                        )
                      )}
                      <Dialog open={open1} onClose={handleClose} className="custom-dialog-content">
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
                      <Dialog open={open2} onClose={handleClose} className="custom-dialog-content">
                        <div style={{ display: 'flex', alignItems: 'center', margin: 50, fontSize: 20 }}>
                          <span>{Mess}</span>
                        </div>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Đóng
                          </Button>
                        </DialogActions>
                      </Dialog>
                      {/* ------------------------------------------------------------------ */}
                      <Dialog open={open} onClose={handleClose} className="custom-dialog-content">
                        <img src="data:image/jpeg;base64,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"
                          alt="Logo" style={{ width: '100%' }} />
                        <DialogContent className="custom-dialog-content-container">
                          <div>
                            <input type="radio"
                              onChange={() => handleChange("không muốn ứng tuyển công việc nữa")}
                              value="không muốn ứng tuyển công việc nữa" checked={reason === "không muốn ứng tuyển công việc nữa"}
                            />không muốn ứng tuyển công việc nữa
                          </div>
                          <div>
                            <input type="radio"
                              onChange={() => handleChange("Vì lý do cá nhân không muốn ứng tuyển nữa")}
                              value="Vì lý do cá nhân không muốn ứng tuyển nữa" checked={reason === "Vì lý do cá nhân không muốn ứng tuyển nữa"}
                            />Vì lý do cá nhân không muốn ứng tuyển nữa
                          </div>
                          <div>
                            <input type="radio"
                              onChange={() => handleChange("Nghe feedback không tốt về cửa hàng/ người quản lý")}
                              value="Nghe feedback không tốt về cửa hàng/ người quản lý" checked={reason === "Nghe feedback không tốt về cửa hàng/ người quản lý"}
                            />Nghe feedback không tốt về cửa hàng/ người quản lý
                          </div>
                          <div>
                            <input type="radio"
                              onChange={() => handleChange("Tìm được công việc có mức đãi ngộ tốt hơn")}
                              value="Tìm được công việc có mức đãi ngộ tốt hơn" checked={reason === "Tìm được công việc có mức đãi ngộ tốt hơn"}
                            />Tìm được công việc có mức đãi ngộ tốt hơn
                          </div>
                          <div>
                            <input type="radio"
                              onChange={() => handleChange("Công việc không phù hợp với bản thân")}
                              value="Công việc không phù hợp với bản thân" checked={reason === "Công việc không phù hợp với bản thân"}
                            />Công việc không phù hợp với bản thân
                          </div>
                          <div>
                            <input type="radio"
                              onChange={() => handleChange("Khác")}
                              value="Khác" checked={reason === "Khác"}
                            />Khác
                          </div>

                          {/* <textarea
                            value={reason}
                            onChange={handleChange}
                            placeholder="Nhập lý do hủy công việc" style={{ width: '400px', height: '200px', opacity: '0.7', fontWeight: 'bold' }}></textarea> */}
                        </DialogContent>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 25 }}>
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
                      <Button onClick={SaveJobHandler} id='btn-save' variant="outline-primary">Lưu công việc</Button>

                    </div>
                  </div>
                )
              })
              }

              <div className='content'>
                {jobDetail && jobDetail.length > 0 && jobDetail.map((item, index) => {
                  return (
                    <div>
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
                          <div className='content-title'>Ngày bắt đầu đi làm: <div className='content-title-item'> {format(new Date(item.startdate), 'dd-MM-yyyy')}</div></div>
                          <div className='content-title'>Ngày kết thúc: <div className='content-title-item'> {format(new Date(item.startdate), 'dd-MM-yyyy')}</div></div>
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
                          {/* <li>Kỹ năng giao tiếp:  Kỹ năng giao tiếp cơ bản bằng tiếng địa phương hoặc tiếng Anh có thể được yêu cầu, tùy theo vị trí làm việc.</li>
                          <li>Khả năng làm việc trong môi trường nhanh chóng.</li>
                          <li>Kiên nhẫn và thái độ tích cực.</li>
                          <li>Kỹ năng tổ chức: Quản lý đơn đặt hàng, đồ uống và thực đơn đòi hỏi khả năng tổ chức tốt.</li> */}
                        </ul>
                      </div>

                      <div className='content-title'>Ghi chú:</div>
                      <div className='content-detail-job'>
                        <ul>
                          <li>{item.note}.</li>
                          {/* <li>Có mức thu nhập hấp dẫn.</li> */}
                        </ul>
                      </div>

                      <div className='content-title'>Quyền lợi</div>
                      <div className='content-detail-job'>
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

              <div className='content'>

                <div className='related-job'>
                  <div className='content-detail'>
                    <div className='content-detail-common'>Việc làm liên quan</div>
                  </div>
                  {jobList && jobList.length > 0 &&
                    jobList.slice(0, 3).map((item, index) => {
                      return (
                        <div className="job-relate">
                          <div className='job-list-item'>
                            <div className='job-relate-left'>
                              <div className="job-list-logo">
                                <img id='company-logo' src={logo_job} alt="" />
                              </div>
                              <div className='job-list-item-left-content'>
                                <div className='job-list-name-relate'><a href={`/job-detail?jobid=${item.jobid}`}>{item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}</a></div>

                                <div className='job-list-des'>
                                  <div className='job-list-company'>{item.company}</div>
                                </div>
                              </div>
                            </div>

                            <div className='job-relate-right'>
                              <div className='job-list-item-right-content'>
                                <div className='btn-relate'>
                                  <Button id='btn-save-relate' onClick={() => SaveJobHandler1(item.jobid)} variant="outline-primary">Lưu công việc</Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='job-list-sumary'>
                            <div className='job-list-sumary-item'><i class="fa-solid fa-hourglass-half"></i> {item.jobTime}</div>
                            <div className='job-list-sumary-item'><i class="fa-solid fa-money-bill-wave"></i> {VND.format(item.salary)}/{item.typesalary}</div>
                            <div className='job-list-sumary-item'><i class="fa-regular fa-clock"></i> {moment(item.deadline).format('DD/MM/YYYY')}</div>
                            <div className='job-list-sumary-item'><i class="fa-solid fa-location-dot"></i> {item.location}</div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
            <ToastContainer />
            {jobDetail && jobDetail.length > 0 && jobDetail.map((item, index) => {
              return (
                <div className='job-detail-right'>
                  <div className='job-company-detail'>
                    <div className='job-company-box'>
                      <div className='job-company-logo'>
                        <div><img id='company-logo' src={item.employer.image} alt="" /></div>
                      </div>
                      {/* <div className='job-company-name'>{item.employer.company}</div> */}
                      <div className='job-company-name'>{NameShop}</div>
                    </div>
                    {/* <div className='job-company-address'>
                      <div className='job-company-title'><i class="fa-solid fa-cake-candles"></i> Ngày sinh:</div>
                      <div className='job-company-address-detail'>{format(new Date(item.employer.dob), 'dd-MM-yyyy')}</div>
                    </div>
                    <div className='job-company-address'>
                      <div className='job-company-title'><i class="fa-solid fa-phone"></i> Số điện thoại:</div>
                      <div className='job-company-address-detail'>{item.employer.phone}</div>
                    </div> */}
                    <div className='job-company-address'>
                      <div className='job-company-title'><i class="fa-solid fa-envelope"></i> Email:</div>
                      <div className='job-company-address-detail'>{item.employer.account.email}</div>
                    </div>
                    {/* <div className='job-company-address'>
                      <div className='job-company-title'><i class="fa-solid fa-location-dot"></i> Địa điểm:</div>
                      <div className='job-company-address-detail'>{item.employer.addressdetail}-{item.employer.distric}-{item.employer.city}</div>
                    </div> */}
                  </div>
                  <div className='infomation-common'>
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


                  <div className='feedback-emp'>
                    <div className='cmt-jd'>Đánh giá nhà tuyển dụng</div>
                    <div className='job-detail-comment'>
                      {feedback && feedback.length > 0 && feedback.map((item, index) => {
                        return (
                          <div className='box-view-cmt'>
                            <div className='job-detail-comment-new'>
                              <div className='job-detail-comment-avt'>
                                <img src='https://c.animaapp.com/3RPBHCw2/img/user-png@2x.png' />
                              </div>
                              <div className='user-comment'>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                  <div className='user-comment-name'>{item.fullName} </div>
                                  <Rating id='vote-employ' value={item.start} readOnly />
                                </div>
                                <div className='user-comment-time'>{item.time}</div>
                              </div>
                            </div>
                            <div className='view-cmt'>
                              <div>
                                {item.content}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default (JobDetail);
