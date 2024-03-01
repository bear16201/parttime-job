import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Slider from "react-slick";
import Select from 'react-select';
import './style.scss'
import moment from 'moment';
import logo_job from '../../../Assets/logo-job.png'
import { useEffect } from 'react';
import { GetAllEmployer, GetAllJob } from '../../../Service/userService';
import { NhaTuyendungNoiBat, GetJobFromJobDetailByTypeId, ViecLamSieuCap, ViecLamMoiNhat, ViecLamSinhVien, ViecLamGanBanNhat, ViecLamTotNhat } from '../../../Service/jobDetailService';
import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Footer from '../Themes/Footer/footer';
import Header from '../Themes/Header/header';
import banner_1 from '../../../Assets/banner-1.png'
import banner_2 from '../../../Assets/banner-2.png'
import banner_3 from '../../../Assets/banner-3.png'
import { CareJob, GetJobCare, countcvtd, countWeb, getWeb, countnhatd } from '../../../Service/jobService';
import { GetAllCate, GetAllJobType } from '../../../Service/searchService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import { getCity } from '../../../Service/candidateService';
import { csCZ } from '@mui/x-data-grid';

const HomePage = (props) => {

  const [listJob, setListJob] = useState([]);
  const [listcate, setlistcate] = useState([]);
  const [listjobType, setListjobType] = useState([]);
  const [viecLamSieuCap, setViecLamSieuCap] = useState([]);
  const [viecLamMoiNhat, setViecLamMoiNhat] = useState([]);
  const [viecLamSinhVien, setViecLamSinhVien] = useState([]);
  const [viecLamGanBanNhat, setViecLamGanBanNhat] = useState([]);
  const [viecLamTotNhat, setViecLamTotNhat] = useState([]);
  const [listJobCare, setListJobCare] = useState([]);
  const [listNhaTuyenDung, setListNhaTuyenDung] = useState([]);
  // const [appyJob, setApplyJob] = useState([]);
  const [city, setCity] = useState([]);
  const [listEmployer, setListEmployer] = useState([]);
  const [title, setTitle] = useState('');
  const [title1, setTitle1] = useState('');
  const [location, setLocation] = useState('');
  const [jobName, setJobName] = useState('');
  const [time, setTime] = useState('');
  const [cid, setCid] = useState('');
  const navigate = useNavigate();
  const [care, setcare] = useState(false);
  const [applyRequest, setApplyRequest] = useState({ applicantId: '', jobId: '' });
  const [countntd, setnhatuendung] = useState("");
  const [countcvdt, setcongvdt] = useState("");
  const [count, setCount] = useState(0);
  const token = sessionStorage.getItem("token");
  // const [dataJobDetail, setDataJobDetail] = useState({});
  const [accessCount, setAccessCount] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  const settings_1 = {
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear"
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCity(1);
        console.log("City", res);
        setCity(res);
        let counntd = await countnhatd();
        //console.log("counntd",counntd);
        let cvtd = await countcvtd();
        // console.log("cvtd",cvtd);
        setnhatuendung(counntd);
        setcongvdt(cvtd);
      } catch (error) {
        console.error("Error fetching city:", error);
      }

    };

    const fetchInitialData = async () => {
      await fetchData();
      getJobs();
      getCate();
      getJobtype();
      getEmployer();
      getNhaTuyenDung();
    };

    fetchInitialData();

  }, [/* Không có phụ thuộc ở đây */]);

  useEffect(() => {
    if (sessionStorage.getItem("candidateId")) {
      setCid(sessionStorage.getItem("candidateId"));
      getJobsCare();
    }
  }, [care]);

  useEffect(() => {
    // // Tăng lượt truy cập lên 1 và lưu vào localStorage
    // const newCount = count + 1;
    // localStorage.setItem('visitCount', newCount.toString());
    // // Kiểm tra xem lượt truy cập đã được lưu trữ trong localStorage chưa
    // const visitCount = localStorage.getItem('visitCount');
    // if (visitCount) {
    //   setCount(parseInt(visitCount));
    // } else {
    //   // Nếu không có lượt truy cập trước đó, đặt giá trị mặc định là 0
    //   localStorage.setItem('visitCount', '0');
    // }
    fetchAccessCount();
    // console.log("accessCount", accessCount);
  }, []);
  const fetchAccessCount = async () => {

    try {
      await countWeb();
      const response1 = await getWeb();
      console.log("datatest", response1);
      setAccessCount(response1.count);
    } catch (error) {
      console.error('Lỗi khi lấy số lượt truy cập:', error);
    }
  };
  const getCate = async () => {
    let res = await GetAllCate();
    setlistcate(res);
  }
  const getJobtype = async () => {
    let res = await GetAllJobType();
    setListjobType(res);
  }
  const getNhaTuyenDung = async () => {
    let res = await NhaTuyendungNoiBat();
    console.log("nhatuyendung", res);
    setListNhaTuyenDung(res);
  }

  const getJobsCare = async () => {
    const candidateId = sessionStorage.getItem("candidateId");
    let res = await GetJobCare(candidateId);
    if (res && JSON.stringify(res) !== JSON.stringify(listJobCare)) {
      setListJobCare(res);
    }
    console.log("getJobsCare", listJobCare);
  }

  const getEmployer = async () => {
    let res = await GetAllEmployer();
    if (res) {
      setListEmployer(res);
    }
    console.log("check1", res);
  }
  const getJobs = async () => {
    const candidateId = sessionStorage.getItem("candidateId");
    // let res = await GetJobFromJobDetailByTypeId(candidateId,1);
    let res1 = await ViecLamSieuCap();
    let res2 = await ViecLamMoiNhat();
    let res3 = await ViecLamSinhVien();
    let res4 = await ViecLamGanBanNhat(candidateId);
    let res5 = await ViecLamTotNhat();
    if (res1 && res2 && res3 && res4 && res5) {
      setViecLamGanBanNhat(res4);
      setViecLamMoiNhat(res2);
      setViecLamSieuCap(res1);
      setViecLamSinhVien(res3);
      setViecLamTotNhat(res5);
    }
    console.log("List job1", res1);
    console.log("List job2", res2);
    console.log("List job3", res3);
    console.log("List job4", res4);
    console.log("List job5", res5);
  }


  const SaveJobHandler = async (jid) => {
    if (sessionStorage.getItem("idOfEmp") != null && sessionStorage.getItem("idOfCandidate")==null) {
      toast.error("Bạn hãy đăng xuất tài khoản nhà tuyển dụng");
      return;
    }
    const candidateId = sessionStorage.getItem("candidateId");
    if (candidateId === null) {
      window.location.href = "/login";
      return;
    }
    applyRequest.applicantId = candidateId;
    applyRequest.jobId = jid;
    console.log("setApplyRequest:", applyRequest);
    await CareJob(applyRequest, token);
    setcare(jid);
    toast.success("Bạn đã lưu công việc vào mục quan tâm");
  }

  const [selectedOption, setSelectedOption] = useState(null);

  const options = listjobType.map(item => ({ value: item.id, label: item.nameType }));

  const handleInputChange = (newValue) => {
    setTitle1(newValue);
    console.log("newValue1:", title1);
  };

  const handleSelectChange = (selectedOption) => {
    setTitle(selectedOption.label);
    setSelectedOption(selectedOption);
    console.log("newValue2:", title);
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '450px',
      marginTop: '0px',
      margin: '0px 20px 0px 0px' // Đặt chiều dài mong muốn của Select
    }),
  };

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }
  );
  return (
    <div className='container-all'>
      <Header />
      <div className="container-1" style={{ backgroundColor: '#fff', marginBottom: -65 }}>
        <div style={{ display: 'block', width: '100%', margin: "auto", padding: 0, zindex: 1, marginTop: '85px' }} className='slide'>
          <Carousel>
            <Carousel.Item interval={2500}>
              <img
                className="d-block w-100"
                src={banner_1}
                alt="Image One"
              />
              {/* <Carousel.Caption>
                <h3>Label for first slide</h3>
                <p>Sample Text for Image One</p>
              </Carousel.Caption> */}
            </Carousel.Item>

            <Carousel.Item interval={2500}>
              <img
                className="d-block w-100"
                src={banner_2}
                alt="Image Two"
              />
              {/* <Carousel.Caption>
                <h3>Label for second slide</h3>
                <p>Sample Text for Image Two</p>
              </Carousel.Caption> */}
            </Carousel.Item>

            <Carousel.Item interval={2500}>
              <img
                className="d-block w-100"
                src={banner_3}
                alt="Image Three"
              />
              {/* <Carousel.Caption>
                <h3>Label for second slide</h3>
                <p>Sample Text for Image Three</p>
              </Carousel.Caption> */}
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      <div className="home-div-homepage">
        <div className="home-form">
          <div className="home-dspan-ant-select">
            {/* <Form.Control
            id='home-pseudo'
            type="text"
            placeholder='Việc làm, công ty muốn tìm'
            value={title}
            onChange={event => setTitle(event.target.value)}
          /> */}
            <Form>
              <Select
                placeholder='Việc làm, công ty muốn tìm'
                options={options}
                onInputChange={handleInputChange}
                onChange={handleSelectChange}
                value={selectedOption}
                styles={customStyles}
              />
            </Form>
          </div>
          <div className="home-div-ant-row-wrapper" style={{ marginLeft: '-10px' }}>
            <div className="home-div-ant-row">
              <div className="home-div-wrapper">
                <div className="home-div-ant-form-item">
                  <div className="home-div">
                    <div className="home-div-ant-select-2">
                      <Form.Select aria-label="Default select example" id="home-div-ant-select-3"
                        name="city"
                        value={jobName}
                        onChange={event => setJobName(event.target.value)}
                        required
                      >
                        <option id='home-tiltle' style={{ display: "none", color: "#444" }}>Các ngành nghề</option>
                        {listcate && listcate.length > 0 &&
                          listcate.map((item1, index1) => {
                            return (
                              <option value={item1.name}>
                                {item1.name}
                              </option>
                            )
                          })}
                      </Form.Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-div-ant-col-2">
            <div className="home-div-ant-row">
              <div className="home-div-ant-col-3">
                <div className="home-div-ant-form-item">
                  <div className="home-div-ant-form-item-2">
                    <div className="home-div-ant-select-2">
                      <Form.Select aria-label="Default select example" id="home-div-ant-select-3"
                        name="city"
                        value={location}
                        onChange={event => setLocation(event.target.value)}
                        required
                      >
                        <option id='home-tiltle' style={{ display: "none", color: "#444" }}>Địa điểm</option>
                        {city && city.length > 0 &&
                          city.map((item1, index1) => {
                            return (
                              <option value={item1.name}>
                                {item1.name}
                              </option>
                            )
                          })}
                      </Form.Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-div-ant-col-2" style={{ marginLeft: '10px' }}>
            <div className="home-div-ant-row">
              <div className="home-div-ant-col-3">
                <div className="home-div-ant-form-item">
                  <div className="home-div-ant-form-item-2">
                    <div className="home-div-ant-select-2">
                      <Form.Select aria-label="Default select example" id="home-div-ant-select-3"
                        name="time"
                        value={time}
                        onChange={event => setTime(event.target.value)}
                        required
                      >
                        <option id='home-tiltle' style={{ display: "none", color: "#444" }}>Thời gian </option>
                        <option value="sáng">Sáng</option>
                        <option value="chiều">Chiều</option>
                        <option value="tối">Tối</option>
                      </Form.Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-div-banner-search-wrapper">
            <div className="home-div-banner-search">
              <button className="home-button">
                <div className="home-text-wrapper-3"><a href={`/job?title=${(title1.length > 0) ? title1 : title}&location=${location}&jobName=${jobName}&time=${time}`}>Tìm kiếm</a></div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundImage: 'url("https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQcc2j7n5qgIyGdb4DPyzyTVz06z4uRi1veUdKSYdIMEKW0r9KHlqJDmon8aIqGu2cvTYNQzLIuQRPoBBAG6wQ"', zIndex: '2' }}>
        <div className="container" style={{ marginTop: -20 }}>
          <div className='home-employer'>Nhà tuyển dụng hàng đầu</div>
        </div>

        <div className="container" style={{ maxWidth: 1460, marginTop: 0 }}>
          <div className="card-slide">

            <Slider {...settings}>
              {listNhaTuyenDung && listNhaTuyenDung.length > 0 &&
                listNhaTuyenDung.map((item, index) => {
                  return (
                    <div className="card">
                      <a href={`/job?eid=${item.id}`}>
                        <img style={{ width: '100%', height: '110px' }} src={item.image} alt="" />
                      </a>
                    </div>
                  )
                })}

              {listNhaTuyenDung && listNhaTuyenDung.length > 0 &&
                listNhaTuyenDung.map((item, index) => {
                  return (
                    <div className="card">
                      <a href={`/job?eid=${item.id}`}>
                        <img style={{ width: '100%', height: '110px' }} src={item.image} alt="" />
                      </a>
                    </div>
                  )
                })}
            </Slider>
          </div>
        </div>
      </div>


      <div className="container">
        <div className='home-job-best'>
          <div className='home-job-best-top'>
            <h1 className="job-topic">Việc làm tốt nhất</h1>
            <a className='home-job-best-top-item' href='/job?listjob=ViecLamTotNhat' style={{ display: viecLamTotNhat.length > 9 ? 'block' : 'none' }}>Xem tất cả<i id='home-job-best-top-item-icon' class="fa-solid fa-arrow-right"></i></a>
          </div>

          <div className="job-list">
            {viecLamTotNhat && viecLamTotNhat.length > 0 &&
              viecLamTotNhat.slice(0, 9).map((item, index) => {
                let count = 0;
                return (
                  <div className="job-list-detail">
                    <div className='job-list-item'>
                      <div className='job-list-item-left'>
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
                        <div className='job-list-item-right-content'>
                          {listJobCare && listJobCare.length > 0 &&
                            listJobCare.map((item1, index1) => {
                              if (item1.id === item.id) {
                                count = 1;
                                return (
                                  <i onClick={() => SaveJobHandler(item.id)} id="btn-list-save-job" class="fas fa-heart text-success icon"></i>
                                )
                              } else if (index1 === listJobCare.length - 1 && count === 0) {
                                return (
                                  <i onClick={() => SaveJobHandler(item.id)} id='btn-list-save-job' class="fa-regular fa-heart icon"></i>
                                )
                              }
                            })
                          }
                          {listJobCare.length === 0 ? (
                            <i onClick={() => SaveJobHandler(item.id)} id='btn-list-save-job' class="fa-regular fa-heart icon"></i>
                          ) : (null)}
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
          <ToastContainer />
        </div>

        <div className='home-job-best'>
          <div className='home-job-best-top'>
            <h1 className="job-topic">Việc làm mới nhất</h1>
            <a className='home-job-best-top-item' href='/job?listjob=ViecLamMoiNhat' style={{ display: viecLamMoiNhat.length > 9 ? 'block' : 'none' }}>Xem tất cả<i id='home-job-best-top-item-icon' class="fa-solid fa-arrow-right"></i></a>
          </div>

          <div className="job-list">
            {viecLamMoiNhat && viecLamMoiNhat.length > 0 &&
              viecLamMoiNhat.slice(0, 9).map((item, index) => {
                let count = 0;
                return (
                  <div className="job-list-detail">
                    <div className='job-list-item'>
                      <div className='job-list-item-left'>
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
                        <div className='job-list-item-right-content'>
                          {listJobCare && listJobCare.length > 0 &&
                            listJobCare.map((item1, index1) => {
                              if (item1.id === item.id) {
                                count = 1;
                                return (
                                  <i onClick={() => SaveJobHandler(item.id)} id="btn-list-save-job" class="fas fa-heart text-success icon"></i>
                                )
                              } else if (index1 === listJobCare.length - 1 && count === 0) {
                                return (
                                  <i onClick={() => SaveJobHandler(item.id)} id='btn-list-save-job' class="fa-regular fa-heart icon"></i>
                                )
                              }
                            })
                          }
                          {listJobCare.length === 0 ? (
                            <i onClick={() => SaveJobHandler(item.id)} id='btn-list-save-job' class="fa-regular fa-heart icon"></i>
                          ) : (null)}
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
          <ToastContainer />
        </div>

        <div className='home-job-best'>
          <div className='home-job-best-top'>
            <h1 className="job-topic">Việc làm phù hợp sinh viên</h1>
            <a className='home-job-best-top-item' href='/job?listjob=ViecLamSinhVien' style={{ display: viecLamSinhVien.length > 9 ? 'block' : 'none' }}>Xem tất cả<i id='home-job-best-top-item-icon' class="fa-solid fa-arrow-right"></i></a>
          </div>
          <div className="job-list">
            {viecLamSinhVien && viecLamSinhVien.length > 0 &&
              viecLamSinhVien.slice(0, 9).map((item, index) => {
                let count = 0;
                return (
                  <div className="job-list-detail">
                    <div className='job-list-item'>
                      <div className='job-list-item-left'>
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
                        <div className='job-list-item-right-content'>
                          {listJobCare && listJobCare.length > 0 &&
                            listJobCare.map((item1, index1) => {
                              if (item1.id === item.id) {
                                count = 1;
                                return (
                                  <i onClick={() => SaveJobHandler(item.id)} id="btn-list-save-job" class="fas fa-heart text-success icon"></i>
                                )
                              } else if (index1 === listJobCare.length - 1 && count === 0) {
                                return (
                                  <i onClick={() => SaveJobHandler(item.id)} id='btn-list-save-job' class="fa-regular fa-heart icon"></i>
                                )
                              }
                            })
                          }
                          {listJobCare.length === 0 ? (
                            <i onClick={() => SaveJobHandler(item.id)} id='btn-list-save-job' class="fa-regular fa-heart icon"></i>
                          ) : (null)}
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
          <ToastContainer />
        </div>

        <div className='home-job-best' style={{ display: cid ? 'block' : 'none' }}>
          <div className='home-job-best-top'>
            <h1 className="job-topic">Việc làm xung quanh bạn</h1>
            <a className='home-job-best-top-item' href='/job?listjob=ViecLamGanBanNhat' style={{ display: viecLamGanBanNhat.length > 9 ? 'block' : 'none' }}>Xem tất cả<i id='home-job-best-top-item-icon' class="fa-solid fa-arrow-right"></i></a>
          </div>
          <div className="job-list">
            {viecLamGanBanNhat && viecLamGanBanNhat.length > 0 &&
              viecLamGanBanNhat.slice(0, 9).map((item, index) => {
                let count = 0;
                return (
                  <div className="job-list-detail">
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
                        <div className='job-list-item-right-content'>
                          {listJobCare && listJobCare.length > 0 &&
                            listJobCare.map((item1, index1) => {
                              if (item1.id === item.id) {
                                count = 1;
                                return (
                                  <i onClick={() => SaveJobHandler(item.id)} id="btn-list-save-job" class="fas fa-heart text-success icon"></i>
                                )
                              } else if (index1 === listJobCare.length - 1 && count === 0) {
                                return (
                                  <i onClick={() => SaveJobHandler(item.id)} id='btn-list-save-job' class="fa-regular fa-heart icon"></i>
                                )
                              }
                            })
                          }
                          {listJobCare.length === 0 ? (
                            <i onClick={() => SaveJobHandler(item.id)} id='btn-list-save-job' class="fa-regular fa-heart icon"></i>
                          ) : (null)}
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
          <ToastContainer />
        </div>

        <div className='home-job-best'>
          <div className='home-job-best-top'>
            <h1 className="job-topic">Việc làm siêu tốc</h1>
            <a className='home-job-best-top-item' href='/job?listjob=ViecLamSieuCap' style={{ display: viecLamSieuCap.length > 9 ? 'block' : 'none' }}>Xem tất cả<i id='home-job-best-top-item-icon' class="fa-solid fa-arrow-right"></i></a>
          </div>
          <div className="job-list">
            {viecLamSieuCap && viecLamSieuCap.length > 0 &&
              viecLamSieuCap.slice(0, 9).map((item, index) => {
                let count = 0;
                return (
                  <div className="job-list-detail">
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
                        <div className='job-list-item-right-content'>
                          {listJobCare && listJobCare.length > 0 &&
                            listJobCare.map((item1, index1) => {
                              if (item1.id === item.id) {
                                count = 1;
                                return (
                                  <i onClick={() => SaveJobHandler(item.id)} id="btn-list-save-job" class="fas fa-heart text-success icon"></i>
                                )
                              } else if (index1 === listJobCare.length - 1 && count === 0) {
                                return (
                                  <i onClick={() => SaveJobHandler(item.id)} id='btn-list-save-job' class="fa-regular fa-heart icon"></i>
                                )
                              }
                            })
                          }
                          {listJobCare.length === 0 ? (
                            <i onClick={() => SaveJobHandler(item.id)} id='btn-list-save-job' class="fa-regular fa-heart icon"></i>
                          ) : (null)}
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
          <ToastContainer />
        </div>
      </div>

      {/* <div style={{ backgroundColor: '#fff', marginBottom: '-10px' }}>
        <div className="container">
          <div className='home-employer'>Ngành nghề nổi bật</div>
        </div>

        <div className='container' style={{ paddingBottom: '50px' }}>
          <Slider {...settings_1}>
            <div className="">
              <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
            </div>

            <div className="">
              <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
            </div>

            <div className="">
              <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
            </div>

            <div className="">
              <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
            </div>

            <div className="">
              <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
            </div>

            <div className="">
              <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
            </div>

            <div className="">
              <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
            </div>

            <div className="">
              <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
            </div>

            <div className="">
              <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
            </div>

            <div className="">
              <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
            </div>

            <div className="">
              <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
            </div>

            <div className="">
              <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
            </div>

            <div className="">
              <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
            </div>

            <div className="">
              <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
            </div>

            <div className="">
              <img style={{ width: '90%', height: '110px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD81UotvDX0da3eRj8Kz0J7N3MZaHbR7mBQTFO4JnsihMreIzIXkbi_NYWUfdGT0L0UKM&usqp=CAU" alt="" />
            </div>
          </Slider>
        </div>
      </div> */}

      <div className='container' style={{ marginBottom: '50px', marginTop: '-30px' }}>
        <div className='home-employer'>Nền tảng kết nối ưu việt</div>
        <div className='foundation'>
          <div className='foundation-left'>
            <div className='foundation-content'>
              <i class="fa-solid fa-people-group"></i>
              <div>{countntd}+</div>
              <div className='foundation-content-item'>Nhà tuyển dụng hàng đầu</div>
            </div>
          </div>

          <div className='foundation-mid'>
            <div className='foundation-content'>
              <i class="fa-solid fa-file-invoice-dollar"></i>
              <div>{accessCount}+</div>
              <div className='foundation-content-item'>Lượt tương tác</div>
            </div>

          </div>

          <div className='foundation-right'>
            <div className='foundation-content'>
              <i class="fa-solid fa-briefcase"></i>
              <div>{countcvdt}+</div>
              <div className='foundation-content-item'>Công việc đang tuyển</div>
            </div>

          </div>
        </div>
      </div>

      {/* <div>
        <img id='home-sp' src='https://previews.123rf.com/images/robuart/robuart1605/robuart160500292/57494709-support-banner-concept-design-flat-style-poster-or-a-banner-of-support-and-technical-advising-for.jpg' />
      </div> */}

      <Footer />
    </div>
  )
}

export default HomePage;