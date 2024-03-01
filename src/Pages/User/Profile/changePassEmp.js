import { useState } from "react";
import Footer from "../Themes/Footer/footer";
import HeaderEmployer from "../Themes/Header/headerEmployer";
import "./profile.scss";
import { ChangePassword } from '../../../Service/userService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';

function ChangePassEmp() {
  const navigate = useNavigate();
  let id = parseInt(sessionStorage.getItem('idOfEmp'),10);
  const [MessageError, setMessageError] = useState('');
  const [formInput, setFormInput] = useState({
    accountId:id,
    oldpassword: "",
    newpassword: "",
    repassword: ""
  });

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const validateFormInput = async (event) => {
    event.preventDefault();
    console.log("ChangePassword",formInput);
    let res = await ChangePassword(formInput);
    console.log(res);
        if(res && res.message==="successfull"){
            navigate("/login?changepass=done")            
        }else{
            setMessageError(res.message)
        }
  };

  return (
    <>
      <HeaderEmployer />
      <div className="container">
        <div className="change-pass-card">
          <div className="change-pass-card-header">
            <h4 className="change-pass-title">Change Password</h4>
          </div>

          <div className="change-pass-card-body">
            <form onSubmit={validateFormInput}>
              <p className="change-pass-label">Mật khẩu cũ</p>
              <input
                // value={formInput.oldpassword}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
                name="oldpassword"
                type="text"
                className="change-pass-input"
                placeholder="Nhập mật khẩu cũ"
              />
              <p className="change-pass-label">Mật khẩu mới</p>
              <input
                // value={formInput.newpassword}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
                name="newpassword"
                type="password"
                className="change-pass-input"
                placeholder="Nhập mật khẩu mới"
              />

              <p className="change-pass-label">Nhập lại mật khẩu mới</p>
              <input
                // value={formInput.repassword}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
                name="repassword"
                type="password"
                className="change-pass-input"
                placeholder="Nhập lại mật khẩu mới"
              />
              <p className="error-message">{MessageError}</p>

              <input type="submit" className="change-pass-btn" value="Đổi mật khẩu" />
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ChangePassEmp;