import './verify.scss';
import Form from 'react-bootstrap/Form';
import logo_icon from '../../../Assets/logo-header.png'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ForgetPassword } from '../../../Service/userService';
function Otp() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const [MessageError, setMessageError] = useState('');
    // Hàm xử lý khi giá trị của ô input thay đổi
    const handleOtpChange = (e) => {
      setOtp(e.target.value);
      
    };
    const ForgetPasswordHandler= async()=>{
        if(sessionStorage.getItem('otp')===otp){
            const ForgetString = sessionStorage.getItem('ForgetPasswordRequestData');
            const ForgetData = JSON.parse(ForgetString);
            console.log(ForgetData);       
            let res = await ForgetPassword(ForgetData);
            if(res){
                sessionStorage.removeItem('otp');
                sessionStorage.removeItem('ForgetPasswordRequestData');
                navigate("/login")
            }else{
                setMessageError("Lỗi chưa chạy server")
            }  
        }else{
            setMessageError("Mã Otp không chính xác");
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
                                    <div className="div-auth-main-form-verify-otp">
                                        <div className='form-reset'>
                                            <div className='form-verify-otp'>
                                                <div className="heading-s-i-n-tho-verify-otp">Vui lòng nhập mã OTP</div>
                                                <div className='input-verify'>
                                                    <Form.Control
                                                        id="span-ant-input-affix-verify-otp"
                                                        type="text" value={otp}
                                                        onChange={handleOtpChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="error-message">{MessageError}</p>
                                        <div className="verify-control-otp">
                                            <Button onClick={ForgetPasswordHandler} id="button-verify-otp" variant="success">Xác nhận</Button>{' '}
                                            <Button href='/login' id="button-verify-otp" variant="primary">Login</Button>
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

export default Otp;


