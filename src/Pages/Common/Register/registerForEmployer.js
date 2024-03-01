import './register.scss'
import Button from 'react-bootstrap/Button';
import require_icon from '../../../Assets/require.png'
import eye_icon from '../../../Assets/view.png'
import eye_hide_icon from '../../../Assets/hide.png'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sentcode, CheckRegister } from '../../../Service/userService';
import { ToastContainer } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { getCity } from '../../../Service/candidateService';
function RegisterEmployer() {
    const navigate = useNavigate();
    const [isAccepted, setIsAccepted] = useState(false);
    const [city, setCity] = useState([]);
    const [distric, setDistric] = useState([]);
    const [isShowPassword1, setIsShowPassword1] = useState(false);
    const [isShowPassword2, setIsShowPassword2] = useState(false);
    const [MessageError, setMessageError] = useState('');
    const [RegisterRequest, setRegisterRequest] = useState({
        role: 'Employer', email: '', password: '', repassword: '', fullname: ''
        , phone: '', dob: '2023-12-27T08:28:07.640Z', image: 'https://cdn.luatvietnam.vn/uploaded/Images/Original/2023/02/21/mau-thong-bao-tuyen-dung-1_2102105109.jpg', gender: 'Nam', companyName: '', position: '', city: '', district: '', detailAddress: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCity(3);
                console.log("City", res);
                setCity(res);
            } catch (error) {
                console.error("Error fetching city:", error);
            }
        };
        fetchData();
    }, []); // Chú ý vào dependencies, nếu bạn không muốn fetchData chạy mỗi khi state thay đổi, hãy giữ dependencies rỗng.

    // useEffect(() => {
    //     console.log("Updated City", city);
    //     console.log("Updated request", RegisterRequest);
    // }, [RegisterRequest]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        await setRegisterRequest({ ...RegisterRequest, [name]: value });
    };
    const handleChange1 = async (e) => {
        const { name, value } = e.target;
        await setRegisterRequest({ ...RegisterRequest, [name]: value });
        const selectedCity = city.find((item) => item.name === value);
        if (selectedCity) {
            setDistric(selectedCity.districts);
        }
        console.log("Updated districts", distric);
    };
    const RegisterHandler = async () => {
        console.log('registerRequestData', RegisterRequest);
        const registerRequestString = JSON.stringify(RegisterRequest);
        console.log('registerRequestString', registerRequestString);
        sessionStorage.setItem('registerRequestData', registerRequestString);
        let res1 = await CheckRegister(RegisterRequest);
        if (res1.message === "Đăng ký thành công") {
            let res = await Sentcode(RegisterRequest.email);
            sessionStorage.setItem('otp', res.message);
            navigate("/otpRegister");
        } else {
            setMessageError(res1.message);
        }
    }



    // Xử lý sự kiện khi ô checkbox thay đổi
    const handleCheckboxChange = () => {
        setIsAccepted(!isAccepted);
    };
    const buttonStyle = {
        backgroundColor: 'green'
    };
    return (
        <div className='container'>
            <div id="login-form">
                <div className="header">
                    <p className='header-top'>CHÀO MỪNG BẠN ĐÃ QUAY TRỞ LẠI</p>
                    <p className='header-body'>Hãy là nhà tuyển dụng sáng suốt cùng với <span>việc làm part-time.</span></p>

                </div>

                <div className="register-form">
                    <div className="register-form-left">
                        <p className='header-bottom'>Đăng ký</p>
                        <div className="register-form-left-item">
                            <p id='title'>Email đăng nhập<img id='require-icon' src={require_icon} alt="" /></p>
                            <div className='input'>
                                <input id='input' type="email" placeholder='   Email' required=""
                                    name="email" value={RegisterRequest.email} onChange={handleChange}
                                />
                                <div className='eye-pass'>

                                </div>
                            </div>
                        </div>

                        <div className="register-form-left-item">
                            <p id='title'>Mật khẩu<img id='require-icon' src={require_icon} alt="" /></p>
                            <div className='input'>
                                <input id='input' type={isShowPassword1 === true ? "text" : "password"} placeholder='    Mật khẩu' required=""
                                    name="password" value={RegisterRequest.password} onChange={handleChange}
                                />
                                <img
                                    src={isShowPassword1 === true ? eye_hide_icon : eye_icon}
                                    alt=""
                                    onClick={() => setIsShowPassword1(!isShowPassword1)}
                                />
                            </div>
                        </div>

                        <div className="register-form-left-item">
                            <p id='title'>Nhập lại mật khẩu<img id='require-icon' src={require_icon} alt="" /></p>
                            <div className='input'>
                                <input id='input' type={isShowPassword2 === true ? "text" : "password"} placeholder='    Nhập lại mật khẩu' required
                                    name="repassword" value={RegisterRequest.repassword} onChange={handleChange} />
                                <img
                                    src={isShowPassword2 === true ? eye_hide_icon : eye_icon}
                                    alt=""
                                    onClick={() => setIsShowPassword2(!isShowPassword2)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="infomation">
                        <p className='header-bottom'>Nhà tuyển dụng</p>
                        <div className="register-form-left-item">
                            <p id='title'>Họ và tên<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='input' type="text" placeholder='   Họ và tên' required
                                name="fullname" value={RegisterRequest.fullname} onChange={handleChange} />
                        </div>

                        <div className="sex">
                            <p id='title'>Giới tính<img id='require-icon' src={require_icon} alt="" /></p>
                            <input name="gender" id='sex' type="radio" checked value="Nam" onChange={handleChange} />Nam
                            <input name="gender" id='sex' type="radio" value="Nữ" onChange={handleChange} />Nữ
                        </div>

                        <div className="register-form-left-item">
                            <p id='title'>Số điện thoại cá nhân<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='input' type="email" placeholder='   Số điện thoại' required
                                name="phone" value={RegisterRequest.phone} onChange={handleChange} />
                        </div>

                        <div className="register-form-left-item">
                            <p id='title'>Công ty, cơ sở kinh doanh<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='input' type="text" placeholder='   Tên Công ty, cơ sở kinh doanh' required
                                name="companyName" value={RegisterRequest.companyName} onChange={handleChange} />
                        </div>

                        <div className="register-form-left-item">
                            <p id='title'>Vị trí kinh doanh<img id='require-icon' src={require_icon} alt="" /></p>
                            <input id='input' type="text" placeholder='   Vị trí kinh doanh' required
                                name="position" value={RegisterRequest.position} onChange={handleChange} />
                        </div>

                        <div className="register-form-left-item">
                            <p id='title'>Tỉnh, thành phố<img id='require-icon' src={require_icon} alt="" /></p>
                            <Form.Select aria-label="Default select example" id="input"
                                name="city"
                                value={RegisterRequest.city}
                                onChange={handleChange1}
                                required
                            >
                                <option style={{ display: "none" }}>Chọn Tỉnh/Thành Phố</option>
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

                        <div className="register-form-left-item">
                            <p id='title'>Quận, huyện<img id='require-icon' src={require_icon} alt="" /></p>
                            <Form.Select aria-label="Default select example" id="input"
                                name="district"
                                value={RegisterRequest.district}
                                onChange={handleChange}
                                required
                            >
                                <option style={{ display: "none" }}>Chọn Quận/Huyện</option>
                                {distric && distric.length > 0 &&
                                    distric.map((item1, index1) => {
                                        return (
                                            <option value={item1.name}>
                                                {item1.name}
                                            </option>
                                        )
                                    })}
                            </Form.Select>
                        </div>

                        <div className="register-form-left-item">
                            <p id='title'>Địa chỉ cụ thể<img id='require-icon' src={require_icon} alt="" /></p>
                            <textarea id='inputs'
                                name="detailAddress" value={RegisterRequest.detailAddress} onChange={handleChange}></textarea>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" name="" checked={isAccepted} onChange={handleCheckboxChange} />
                            <p id='accept'>Đồng ý với điều khoản của <span>Việc làm part-time</span></p>
                        </div>
                        <div className="checkbox">
                            <p style={{ color: 'green', fontSize: 17, marginLeft: 40 }}>Thông tin cá nhân sẽ được nhìn bởi nhà tuyển dụng</p>
                        </div>
                        <div className="checkbox">
                            <p style={{ color: 'green', fontSize: 17, marginLeft: 40 }}>Cho phép sử dụng thông tin cá nhân</p>
                        </div>
                        <p className="error-message">{MessageError}</p>
                    </div>
                </div>

                <div className='btn-register'>
                    <Button onClick={RegisterHandler} variant="secondary" size="lg" disabled={!isAccepted} style={buttonStyle}>
                        Đăng Ký
                    </Button>
                    <ToastContainer />
                    <p className='btn-register'>Đã có tài khoản? <a href='/login'>Login</a></p>
                </div>

            </div>

            <div id="content"></div>
        </div>
    )
}

export default RegisterEmployer
