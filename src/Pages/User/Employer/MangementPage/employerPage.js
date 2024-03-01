import HeaderEmployer from "../../Themes/Header/headerEmployer";
import SideBar from "./sidebar";
import { useEffect, useState } from 'react';
import { tindangtrongtuan, ungvientrongtuan, ungvientrongthang, tindangtrongthang, tindangtuyendung, ungviendaungtuyen } from '../../../../Service/employService';


function EmployerPage() {
    const [tintrongtuan, settindangtrongtuan] = useState("");
    const [uvtrongtuan, setungvientrongtuan] = useState("");
    const [uvtrongthang, setungvientrongthang] = useState("");
    const [tintrongthang, settindangtrongthang] = useState("");
    const [tindadang, settindadang] = useState("");
    const [uvdatuyen, setuvdatuyen] = useState("");
    const tokenE = localStorage.getItem("tokenE");
    console.log("localStorage.getItem", tokenE);
    let name = sessionStorage.getItem('fullnameEmp');
    useEffect(() => {
        fetchData();
    }, [tokenE]);
    const fetchData = async () => {
        const eid = sessionStorage.getItem('employerId');
        console.log("eid", eid);
        let res1 = await tindangtrongtuan(eid, tokenE);
        let res2 = await ungvientrongtuan(eid, tokenE);
        let res3 = await ungvientrongthang(eid, tokenE);
        let res4 = await tindangtrongthang(eid, tokenE);
        let res5 = await tindangtuyendung(eid, tokenE);
        let res6 = await ungviendaungtuyen(eid, tokenE);

        console.log("res1", res1);
        console.log("res2", res2);
        console.log("res3", res3);
        console.log("res4", res4);
        console.log("res5", res5);
        console.log("res6", res6);


        if (eid) {
            settindangtrongtuan(res1);
            setungvientrongtuan(res2);
            setungvientrongthang(res3);
            settindangtrongthang(res4);
            settindadang(res5);
            setuvdatuyen(res6);
        } else {
            console.log("lối iiiiiiiiiiiiiiiiii");
        }
    }

    return (
        <>
            <div style={{ width: '100%', top: '85px' }}>
                <HeaderEmployer />
            </div>
            <div className="employer-page">
                <div className="employer-page-sidebar">
                    <SideBar />
                </div>

                <div className="employer-page-content">
                    <div className="employer-page-content-info">
                        <img id='emp-avt' src={sessionStorage.getItem("imageE")}/>
                        {/* <img src="https://c.animaapp.com/3RPBHCw2/img/user-png@2x.png" /> */}
                        <div className="employer-page-content-info-name">{name}</div>
                    </div>

                    <div className="employer-page-content-recruitment">
                        <div className="employer-page-content-recruitment-left">
                            <div className="employer-page-content-recruitment-left-item-1">
                                <div className="employer-page-content-recruitment-left-item-content">
                                    {
                                        tindadang > 0 ? <div>{tindadang}</div> : <div>{0}</div>
                                    }
                                    {/* <div>{tindadang}</div> */}
                                    <div>Tin đăng tuyển dụng</div>
                                </div>
                                <div className="employer-page-content-recruitment-left-item-icon">
                                    <i class="fa-regular fa-paper-plane" id="icon-employer-managerment"></i>
                                </div>
                            </div>

                            <div className="employer-page-content-recruitment-left-item-1">
                                <div className="employer-page-content-recruitment-left-item-content">
                                    {
                                        uvdatuyen > 0 ? <div > {uvdatuyen}</div> : <div>{0}</div>
                                    }
                                    {/* <div>{uvdatuyen}</div> */}
                                    <div>Ứng viên đã ứng tuyển</div>
                                </div>
                                <div className="employer-page-content-recruitment-left-item-icon">
                                    <i class="fa-solid fa-person-breastfeeding" id="icon-employer-managerment"></i>
                                </div>
                            </div>

                            <div className="employer-page-content-recruitment-left-item-2">
                                <div className="employer-page-content-recruitment-left-item-time" style={{ marginRight: "30px" }}>
                                    <div>Tuần này</div>
                                    <div>Tháng này</div>
                                </div>
                                <div className="employer-page-content-recruitment-left-item-quantity">
                                    {

                                        tintrongtuan > 0 ? <div>{tintrongtuan} tin</div> : <div>{0} tin</div>
                                    }
                                    {/* <div>{tintrongtuan} tin</div> */}
                                    {
                                        tintrongthang > 0 ? <div>{tintrongthang} tin</div> : <div>{0} tin</div>
                                    }
                                    {/* <div>{tintrongthang} tin</div> */}
                                </div>
                            </div>

                            <div className="employer-page-content-recruitment-left-item-2">
                                <div className="employer-page-content-recruitment-left-item-time">
                                    <div>Tuần này</div>
                                    <div>Tháng này</div>
                                </div>
                                <div className="employer-page-content-recruitment-left-item-quantity">
                                    {
                                        uvtrongtuan > 0 ? <div>{uvtrongtuan} ứng viên</div> : <div>{0} ứng viên</div>
                                    }
                                    {/* <div>{uvtrongtuan} ứng viên</div> */}
                                    {
                                        uvtrongthang > 0 ? <div> {uvtrongthang} ứng viên</div> : <div>{0} ứng viên</div>
                                    }
                                    {/* <div>{uvtrongthang} ứng viên</div> */}
                                </div>
                            </div>

                        </div>

                        <div className="employer-page-content-recruitment-right">
                            <div className="employer-page-content-recruitment-right-notify">
                                <div className="employer-page-content-recruitment-right-notify-title">Thông báo việc làm</div>
                                <div>Chào mừng tham gia cùng chúng tôi</div>
                            </div>

                            <div className="employer-page-content-recruitment-right-care">
                                <div className="employer-page-content-recruitment-right-notify-title">Có thể bạn quan tâm</div>
                            </div>
                        </div>
                    </div>

                    <div className="employer-page-content-choice">
                        <div className="employer-page-content-choice-item">
                            <a className="employer-page-content-choice-item-icon" href="/add-post"><i class="fa-regular fa-paper-plane" id="choice-icon-1"></i></a>
                            <div className="employer-page-content-choice-item-title">Đăng tin tuyển dụng</div>
                        </div>

                        <div className="employer-page-content-choice-item">
                            <a className="employer-page-content-choice-item-icon" href="/post"><i class="fa-regular fa-newspaper" id="choice-icon-2"></i></a>
                            <div className="employer-page-content-choice-item-title">Quản lý bài đăng</div>
                        </div>

                        <div className="employer-page-content-choice-item">
                            <a className="employer-page-content-choice-item-icon" href="/interview-manage"><i class="fa-regular fa-calendar-days" id="choice-icon-3"></i></a>
                            <div className="employer-page-content-choice-item-title">Quản lý lịch phỏng vấn</div>
                        </div>

                        <div className="employer-page-content-choice-item">
                            <a className="employer-page-content-choice-item-icon" href="/candidate-manage"><i class="fa-solid fa-users-gear" id="choice-icon-4"></i></a>
                            <div className="employer-page-content-choice-item-title">Quản lý ứng viên</div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default EmployerPage;