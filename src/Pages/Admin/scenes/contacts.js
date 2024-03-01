import { Box, useTheme } from "@mui/material";
import Header from "../components/adminHeader";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";
import '../admin.scss';
import { format } from 'date-fns';
import Button from 'react-bootstrap/Button';
import PopupAdmin from '../components/popupContact'
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { GetContact, SentEmail, CreateContact } from "../../../Service/notificationService";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [btnPopup, setBtnPopup] = useState(false);
  const [data, setData] = useState([]);
  const [toEmail, setToEmail] = useState();
  const [title, setTitle] = useState();
  const [sub, setSub] = useState("");
  const [name, setName] = useState();
  const [cId, setCId] = useState();
  const [update, setupdate] = useState(false);
  const navigate = useNavigate();
  const [contact, setContact] = useState({ title: '', content: '', isAdmin: 1, fullname: '', email: '', contactId: 0 })
  const token =localStorage.getItem("token");
  console.log("token", token);
  useEffect(() => {
    GetAllContact();
  }, [update]);

  const GetAllContact = async () => {
    // call ham getallconcatact
    let res = await GetContact(0,token);
    if (res) {
      console.log("GetContact form", res);
      setData(res)
    }
  }
  const open = async (email, fullname, cid) => {
    setBtnPopup(true);
    setToEmail(email);
    setTitle("Phản hồi từ của FJOB");
    setName(fullname);
    setCId(cid);
  }
  const handleAnwerContact = async () => {
    if (!sub.length > 0) {
      toast.error("Vui lòng điền đầy đủ thông tin vào bài viết!");
    } else {
      contact.content = sub;
      contact.contactId = cId;
      contact.email = toEmail;
      contact.fullname = name;
      contact.title = title;
      contact.isAdmin = 1;
      console.log("subjec", sub);
      console.log("setToEmail", toEmail);
      console.log("setTitle", title);
      console.log("contactId", cId);
      console.log("contact ìnomation", contact);
      let createToSendMail = await SentEmail(toEmail, title, sub,token);
      let res1 = await CreateContact(contact);
      console.log("CreateContact", res1);
      if (res1 && createToSendMail) {
        toast.success("Bạn đã gửi phản hồi về mail thành công");
        setBtnPopup(false);
        setupdate(cId);
      }
    }
    setSub("");
  }

  return (
    <>

      <Box m="20px" >
        <Header title="Liên hệ" subtitle="Phản hồi câu hỏi từ người dùng" />
        {data && data.length > 0 &&
          data.map((item, index) => {
            return (
              <Accordion defaultExpanded style={{ width: '1200px', fontFamily: 'Open Sans' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography color={colors.greenAccent[500]} variant="h5">
                    {item.title}
                  </Typography>
                  <div className="contact-infomation-time"><i class="fa-regular fa-clock"></i>{format(new Date(item.time), 'yyyy-MM-dd')}</div>
                </AccordionSummary>
                <div className="contact-infomation">
                  <div className="contact-infomation-avt">
                    <img src='https://c.animaapp.com/3RPBHCw2/img/user-png@2x.png' />
                  </div>
                  <div className="contact-infomation-detail">
                    <div className="contact-infomation-name">{item.fullname}<span>({item.account.email})</span></div>
                    <div className="contact-infomation-role">
                      {item.account.roleId === 2 ? "Ứng viên" : "Nhà tuyển dụng"}
                    </div>
                  </div>
                </div>
                <AccordionDetails style={{ fontFamily: 'Open Sans' }}>
                  <Typography style={{ fontFamily: 'Open Sans' }}>
                    <div >
                      <div>{item.content}</div>
                      <div >
                        {item.isContact === 1 ? (
                          <Button disabled style={{ translate: '1000px', fontFamily: 'Open Sans' }} variant="outline-light">Đã phản hồi</Button>
                        ) : (
                          <Button onClick={() => open(item.account.email, item.fullname, item.id)} style={{ translate: '1000px', fontFamily: 'Open Sans' }} variant="outline-light">Phản hồi</Button>
                        )}
                      </div>
                    </div>
                  </Typography>
                </AccordionDetails>
                <PopupAdmin trigger={btnPopup} setTrigger={setBtnPopup}>
                  <div className='admin-notify-top'>Phản hồi</div>
                  <div className='admin-notify-item'>
                    <Form.Control
                      type="text"
                      id="contact-input"
                      name="sub"
                      onChange={(event) => setSub(event.target.value)}
                      value={sub}
                    />
                  </div>
                  <Button onClick={() => setBtnPopup(false)} style={{ float: 'inline-end', marginLeft: '10px' }} variant="danger">Hủy bỏ</Button>
                  <Button style={{ float: 'inline-end' }} onClick={() => handleAnwerContact()} variant="success">Phản hồi</Button>
                </PopupAdmin>
              </Accordion>
            )
          })}
      </Box>

      <ToastContainer />
    </>
  )
}
export default Contact;