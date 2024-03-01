import HeaderEmployer from "../../Themes/Header/headerEmployer";
import SideBar from "../MangementPage/sidebar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import './interview.scss'
import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from 'react'
import { CreateInterview, GetInterViewByEmpId, GetCandidateByInterviewId } from '../../../../Service/employService';
import { EditLich, DeleteCandidateInterview } from '../../../../Service/interviewService';
import { AddNotiForCandidate } from '../../../../Service/notificationService.js';
function Interview() {
    const currentDate = new Date().toISOString().split('T')[0];
    const [formInput, setFormInput] = useState({ start: '', end: '', date: '', accountId: 1 });
    const [request, setRequest] = useState({ start: '', end: '', date: '', accountId: 1 });
    const [MessageError, setMessageError] = useState('');
    const [MessageError1, setMessageError1] = useState('');
    const [listJob, setListJob] = useState([]);
    const [listCandidate, setListCandidate] = useState([]);
    const [show, setShow] = useState(false);
    const [nameList, setNameList] = useState("");
    const [nameList1, setNameList1] = useState("");
    const [udpate, setupdate] = useState();
    const [notification, setNotification] = useState({ accountId: '', fromAccountId: '', title: '', content: '' })
    const tokenE = localStorage.getItem("tokenE");
    useEffect(() => {
        getInterview();
    }, [udpate])
    useEffect(() => {
    }, [tokenE])
    
    const getInterview = async () => {
        const aId = sessionStorage.getItem("id");
        let res = await GetInterViewByEmpId(aId,tokenE);
        if (res) {
            setListJob(res);
        }
        console.log("GetInterviewByCanId", res);
    }
    let start = "start";
    let end = "end";
    let datepv = "datepv";

    const showDanhSachUngVien = async (id) => {
        console.log("id", id);
        let res = await GetCandidateByInterviewId(id,tokenE);
        if (res) {
            setListCandidate(res);
        }
        console.log("getCandidate", listCandidate);
        console.log("res", res);
        setShow(true);
        setNameList(" #" + id)
        setNameList1(id)
    }
    const DatLich = (start, end, date, id) => {
        request.start = start;
        request.end = end;
        request.date = date;
        request.accountId = id;
        console.log("request", request)
        let res = EditLich(request,tokenE);
        console.log("DatLich", res);
        setMessageError1("");
        toast.success("Bạn đã đổi lịch thành công");
    }
    const enableInputFields = (id) => {
        var doilichphongvan = document.getElementById(id.toString());

        var thoiGianBatDauInput = document.getElementById("start" + id.toString());
        var thoiGianKetThucInput = document.getElementById("end" + id.toString());
        var ngayPhongVanInput = document.getElementById("datepv" + id.toString());

        if (doilichphongvan.innerText === "Đổi lịch") {
            thoiGianBatDauInput.type = "time";
            thoiGianKetThucInput.type = "time";
            ngayPhongVanInput.type = "date";
            doilichphongvan.innerText = "Đồng ý"
            thoiGianBatDauInput.readOnly = false;
            thoiGianKetThucInput.readOnly = false;
            ngayPhongVanInput.readOnly = false;
        } else {
            if (thoiGianBatDauInput.value > thoiGianKetThucInput.value) {
                setMessageError1("Thời gian kết thúc phải lớn hơn");
                return;
            }
            DatLich(thoiGianBatDauInput.value, thoiGianKetThucInput.value, ngayPhongVanInput.value, id)
            doilichphongvan.innerText = "Đổi lịch"
            thoiGianBatDauInput.type = "text";
            thoiGianKetThucInput.type = "text";
            ngayPhongVanInput.type = "text";
            thoiGianBatDauInput.readOnly = true;
            thoiGianKetThucInput.readOnly = true;
            ngayPhongVanInput.readOnly = true;
            console.log(thoiGianBatDauInput.value, thoiGianKetThucInput.value, ngayPhongVanInput.value, id)
        }
    }

    const Datlich = async () => {
        const accountid = sessionStorage.getItem("id");
        var thoiGianBatDauInput = document.getElementById("startmain");
        var thoiGianKetThucInput = document.getElementById("endmain");
        var ngayPhongVanInput = document.getElementById("datemain");

        // Lưu lại giá trị ban đầu
        const thoiGianBatDauValue = thoiGianBatDauInput.value;
        const thoiGianKetThucValue = thoiGianKetThucInput.value;
        const ngayPhongVanValue = ngayPhongVanInput.value;
        if (thoiGianBatDauValue > thoiGianKetThucValue) {
            setMessageError("Thời gian kết thúc phải lớn hơn");
            return;
        }else
        if (thoiGianBatDauValue.length === 0 || thoiGianKetThucValue.length === 0 || ngayPhongVanValue.length === 0 || accountid === false) {
            setMessageError("Không để trống thông tin");
            return;
        } else {
            formInput.start = thoiGianBatDauValue;
            formInput.end = thoiGianKetThucValue;
            formInput.date = ngayPhongVanValue;
            formInput.accountId = accountid;
            await CreateInterview(formInput,tokenE);
            thoiGianBatDauInput.value = "";
            thoiGianKetThucInput.value = "";
            ngayPhongVanInput.value = "";
            getInterview();
            toast.success("Bạn đã thêm 1 lịch phỏng vấn");
            setMessageError("");
        }
    }

    const CancelInterview = async (id,interviewId,title,cid) => {
        const userConfirmed = window.confirm('Bạn có chắc hủy phỏng vấn không');

        // Nếu người dùng đồng ý, thực hiện xóa
        if (userConfirmed) {
            let res = await DeleteCandidateInterview(id,tokenE);
            if (res) {
                notification.accountId = cid;
                notification.fromAccountId = sessionStorage.getItem('idOfEmp');
                notification.title = title + " thông báo";
                notification.content = `Lịch phỏng vấn của bạn về: ${title} đã bị hủy. Xin lỗi về sự cố này cảm ơn `;
                await AddNotiForCandidate(notification,tokenE);
                showDanhSachUngVien(interviewId);
                toast.success("Hủy phỏng vấn thành công");
            }
        }
        
    }
    return (
        <>
            <HeaderEmployer />
            <div className="employer-page">
                <div className="employer-page-sidebar">
                    <SideBar />
                </div>

                <div className="employer-page-content">
                    <div className="interview-feedback">
                        <div className="interview-feedback-item">Đã tham gia phỏng vấn<i class="fa-solid fa-circle-info" id="interview-icon"></i><i class="fa-solid fa-circle-user" id="interview-icon"></i></div>
                        <Button href="/candidate-manage?toggleTab=3" id="interview-btn" variant="primary">Đánh giá ứng viên</Button>
                    </div>

                    <div className="interview-search">
                        <div className="interview-search-item">
                            <div className="interview-search-item-title">Thời gian bắt đầu</div>
                            <Form.Control
                                type="time"
                                placeholder="Thời gian bắt đầu"
                                required
                                defaultValue
                                id="startmain"
                            />
                        </div>
                        <div className="interview-search-item">
                            <div className="interview-search-item-title">Thời gian kết thúc</div>
                            <Form.Control
                                defaultValue
                                type="time"
                                id="endmain"
                                required
                            />
                        </div>

                        <div className="interview-search-text">
                            <div className="interview-search-item-title">Ngày Phỏng vấn</div>
                            <Form.Control
                                id="datemain"
                                type="date"
                                min={currentDate}
                                defaultValue
                                required
                            />
                        </div>
                        <div><Button variant="primary" id="interview-btn-search" onClick={Datlich}>Đặt lịch</Button></div>
                        <p className="error-message">{MessageError}</p>
                    </div>

                    <div style={{ width: '90%', margin: 'auto', marginTop: '30px' }}>
                        <div className="interview-title">Lịch phỏng vấn</div>
                    </div>

                    <div className="interview-time">
                        <Table striped bordered hover style={{ marginTop: '10px' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '20px', margin: 'auto', alignItems: 'center' }}>Mã lịch</th>
                                    <th style={{ padding: '20px', margin: 'auto', alignItems: 'center' }}>Thời gian bắt đầu</th>
                                    <th style={{ padding: '20px', margin: 'auto', alignItems: 'center' }}>Thời gian kết thúc</th>
                                    <th style={{ padding: '20px', margin: 'auto', alignItems: 'center' }}>Ngày</th>
                                    <th style={{ padding: '20px', margin: 'auto', alignItems: 'center' }}>Đổi lịch phỏng vấn</th>
                                    <th style={{ padding: '20px', margin: 'auto', alignItems: 'center' }}>Xem danh sách</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listJob && listJob.length > 0 &&
                                    listJob.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>#{item.id}</td>
                                                <td><Form.Control
                                                    type="text"
                                                    id={start + item.id}
                                                    defaultValue={item.start}
                                                    readOnly={true}
                                                /></td>
                                                <td><Form.Control
                                                    type="text"
                                                    id={end + item.id}
                                                    defaultValue={item.end}
                                                    readOnly={true}
                                                /></td>
                                                <td><Form.Control
                                                    type="text"
                                                    id={datepv + item.id}
                                                    defaultValue={item.date}
                                                    readOnly={true}
                                                    min={currentDate}
                                                /></td>
                                                <td><Button variant="primary" id={item.id} onClick={() => enableInputFields(item.id)}>Đổi lịch</Button></td>
                                                <td><Button variant="primary" onClick={() => showDanhSachUngVien(item.id)}>Xem</Button></td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </Table>
                        <p className="error-message">{MessageError1}</p>
                    </div>

                    {/* Danh sách Phỏng vấn */}
                    <div style={{ width: '90%', margin: 'auto', marginTop: '30px' }}>
                        <div className="interview-title">Danh sách ứng viên phỏng vấn {nameList}</div>
                    </div>
                    {show ? (
                        <div id="listinterview" className="interview-time listinterview">
                            <Table striped bordered hover style={{ marginTop: '10px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '10px', margin: 'auto', alignItems: 'center' }}>STT</th>
                                        <th style={{ padding: '10px', margin: 'auto', alignItems: 'center' }}>Tên Công việc</th>
                                        <th style={{ padding: '20px', margin: 'auto', alignItems: 'center' }}>Họ và tên</th>
                                        <th style={{ padding: '20px', margin: 'auto', alignItems: 'center' }}>Liên hệ</th>
                                        <th style={{ padding: '20px', margin: 'auto', alignItems: 'center' }}>Ngày sinh</th>
                                        <th style={{ padding: '20px', margin: 'auto', alignItems: 'center' }}>Địa chỉ </th>
                                        <th style={{ padding: '20px', margin: 'auto', alignItems: 'center' }}>Hủy phỏng vấn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listCandidate && listCandidate.length > 0 &&
                                        listCandidate.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.title}</td>
                                                    <td>{item.fullname}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.dob}</td>
                                                    <td>{item.address}</td>
                                                    {item.status===6?(
                                                        <td><Button variant="primary" disabled>Ứng viên hủy</Button></td>
                                                    ):(
                                                        <td><Button variant="primary" onClick={() => CancelInterview(item.id,item.interview,item.title,item.jobApplicationId)}>Hủy</Button></td>
                                                    )}                                         
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    ) : (null)}
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Interview;