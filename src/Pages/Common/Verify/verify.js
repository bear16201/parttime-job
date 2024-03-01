import './verify.scss';
import Form from 'react-bootstrap/Form';
import logo_icon from '../../../Assets/logo-header.png'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Sentcode, CheckForget, ForgetPassword } from '../../../Service/userService';
function Verify() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [MessageError, setMessageError] = useState('');
    const [otp, setOtp] = useState('');
    const [isShowPassword1, setIsShowPassword1] = useState(false);
    const [isShowPassword2, setIsShowPassword2] = useState(false);
    // Hàm xử lý khi giá trị của ô input thay đổi
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRepasswordChange = (e) => {
        setRepassword(e.target.value);
    };
    const submitHandler = async () => {
        let res = await Sentcode(email);
        sessionStorage.setItem('otp', res.message);
    }
    const ForgetPasswordHandler = async () => {
        const ForgetPasswordRequest = {
            email: email,
            newPassword: password,
            rePassword: repassword
        };
        // const ForgetPasswordString = JSON.stringify(ForgetPasswordRequest);
        // sessionStorage.setItem('ForgetPasswordRequestData', ForgetPasswordString);
        let res1 = await CheckForget(ForgetPasswordRequest);
        if (res1.message === "Successfull") {
            if (sessionStorage.getItem('otp') === otp) {
                // const ForgetString = sessionStorage.getItem('ForgetPasswordRequestData');
                // const ForgetData = JSON.parse(ForgetString);
                // console.log(ForgetData);
                let res = await ForgetPassword(ForgetPasswordRequest);
                if (res) {
                    sessionStorage.removeItem('otp');
                    // sessionStorage.removeItem('ForgetPasswordRequestData');
                    navigate("/login")
                } else {
                    setMessageError("Lỗi chưa chạy server")
                }
            } else {
                setMessageError("Mã Otp không chính xác");
            }
        } else {
            setMessageError(res1.message);
        }

    }
    return (
        <div className="fjob-vn-by-html-to-verify">
            <div className="div-layout-layout-wrapper-verify">
                <div className="div-layout-layout-verify">
                    <div className="div-forgotpass-main-verify">
                        <img className="img-verify" alt="Div forgotpass main" src="https://cdn.noron.vn/2018/07/11/a69104930f3adca472186badb619d37a.jpg?w=600" />
                        <div className="div-forgotpass-main-wrapper-verify">
                            <div className="div-verify">
                                <div className="div-forgotpass-main-2-verify">
                                    <img className="logo-svg-verify" alt="Logo svg" src={logo_icon} />
                                    <div className="span-verify">
                                        <div className="span-hd-bac-verify">
                                            <p className="n-n-t-ng-cung-c-p-vi-verify">NỀN TẢNG CUNG CẤP VIỆC LÀM CHO THẾ HỆ TRẺ</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="div-step-one-main-verify">
                                    <div className="div-auth-main-title-verify">
                                        <p className="text-wrapper-verify">Bạn quên mật khẩu đăng nhập?</p>
                                    </div>
                                    <div className="p-step-one-main-des-verify">
                                        <p className="p-verify">Vui lòng nhập email đăng ký tài khoản để nhận</p>
                                    </div>
                                    <div className="div-wrapper-verify">
                                        <p className="p-verify">mã xác minh cấp lại mật khẩu</p>
                                    </div>
                                    <div className="div-auth-main-form-verify">
                                        <div className='form-reset'>
                                            <div className='form-verify'>
                                                <div className="heading-s-i-n-tho-verify">Email</div>
                                                <div className='input-verify'>
                                                    <i class="fa-regular fa-envelope" id='icon-verify'></i>
                                                    <Form.Control
                                                        id="span-ant-input-affix-verify"
                                                        style={{ padding: '10px' }}
                                                        type="text" value={email}
                                                        onChange={handleEmailChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-verify'>
                                                <div className="heading-s-i-n-tho-verify">Nhập mật khẩu</div>
                                                <div className='input-verify'>
                                                    <i onClick={() => setIsShowPassword1(!isShowPassword1)} 
                                                     class="fa-regular fa-eye" id='icon-verify'></i>
                                                    <Form.Control
                                                        id="span-ant-input-affix-verify"
                                                        style={{ padding: '10px' }}
                                                        type={isShowPassword1 === true ? "text" : "password"} value={password}
                                                        onChange={handlePasswordChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-verify'>
                                                <div className="heading-s-i-n-tho-verify">Nhập lại mật khẩu</div>
                                                <div className='input-verify'>
                                                    <i onClick={() => setIsShowPassword2(!isShowPassword2)} 
                                                    class="fa-regular fa-eye" id='icon-verify'></i>
                                                    <Form.Control
                                                        id="span-ant-input-affix-verify"
                                                        style={{ padding: '10px' }}
                                                        type={isShowPassword2 === true ? "text" : "password"} value={repassword}
                                                        onChange={handleRepasswordChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-verify'>
                                                <div className="heading-s-i-n-tho-verify">Xác nhận OTP</div>
                                                <div style={{ display: 'flex' }}>
                                                    <div className='input-verify-otp'>
                                                        <Form.Control
                                                            id="span-ant-input-affix-verify"
                                                            style={{ padding: '10px' }}
                                                            type="text" value={otp}
                                                            onChange={handleOtpChange}
                                                        />
                                                    </div>
                                                    <div><Button onClick={submitHandler} style={{ width: '90px', marginLeft: '30px' }} variant="success">Gửi OTP</Button></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div><p style={{ translate: '80px 27px' }} className="error-message">{MessageError}</p></div>
                                        <div className="verify-control">
                                            <div className="span-step-one-main-wrapper-verify" style={{ top: '365px' }}>
                                                <div className="span-step-one-main-verify">
                                                    <a href='/login' className="text-wrapper-3-verify">Quay lại đăng nhập</a>
                                                </div>
                                            </div>

                                            <div className="span-step-one-main-2-verify">
                                                <a href='/role' className="text-wrapper-3-verify" style={{ top: '85px' }}>Đăng ký tài khoản mới</a>
                                            </div>


                                            <Button style={{ top: '415px' }} onClick={ForgetPasswordHandler} id="button-verify" variant="success">Xác nhận</Button>{' '}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="div-fb-dialog">
                        <div className="div-fb-dialog-2" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Verify;


