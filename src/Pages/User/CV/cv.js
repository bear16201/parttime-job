import Footer from '../Themes/Footer/footer'
import Header from '../Themes/Header/header'
import './cv.scss'
import '../Job/job.scss'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import logo_job from '../../../Assets/logo-job.png'
import Multiselect from 'multiselect-react-dropdown';
import { useEffect, useState } from 'react';
import { getCanById, getImformationcan } from '../../../Service/jobService';
import { GetJobByStatus } from '../../../Service/jobService';
import { GetFeedbackForCandidate } from '../../../Service/feedbackService';
import Rating from '@mui/material/Rating';
import { format } from 'date-fns';
export default function CV() {

  const [formInput, setFormInput] = useState({
    fullname: '', phone: '', gender: '', email: '', dob: '', city: '', distric: '', expectAddress: '', addressDetail: '', image: ''
  });
  const [listJobHistory, setListJobHistory] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [date, setdate] = useState();
  let canId = sessionStorage.getItem("candidateId");

  useEffect(() => {
    GetProfle(canId);
    getJobsHistory();
    getFeedback();
  }, []);
  const getJobsHistory = async () => {
    let res = await GetJobByStatus(2, canId);
    if (res) {
      setListJobHistory(res);
    }
    console.log("getJobsHistory", res);
  }
  const getFeedback = async () => {
    let job = await GetFeedbackForCandidate(canId);
    setFeedback(job);
    console.log("GetFeedbackForCandidate", job);
  }
  // useEffect(() => {
  //   console.log("setdate:", format(new Date(formInput.dob), 'yyyy-MM-dd'));
  //   setdate(format(new Date(formInput.dob), 'yyyy-MM-dd'));
  // }, [formInput.dob]); 
  const GetProfle = async (aid) => {
    let res1 = await getImformationcan(aid);
    if (res1) {
      console.log("Dữ getImformationcan :", res1[0]);
      let res = await getCanById(res1[0].accountId);
      console.log("Dữ liệu proflie:", res);
      if (res) {
        setFormInput({
          accountid: aid,
          fullname: res[0].fullname,
          phone: res[0].phone,
          gender: res[0].gender,
          email: res[0].email,
          dob: res[0].dob,
          city: res[0].city,
          distric: res[0].distric,
          expectAddress: res[0].expectAddress,
          addressDetail: res[0].addressDetail,
          image: res[0].image,
        });
      }
    }

  }
  return (
    <>
      <Header />
      <div className='container-all'>
        <div className='container'>
          <div className='CV-page'>
            <div className='CV-page-top'>
              <div className='CV-page-top-1'>
                <div className='CV-page-top-1-title'>Hồ sơ cá nhân</div>
              </div>
              <div className='CV-page-top-2'>
                <div className="CV-uploadavatar">
                  <img className="CV-uploadavatar-user" src={formInput.image} alt="Selected" />
                  {/* <div className="CV-uploadavatar-user" src={formInput.image}/> */}
                </div>
                <div className='CV-name'>{sessionStorage.getItem('fullname')}</div>
              </div>
            </div>

            <div className='CV-page-care'>
              <div className='CV-page-care-top'>
                <div className='CV-page-care-title'>Thông tin cơ bản</div>
              </div>

              <div className='CV-page-expirent'>
                <div className='CV-page-expirent-list'>
                  <div className='post-manage-item-left'>
                    <div className='job-list-item-left-content'>

                      <div className='cv-list-des'>
                        <div className='job-list-company'><span>Họ và tên:</span>
                          <Form.Control
                            id='cv-info'
                            type="text"
                            value={formInput.fullname}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className='cv-list-des'>
                        <div className='job-list-company'><span>Ngày tháng năm sinh:</span>
                          <Form.Control
                            id='cv-info'
                            type="date"
                            value={formInput.dob !== '' ? format(new Date(formInput.dob), 'yyyy-MM-dd') : null}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className='cv-list-des'>
                        <div className='job-list-company'>
                          <span>Giới tính:</span>
                          {/* <Form.Select aria-label="Default select example"
                            id="cv-info-select"
                            value={formInput.gender}
                          >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                          </Form.Select> */}
                          <Form.Control
                            id='cv-info'
                            type="text"
                            value={formInput.gender}
                            readOnly
                            placeholder='Giới tính'
                          />
                        </div>
                      </div>
                      <div className='cv-list-des'>
                        <div className='job-list-company'><span>Địa chỉ:</span>
                          <Form.Control
                            id='cv-info'
                            type="text"
                            value={formInput.addressDetail + "-" + formInput.distric + "-" + formInput.city}
                            readOnly
                            placeholder='Địa chỉ'
                          />
                        </div>
                      </div>
                      <div className='cv-list-des'>
                        <div className='job-list-company'><span>Số điện thoại:</span>
                          <Form.Control
                            id='cv-info'
                            type="text"
                            value={formInput.phone}
                            readOnly
                            placeholder='Số điện thoại'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='CV-page-care'>
              <div className='CV-page-care-top'>
                <div className='CV-page-care-title'>Lịch sử làm việc</div>
              </div>
              <div className='CV-page-expirent'>
                {listJobHistory && listJobHistory.length > 0 &&
                  listJobHistory.map((item, index) => {
                    return (
                      <div className='CV-page-expirent-list'>
                        <div className='post-manage-item-left'>
                          <div className="job-list-logo">
                            <img id='company-logo' src={logo_job} alt="" />
                          </div>
                          <div className='job-list-item-left-content'>
                            <div className='job-list-des'>
                              <div className='job-list-company'><span>Công việc đã làm: </span>{item.title}</div>
                            </div>
                            <div className='job-list-des'>
                              <div className='job-list-company'><span>Thời gian: </span>01/10/2022</div>
                            </div>
                            <div className='job-list-des'>
                              <div className='job-list-company'><span>Công ty/Của hàng: </span>{item.company} - {item.location}</div>
                            </div>
                          </div>
                        </div>
                        {item.comment.length > 0 ? (
                          <div>
                            <div className='CV-page-expirent'>
                              <div className='CV-page-expirent-list'>
                                <div className='job-detail-comment' style={{ marginTop: 0 }}>
                                  <div className='box-view-cmt'>
                                    <div className='job-detail-comment-new'>
                                      <div className='job-detail-comment-avt'>
                                        <img src='https://c.animaapp.com/3RPBHCw2/img/user-png@2x.png' />
                                      </div>
                                      <div className='user-comment'>
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                          <Rating value={item.comment[item.comment.length - 1].start} readOnly />
                                        </div>
                                        <div className='user-comment-time'>{item.comment[item.comment.length - 1].time}</div>
                                      </div>
                                    </div>
                                    <div className='view-cmt'>
                                      {item.comment[item.comment.length - 1].content}
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (null)}

                      </div>
                    )
                  })}
              </div>
            </div>

            {/* <div className='CV-page-care'>
              <div className='CV-page-care-top'>
                <div className='CV-page-care-title'>Đánh giá về bạn <i class="fa-solid fa-circle-check" style={{ color: 'green' }}></i></div>
              </div>

              <div className='CV-page-expirent'>
                <div className='CV-page-expirent-list'>
                  <div className='job-detail-comment' style={{ marginTop: 0 }}>
                    {feedback && feedback.length > 0 && feedback.map((item, index) => {
                      return (
                        <div className='box-view-cmt'>
                          <div className='job-detail-comment-new'>
                            <div className='job-detail-comment-avt'>
                              <img src='https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg' />
                            </div>
                            <div className='user-comment'>
                              <div className='user-comment-name'>{item.account.fullName}</div>
                              <div className='user-comment-time'>{item.time}</div>
                            </div>
                          </div>
                          <div className='view-cmt'>
                            {item.content}
                            <Rating value={item.start} />
                          </div>

                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div> */}

          </div>
        </div>
        {/* <div>
          <img id='home-sp' src='https://previews.123rf.com/images/robuart/robuart1605/robuart160500292/57494709-support-banner-concept-design-flat-style-poster-or-a-banner-of-support-and-technical-advising-for.jpg' />
        </div> */}
      </div>
      <Footer />
    </>
  )
}
