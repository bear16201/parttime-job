import './Contact.scss'
import Header from '../Themes/Header/headerGuest';
import Footer from '../Themes/Footer/footer';
import bgImage from './images/img.jpg';
import { ToastContainer, toast } from 'react-toastify';
import { CreateContact } from '../../../Service/notificationService';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { green } from '@mui/material/colors';
import require_icon from '../../../Assets/require.png'
// import 'https://fonts.googleapis.com/css?family=Roboto:400,100,300,700'
// import 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'

export default function Contact() {
  const [MessageError, setMessageError] = useState('');
  const [contact, setContact] = useState({ title: '', content: '', isAdmin: 0, fullname: '', email: '', contactId:0 })
  const navigate = useNavigate();
  
  const handleChange = async (e) => {
    const { name, value } = e.target;
    await setContact({ ...contact, [name]: value });
  };
  const SentContact = async () => {
    console.log("contact", contact);
    let res1 = await CreateContact(contact);
    if (res1.message === "successfull") {
      setContact({
        content: "",
        email: "",
        fullname: "",
        title: "",
      });
      setMessageError("");
      toast.success("Bạn đã gửi liên hệ đến admin thành công");
    } else {
      setMessageError(res1.message);
    }
  }
  return (
    <>
      <Header/>
      <section class="ftco-section">
        <div class="container" style={{marginTop:0}}>
          <div class="row justify-content-center">
            <div class="col-md-6 text-center mb-5">
              <h1 class="heading-section">Vấn đề của bạn là gì?</h1>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-lg-12">
              <div class="wrapper img" style={{ backgroundImage: `url(${bgImage})` }}>
                <div class="row">
                  <div class="col-md-9 col-lg-7">
                    <div class="contact-wrap w-100 p-md-5 p-4">
                      <h3 class="mb-4">Chúng tôi giúp gì được cho bạn</h3>
                      <div id="form-message-warning" class="mb-4"></div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="label" for="name">Họ và tên<img id='require-icon' src={require_icon} alt="" /></label>
                            <input type="text" class="form-control"
                              name="fullname"
                              id="name"
                              value={contact.fullname} onChange={handleChange}
                              placeholder="Họ và tên" />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="label" for="email">Địa chỉ email<img id='require-icon' src={require_icon} alt="" /></label>
                            <input type="email" class="form-control"
                              name="email"
                              id="email"
                              value={contact.email} onChange={handleChange}
                              placeholder="Địa chỉ email" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="label" for="subject">Tiêu đề<img id='require-icon' src={require_icon} alt="" /></label>
                            <input type="text" class="form-control"
                              name="title"
                              id="subject"
                              value={contact.title} onChange={handleChange}
                              placeholder="Tiêu đề" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="label" for="#">Nôi dung/ Lý do<img id='require-icon' src={require_icon} alt="" /></label>
                            <textarea
                              name="content"
                              class="form-control"
                              id="message"
                              value={contact.content} onChange={handleChange}
                              cols="30"
                              rows="4"
                              placeholder="Nôi dung/ Lý do"></textarea>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <Button onClick={SentContact} variant="secondary" size="lg">
                              Gửi hỗ trợ
                            </Button>
                          </div>
                        </div>
                      </div>
                      <p className="error-message">{MessageError}</p>
                    </div>
                    <ToastContainer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
