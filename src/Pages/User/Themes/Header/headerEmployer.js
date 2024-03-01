import NavDropdown from 'react-bootstrap/NavDropdown';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import React from "react";
import "./header.scss";
import { GetNotiForEmployer, GetNotiById } from '../../../../Service/notificationService';
import { useEffect, useState } from 'react';
import logo_icon from '../../../../Assets/logo-header.png'
import Popup from '../../CV/popupJob';
import { format } from 'date-fns';
import logo_job from '../../../../Assets/logo-job.png'
function HeaderEmployer() {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const [UserName, setUserName] = useState("");
  const [IdUser, setIdUser] = useState("");
  const [notify, setNotify] = useState(false);
  const [btnPopup, setBtnPopup] = useState(false)
  const [Listnoti, setListnoti] = useState([]);
  const [notification, setNotification] = useState({ title: '', content: '', date: '' })
  const [countNoti, setCountNoti] = useState(0);
  const [viewNoti, setviewNoti] = useState()
  const tokenE = localStorage.getItem("tokenE");
  console.log("localStorage.getItem", tokenE);
  const handleLogout = () => {
    localStorage.removeItem("tokenE");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("imageE");
    sessionStorage.removeItem("tokenE");
    sessionStorage.removeItem('fullname');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('isCandidate');
    sessionStorage.removeItem('isEmployer');
    sessionStorage.removeItem('employerId');
    sessionStorage.removeItem('candidateId');
    sessionStorage.removeItem('fullnameEmp');
    sessionStorage.removeItem('idOfCandidate');
    sessionStorage.removeItem('idOfEmp');
    window.location.href = '/';
    // toast.success("Đăng xuất thành công !")
  }
  useEffect(() => {
    console.log("HuyTRan", sessionStorage.getItem('imageE'));
    setSelectedImage(sessionStorage.getItem('imageE'));
    const navigateIfNotLoggedIn = () => {
      if (!sessionStorage.getItem("employerId")) {
        navigate("/");
      }
    };

    // Kiểm tra và chuyển hướng khi component được render lần đầu
    navigateIfNotLoggedIn();

    // Nếu emid thay đổi trong quá trình render, kiểm tra và chuyển hướng lại
    return () => {
      navigateIfNotLoggedIn();
    };
  }, [navigate]);

  const fetchData = async () => {
    const token = sessionStorage.getItem('employerId');
    let name = sessionStorage.getItem('fullnameEmp');
    let id = sessionStorage.getItem('id');
    const isC = sessionStorage.getItem('isCandidate');
    const isE = sessionStorage.getItem('isEmployer');
    console.log("sessionStorage.getItem('isEmployer')", sessionStorage.getItem('isEmployer'));
    const currentUrl = window.location.href;
    console.log(currentUrl);
    if (isC === "true") {
      console.log(sessionStorage.getItem('isCandidate'));
      setIsCandidate(true);
    }
    if (isE === "true") {
      console.log(sessionStorage.getItem('isEmployer'));
      setIsEmployer(true);
    }
    if (token) {
      setUserName(name);
      setIdUser(id);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }
  const GetNotiCandidate = async () => {
    const token = sessionStorage.getItem('idOfEmp');
    console.log("idOfEmp", token);
    if (token) {
      let res = await GetNotiForEmployer(token, tokenE)
      console.log("GetNotiForCandidate", res);
      setListnoti(res);
    }
  }

  useEffect(() => {
    // Tính toán countNoti dựa trên Listnoti
    let tempCountNoti = 0;
    for (let index = 0; index < Listnoti.length; index++) {
      const item = Listnoti[index];
      if (item.isNew === 1) {
        tempCountNoti += 1;
      }
    }

    // Cập nhật giá trị state countNoti
    setCountNoti(tempCountNoti);
  }, [Listnoti]);

  useEffect(() => {
    fetchData();
    GetNotiCandidate();
  }, [viewNoti]);

  const loginTextElement = document.getElementById('loginText');

  if (loginTextElement) {
    if (sessionStorage.getItem('employerId')) {
      loginTextElement.style.display = 'none';
    } else {
      loginTextElement.style.display = 'block';
    }
  }
  const GetNoti = async (id) => {
    let noti = await GetNotiById(id, tokenE);
    console.log("GetNotiById", noti);
    notification.content = noti.content;
    notification.title = noti.title;
    notification.date = noti.createdAt;
    setviewNoti(id);
    setBtnPopup(true);
  }
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div className='contanier-header'>
      <div className="div-header">
        <div className="div-headeree-header" style={{ backgroundImage: 'url("https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQcc2j7n5qgIyGdb4DPyzyTVz06z4uRi1veUdKSYdIMEKW0r9KHlqJDmon8aIqGu2cvTYNQzLIuQRPoBBAG6wQ"' }}>
          <div className="header-div">
            <a href='/'><img
              style={{ width: 130, height: 70 }}
              className="img"
              alt="Div headeree header"
              src={logo_icon}
            /></a>
            <div className="">
              <div className="div-headeree-menu">
                <div className="header-div-3" style={{ display: isEmployer ? 'block' : 'none' }}>
                  <div className="link-blog-wrapper">
                    <a className="header-text-wrapper" href="/employer">
                      Trang quản lý
                    </a>
                  </div>
                </div>
              </div>
              <div className="div-headeree-menu">
                <div className="header-div-3">
                  <div className="link-blog-wrapper">
                    <a className="header-text-wrapper" href="/">
                      Trang chủ
                    </a>
                  </div>
                </div>
              </div>
              <div className="div-headeree-menu">
                <div className="header-div-3">
                  <div className="link-li-n-h-wrapper">
                    <a className="header-text-wrapper" href="/contact">
                      Liên hệ
                    </a>
                  </div>
                </div>
              </div>
              <div className="div-headeree-menu">
                <div className="header-div-3" style={{ display: isLoggedIn ? 'none' : 'block' }}>
                  <div className="link-li-n-h-wrapper">
                    <a className="header-text-wrapper" href="/login">
                      <span id="loginText">Đăng nhập</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="div-headeree-menu">
                <div className="header-div-3" style={{ display: isLoggedIn ? 'none' : 'block' }}>
                  <div className="link-li-n-h-wrapper">
                    <a className="header-text-wrapper" href="/role">
                      <span id="loginText">Đăng ký</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-div-3">
            <div className="div-headeree-header-2">
              <div className="header-div-2" style={{ display: isLoggedIn ? 'block' : 'none' }}>
                <div className="div-hd-fdd">
                  <div className="link">
                    <a className="header-text-wrapper-2" href="/add-post">
                      Đăng tin tuyển dụng
                    </a>
                  </div>
                </div>
              </div>
              <div className="div-headeree-noti" style={{ display: isLoggedIn ? 'block' : 'none' }}>
                <div className="header-div-3">
                  <div className="div-notification">
                    <div className="header-div-2">
                      <i class="fa-regular fa-bell" id='div-fjob' onClick={() => setNotify((view) => !view)}></i>
                      {notify &&
                        <div className='notify-page'>
                          {Listnoti && Listnoti.length > 0 && Listnoti.map((item, index) => (
                            item.isNew === 1 ? (
                              <div className='notify-hover' onClick={() => GetNoti(item.id)} style={{ backgroundColor: 'gainsboro' }} key={index}>
                                <div className='notify-item'>
                                  <div className='notify-user-avt'>
                                    {item.image===null ? (
                                      <div>
                                        <img src='https://png.pngtree.com/png-vector/20220610/ourlarge/pngtree-avatar-account-administrator-business-call-png-image_4949105.png' alt='user-avatar' />
                                      </div>
                                    ) : (
                                      <img src={item.image} alt='user-avatar' />
                                    )}

                                  </div>
                                  <div className='notify-user'>
                                    <div className='notify-user-name'>{item.title}</div>
                                    {/* <div className='notify-user-content'>{item.title}</div> */}
                                    <div className='notify-user-time'><i className="fa-regular fa-clock"></i> {item.date}</div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className='notify-hover' onClick={() => GetNoti(item.id)} key={index}>
                                <div className='notify-item'>
                                  <div className='notify-user-avt'>
                                    {item.image===null ? (
                                      <div>
                                        <img src='https://png.pngtree.com/png-vector/20220610/ourlarge/pngtree-avatar-account-administrator-business-call-png-image_4949105.png' alt='user-avatar' />
                                      </div>
                                    ) : (
                                      <img src={item.image} alt='user-avatar' />
                                    )}
                                  </div>
                                  <div className='notify-user'>
                                    <div className='notify-user-name'>{item.title}</div>
                                    {/* <div className='notify-user-content'>{item.title}</div> */}
                                    <div className='notify-user-time'><i className="fa-regular fa-clock"></i> {format(new Date(item.date), 'HH:mm:ss dd-MM-yyyy')}</div>
                                  </div>
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      }
                      <Popup trigger={btnPopup} setTrigger={setBtnPopup}>
                        <div className='notify-top'>Chi tiết thông báo</div>
                        <div className='notify-item'>
                          <div className='notify-detail-user-avt'>
                            <img src={logo_job} />
                          </div>
                          <div className='notify-detail-user'>
                            <div className='notify-user-name'>{notification.title}</div>
                            <div className='notify-detail-user-time'><i class="fa-regular fa-clock"></i>{notification.date ? format(new Date(notification.date), 'HH:mm:ss dd-MM-yyyy') : (null)}</div>
                            <div className='notify-user-content'>{notification.content}</div>
                          </div>
                        </div>
                      </Popup>
                      {countNoti !== 0 ? (
                        <div className="superscript">
                          <div className="header-text-wrapper-3">{countNoti}</div>
                        </div>
                      ) : (null)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="header-div-3" style={{ display: isLoggedIn ? 'block' : 'none' }}>
                <div className="div-headeree">
                  {selectedImage ? (
                    <div>
                      <img className="user-png" src={selectedImage} alt="Selected" />
                    </div>
                  ) : (<div className="user-png" />)}
                  <div className="header-div-3">
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title={UserName}
                      menuVariant="light"
                    >
                      <div id='menu'>
                        <div className='info'>
                          {selectedImage ? (
                            <div>
                              <img className="user-png" src={selectedImage} alt="Selected" />
                            </div>
                          ) : (<div className="user-png" />)}
                          <div className='info-content'>
                            <div className='info-name'>{UserName}</div>
                            <div className='info-item'>ID: 00{IdUser}</div>
                          </div>
                        </div>
                        <NavDropdown.Divider />
                        {
                          <NavDropdown.Item className='' href="/profilemp">
                            <i class="fa-regular fa-user" id='header-icon'></i>Thông tin tài khoản
                          </NavDropdown.Item>
                        }
                        <NavDropdown.Item className='' href="/changepassEmp">
                          <i class="fa-solid fa-lock" id='header-icon'></i>Đổi mật khẩu
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className='' href="/interview-manage">
                          <i class="fa-regular fa-calendar-days" id='header-icon'></i>Quản lý lịch phỏng vấn
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className='' href="/employer" style={{ display: isEmployer ? 'block' : 'none' }}>
                          <i class="fa-solid fa-house-laptop" id='header-icon'></i>Chế độ nhà tuyển dụng
                        </NavDropdown.Item>
                        <NavDropdown.Item className='' href="/" style={{ display: isCandidate ? 'block' : 'none' }}>
                          <i class="fa-solid fa-user-group" id='header-icon'></i>Chế độ ứng viên
                        </NavDropdown.Item>
                        <NavDropdown.Item className='' onClick={handleLogout}>
                          <i class="fa-solid fa-arrow-right-from-bracket" id='header-icon'></i> Đăng xuất
                        </NavDropdown.Item>
                        <ToastContainer />
                      </div>
                    </NavDropdown>
                    <div className="div-headeree-role">
                      <div className="header-text-wrapper-4">Nhà tuyển dụng</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderEmployer;