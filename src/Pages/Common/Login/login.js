import { useEffect, useState } from 'react';
import './login.scss'
import { loginApi, RegisterGoogle } from '../../../Service/userService';
import { getCanById, getEmpById } from '../../../Service/jobService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import eye_icon from '../../../Assets/view.png'
import eye_hide_icon from '../../../Assets/hide.png'
import banner from '../../../Assets/banner-login.png'
import { Modal } from 'react-bootstrap';
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { getEmployById } from '../../../Service/employService';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [password, setPassword] = useState();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const [loginRe, setLoginRe] = useState({ Email: '', Password: '' });
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [ChangePass, setChangePass] = useState(true);
  const [run, setRun] = useState(true);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('changepass')) {
      if (ChangePass) {
        toast.success("Đổi mật khẩu thành công thành công");
        setChangePass(false);
      }

    }
    if (run) {
      getPassword();
      setRun(false);
    }
    const storedIsCheckboxChecked = localStorage.getItem('isCheckboxChecked');
    if (storedIsCheckboxChecked) setIsCheckboxChecked(storedIsCheckboxChecked === 'true');
    setLoginRe({
      Email: email,
      Password: password
    });
  }, [email, password])

  const getPassword = () => {
    var encryptedPassword = localStorage.getItem('password');
    if (encryptedPassword) {
      var decryptedPassword = atob(encryptedPassword);
      setPassword(decryptedPassword);
    } else {
      setPassword(null);
    }
  }

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Kiểm tra email hoặc mật khẩu");
      return;
    }
    if (isCheckboxChecked) {
      localStorage.setItem('email', email);
      var encryptedPassword = btoa(password);
      localStorage.setItem('password', encryptedPassword);
      // localStorage.setItem('password', password);
    }
    setLoading(true)
    let res = await loginApi(loginRe);
    console.log("loginApi", res);
    if (res && res.message === "Login thanh cong") {

      if (res.account.roleId === 3) {
        sessionStorage.setItem('id', res.account.id);
        console.log("adminDashboard");
        sessionStorage.setItem('isAdmin', true);
        localStorage.setItem("token", res.accessToken);
        navigate("/adminManageUser");
        return;
      }
      if (res.account.status === 1) {
        setShowReasonModal(true);
        setLoading(false)
        return;
      }
      sessionStorage.setItem('id', res.account.id);
      sessionStorage.setItem('isCandidate', res.isCandidate);
      sessionStorage.setItem('isEmployer', res.isEmployer);
      let resc = await getCanById(res.account.id);
      let resc1 = await getEmpById(res.account.id);
      let candidate = resc.length > 0 ? resc[0] : null;
      if (candidate === null ? false : candidate.status === 1 || resc1.status === 404 ? false : resc1.account.stauts === 1) {
        setShowReasonModal(true);
        setLoading(false)
        return;
      }
      console.log("candidate", candidate);
      // let employer = resc1.length > 0 ? resc1[0] : null;
      console.log("employer", resc1);

      if (candidate != null && candidate) {
        localStorage.setItem("token", res.accessToken);
        console.log('token', localStorage.getItem("token"));
        sessionStorage.setItem('idOfCandidate', candidate.accountid);
        sessionStorage.setItem('fullname', candidate.fullname);
        sessionStorage.setItem('candidateId', candidate.id);
        sessionStorage.setItem('imageC', candidate.image);
        console.log('candidateId', candidate.id);
      }
      if (resc1 != null && resc1.status !== 404) {
        if (candidate != null && candidate) {
          localStorage.setItem("tokenE", res.accessTokenE);
        } else {
          localStorage.setItem("tokenE", res.accessToken);
        }
        console.log('tokenE', localStorage.getItem("tokenE"));
        sessionStorage.setItem('idOfEmp', resc1.accountId);
        sessionStorage.setItem('fullnameEmp', resc1.account.fullName);
        sessionStorage.setItem('employerId', resc1.id);
        sessionStorage.setItem('imageE', resc1.image);
        console.log('employerId', resc1.id);
        console.log('fullnameEmp', resc1.account.fullName);
        console.log('idOfEmp', resc1.accountId);
      }
      const searchParams = new URLSearchParams(window.location.search);
      if (res.account.roleId === 1) {
        navigate("/employer");
        return;
      }

      if (searchParams.get('jobid')) {
        navigate("/job-detail?jobid=" + searchParams.get('jobid'))
        return;
      }
      navigate("/");
    } else {
      toast.error("Kiểm tra lại tài khoản hoặc mật khẩu");
    }
    setLoading(false)
  }

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
    localStorage.setItem('isCheckboxChecked', !isCheckboxChecked);
    if (!isCheckboxChecked) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
  }
  const handleCloseReasonModal = () => {
    setShowReasonModal(false);
  };

  useEffect(() => {
    // Thiết lập Facebook SDK
    const loadFacebookSDK = () => {
      // Replace 'your-app-id' with your actual Facebook App ID
      const appId = '3622741384659197';
      const script = document.createElement('script');
      script.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0&appId=${appId}&autoLogAppEvents=1`;
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        // Facebook SDK đã được tải, bạn có thể tiến hành xử lý tại đây
        // Gọi hàm FB.init() và các sự kiện Facebook khác
        window.FB.init({
          appId,
          cookie: true,
          xfbml: true,
          version: 'v18.0',
        });
      };
    };
    loadFacebookSDK();
  }, []);

  const handleLoginFB = () => {
    // Xử lý đăng nhập bằng Facebook
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log('Đăng nhập thành công');
          // Thực hiện các hành động sau khi đăng nhập thành công
        } else {
          console.log('Đăng nhập thất bại');
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  return (
    <div className='containerd3'>
      <div className='container-login'>
        <div className="login-form">

          <div className="header">
            <p className='header-top'>CHÀO MỪNG BẠN ĐÃ QUAY TRỞ LẠI</p>
            <p className='header-body'>Tìm ứng viên linh hoạt và phù hợp cùng <span>việc làm part-time.</span></p>
            <p className='header-bottom'>Đăng nhập</p>
          </div>

          <div>
            <div className="inputs">
              <div className="input">
                <input id='input'
                  type="email"
                  placeholder='Email'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)} />
                <div className='eye-pass'>

                </div>
              </div>

              <div className="input">
                <input id='input'
                  type={isShowPassword === true ? "text" : "password"}
                  placeholder='Mật khẩu'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)} />
                <div className='eye-pass'>
                  <img
                    src={isShowPassword === true ? eye_hide_icon : eye_icon}
                    alt=""
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  />
                </div>
              </div>
            </div>

            <div className="checkbox">
              <input type="checkbox" name="" checked={isCheckboxChecked} onChange={handleCheckboxChange} />
              <p className='remember'>Nhớ mật khẩu</p>
            </div>

            <div className="">
              <button id='button-login' type='submit'
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
              >{loading && <i class="fa-solid fa-sync fa-spin"></i>} Đăng nhập</button>

            </div>

            <div className="suport">
              <div className="register">
                <a href='/role'>Đăng ký</a>
              </div>

              <div className="register">
                <a href='/verify'>Quên mật khẩu</a>
              </div>
            </div>

            {/* <div className='back'>

              <a href='/'><i className='fa-solid fa-angles-left' style={{ color: '#005eff' }} />Về trang chủ</a>
            </div> */}

            <div className='gg-lg' style={{ width: '550px', marginTop: 30 }}>
              <GoogleOAuthProvider id="login-gg" clientId="487871973409-136v5d9fh3mnsnrv2c8tu9b73gqal8rl.apps.googleusercontent.com">
                <GoogleLogin
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Đăng nhập bằng Google
                    </button>
                  )}
                  onSuccess={async credentialResponse => {
                    const details = jwt_decode(credentialResponse.credential);
                    console.log(details);
                    const RegisterGoogleRequest = {
                      role: "Candidate",
                      email: details.email,
                      fullname: details.name
                    };
                    console.log(RegisterGoogleRequest);
                    let res = await RegisterGoogle(RegisterGoogleRequest);
                    console.log("RegisterGoogleRequest", res);
                    if (res.account.status === 1) {
                      setShowReasonModal(true);
                      setLoading(false)
                      return;
                    }
                    let resc = await getCanById(res.account.id);
                    let resc1 = await getEmpById(res.account.id);
                    let candidate = resc.length > 0 ? resc[0] : null;
                    console.log("candidate", candidate);
                    // let employer = resc1.length > 0 ? resc1[0] : null;
                    console.log("employer", resc1);
                    sessionStorage.setItem('id', res.account.id);
                    sessionStorage.setItem('LoginWithGG', true);
                    sessionStorage.setItem('isCandidate', true);
                    if (candidate != null) {
                      sessionStorage.setItem('imageC', candidate.image);
                      localStorage.setItem("token", res.accessToken);
                      sessionStorage.setItem("token", res.accessToken);
                      sessionStorage.setItem('idOfCandidate', candidate.accountid);
                      sessionStorage.setItem('fullname', candidate.fullname);
                      sessionStorage.setItem('candidateId', candidate.id);
                      sessionStorage.setItem('isEmployer', false);
                      console.log('candidateId', candidate.id);
                    }
                    if (resc1 != null && resc1.status !== 404) {

                      if (candidate != null && candidate) {
                        localStorage.setItem("tokenE", res.accessTokenE);
                      } else {
                        localStorage.setItem("tokenE", res.accessToken);
                      }
                      console.log(sessionStorage.getItem("tokenE"));
                      sessionStorage.setItem('idOfEmp', resc1.accountId);
                      sessionStorage.setItem('fullnameEmp', resc1.account.fullName);
                      sessionStorage.setItem('employerId', resc1.id);
                      sessionStorage.setItem('isEmployer', true);
                      sessionStorage.setItem('imageE', resc1.image);
                      console.log('employerId', resc1.id);
                      console.log('fullnameEmp', res.account.fullName);
                      console.log('idOfEmp', resc1.accountId);
                    }
                    const searchParams = new URLSearchParams(window.location.search);
                    if (res.account.roleId === 1) {
                      navigate("/employer");
                      return;
                    }
                    if (searchParams.get('jobid')) {
                      navigate("/job-detail?jobid=" + searchParams.get('jobid'))
                    } else {
                      navigate("/");
                    }
                    navigate("/");
                  }}
                  onError={() => {
                    navigate("/login");
                  }} />
              </GoogleOAuthProvider>
            </div>
          </div>
        </div>
        <Modal show={showReasonModal} onHide={handleCloseReasonModal}>
          <Modal.Header closeButton>
            <Modal.Title>Tài khoản của bạn đã bị khóa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Bạn có muốn chuyển tới trang liên hệ với Admin không?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseReasonModal}>
              Đóng
            </Button>
            <Button variant="secondary" href='/contact'>
              Liên hệ
            </Button>
          </Modal.Footer>
        </Modal>

        <div id="content" className='banner'>
          <a href='/'><img style={{ height: '100%', width: '100%' }} src={banner} alt="" /></a>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login;