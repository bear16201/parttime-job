import HeaderEmployer from "../../Themes/Header/headerEmployer";
import SideBar from "../MangementPage/sidebar";
import { useState, useEffect } from 'react';
import { GetJobById } from '../../../../Service/userService';
import require_icon from '../../../../Assets/require.png'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import { getjobbyid, updatejob } from '../../../../Service/employService';
import { format } from 'date-fns';
import { getCity } from '../../../../Service/candidateService';
import { GetAllCate, GetAllJobType, GetAllJobTypeByCate } from '../../../../Service/searchService';
import { EditAttributesRounded } from "@mui/icons-material";
function EditPost() {
    const [listjobdt, setListJob] = useState([]);
    const [jobid, setjobid] = useState();
    const [empid, setEid] = useState(sessionStorage.getItem('employerId'));
    let [isEditing, setIsEditing] = useState();
    const [isFormValid, setIsFormValid] = useState(false);
    const currentDate = new Date().toISOString().split('T')[0];
    const [listjobType, setListjobType] = useState([]);
    const [city, setCity] = useState([]);
    const [distric, setDistric] = useState([]);
    const [RegisterRequest, setRegisterRequest] = useState({ city: '', district: '' });
    const [listcate, setlistcate] = useState([]);
    const [NameCity, setNameCity] = useState();
    const [NameDistrict, setNameDistrict] = useState();
    const [loading, Setloading] = useState();
    const [selectedDays, setSelectedDays] = useState([]);
    const tokenE = sessionStorage.getItem("tokenE");
    const [formInputEmp, setFormInput] = useState({
        // "title": "job 4",
        id: jobid,
        title: "",
        employerId: empid,
        description: "",
        salary: "",
        location: "",
        deadline: "",
        createdAt: "2023-11-11T16:03:01.812Z",
        jobTime: "",
        status: 0,
        jobTypeId: 1,
        experient: "",
        numberApply: 0,
        typeJob: 0,
        daywork: "",
        note: "",
        toage: 0,
        levellearn: "",
        fromage: 0,
        welfare: "",
        moredesciption: "",
        typename: "",
        company: "",
        typeSalary: "",
        startdate: "2023-11-11T16:03:01.812Z",
        gender: "",
        enddate: "2023-11-11T16:03:01.812Z",
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
        getCate();
        getJobtype();
        setCityDistrict();
    }, [formInputEmp]);

    useEffect(() => {
        console.log("empid", empid);
        getJobByid(jobid);
    }, [jobid]);

    useEffect(() => {
        const fetchData = async () => {
            const searchParams = new URLSearchParams(window.location.search);
            setjobid(searchParams.get('jobid'));
        };
        fetchData();
    }, []);

    const setCityDistrict = async () => {
        console.log("Dữ liệu mảng setCityDistrict 0oooooooe:", formInputEmp);
        console.log("Dữ liệu mảng city 0oooooooe:", city);
        console.log("Dữ liệu mảng formInputEmp.location.split(',').length 0oooooooe:", formInputEmp.location.split(',').length);
        if (city && formInputEmp.location && formInputEmp.location.length > 0 && formInputEmp.location.split(',').length > 2 && city.length > 0) {
            const addressParts = formInputEmp.location.split(',');
            console.log("addressParts", addressParts);
            setNameCity(addressParts[addressParts.length - 1]);
            setNameDistrict(addressParts[addressParts.length - 2]);
            formInputEmp.location = addressParts[0];
            const selectedCity = city.find((item) => item.name === addressParts[addressParts.length - 1]);
            if (selectedCity) {
                setDistric(selectedCity.districts);
            }
        }
    }

    const getCate = async () => {
        let res = await GetAllCate();
        setlistcate(res);
    }
    const getJobtype = async (typeId) => {
        let res = await GetAllJobType();
        console.log("jobype", res);
        setListjobType(res);
    }
    const getJobtype1 = async (typeId) => {
        let res = await GetAllJobTypeByCate(typeId);
        console.log("GetAllJobTypeByCate", res);
        setListjobType(res);
    }

    const handleEmployInput = (name, value) => {
        // Cập nhật giá trị vào đối tượng formInputEmp
        setFormInput((prevFormInputEmp) => ({
            ...prevFormInputEmp,
            [name]: value,
        }));
        if (formInputEmp.typeJob !== 0) {
            formInputEmp.daywork = getSelectedDaysString();
        }
        console.log("formInputEmp.daywork", formInputEmp.daywork);
        console.log("formInputEmp", formInputEmp)
    };


    let getJobByid = async (jobid) => {
        let res = await getjobbyid(jobid,tokenE);
        let res1 = await getCity(3);
        console.log("City", res1);
        setCity(res1);
        console.log("em", res);
        console.log("forminput", formInputEmp);
        setListJob(res);
        setIsEditing(jobid);
        if (res[0]) {
            setFormInput({
                id: jobid,
                title: res[0].title,
                employerId: res[0].empid,
                description: res[0].description,
                salary: res[0].salary,
                location: res[0].location,
                deadline: res[0].deadline,
                createdAt: res[0].createdAt,
                jobTime: res[0].jobTime,
                status: res[0].status,
                jobTypeId: res[0].jobTypeId,
                experient: res[0].experient,
                company: res[0].company,
                numberApply: res[0].numberApply,
                typeJob: res[0].typeJob,
                daywork: res[0].daywork,
                note: res[0].note,
                toage: res[0].toage,
                levellearn: res[0].levellearn,
                fromage: res[0].fromage,
                welfare: res[0].welfare,
                moredesciption: res[0].moredesciption,
                typename: res[0].typename,
                typeSalary: res[0].typeSalary,
                startdate: res[0].startdate,
                gender: res[0].gender,
                enddate: res[0].enddate,
            });
            console.log("Dữ liệu mảng:", formInputEmp);
            try {
                setSelectedDays(res[0].daywork.split(','));
            } catch {

            }

        } else {
            console.log("loi o day");
        }
        console.log("Dữ liệu mảng:", res);
    }
    const handleEmployInput1 = (name, value) => {
        // Cập nhật giá trị vào đối tượng formInputEmp
        setFormInput((prevFormInputEmp) => ({
            ...prevFormInputEmp,
            [name]: value,
        }));
        console.log("Cate", value);
        getJobtype1(value);
    };
    const handleEmployInput2 = (name, value) => {
        setFormInput((prevFormInputEmp) => ({
            ...prevFormInputEmp,
            [name]: value,
        }));
    };
    const handleChange1 = async (e) => {
        const { name, value } = e.target;
        await setRegisterRequest({ ...RegisterRequest, [name]: value });
        setNameCity(value);
        const selectedCity = city.find((item) => item.name === value);
        if (selectedCity) {
            setDistric(selectedCity.districts);
        }
        console.log("Updated districts", distric);
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        await setRegisterRequest({ ...RegisterRequest, [name]: value });
        setNameDistrict(value);
    };
    const checkTime = (time) => {
        const timeRegex = /^([0-9]|1[0-9]|2[0-3])h([0-9]|1[0-9]|2[0-3])h$/;

        // Kiểm tra xem thời gian có khớp với định dạng không
        if (timeRegex.test(time)) {
            return true;
        } else {
            return false;
        }
    }
    const handleUpdateJob = async () => {
        console.log("nhay update");
        if (checkTime(formInputEmp.jobTime)) {
            console.log("Invalid form");
            toast.error("Điền lại thông tin thời gian làm! Sai mẫu");
            return;
        }
        if (formInputEmp.typeJob !== 0) {
            formInputEmp.daywork = getSelectedDaysString();
        }
        formInputEmp.location = formInputEmp.location + "," + NameDistrict + "," + NameCity;
        console.log("formInputEmp.location", formInputEmp.location);
        console.log("formInputEmp.location", formInputEmp);
        let up = await updatejob(formInputEmp);
        console.log("updatejob", up);
        if (up) {
            setFormInput(formInputEmp);
            toast.success("Lưu thông tin cá nhân thành công emp");
        }
    }

    const handleEmployInputx = (name, value) => {
        const updatedDays = selectedDays.includes(value)
            ? selectedDays.filter(day => day !== value)
            : [...selectedDays, value];

        setSelectedDays(updatedDays);
        formInputEmp.daywork = getSelectedDaysString();

    };

    const getSelectedDaysString = () => {
        return selectedDays.join(',');
    };
    return (
        <>
            <HeaderEmployer />

            {listjobdt && listjobdt.length > 0 && listjobdt.map((item, index) => {
                return (
                    <form>
                        <div className="employer-page">
                            <div className="create-post-content">
                                <div className="create-post">
                                    <div className="create-post-top">Xem lại bài đăng</div>
                                    <div className="create-post-title">Tên cửa hàng/Công ty<img id='require-icon' src={require_icon} alt="" /></div>
                                    <Form.Control
                                        id="create-post-title"
                                        type="text"
                                        placeholder="Bơ Bán Bò"
                                        name="company"
                                        value={formInputEmp.company}
                                    />
                                </div>

                                <div className="create-post-info">
                                    <div>
                                        <div className="create-post-title">Tiêu đề tin tuyển dụng<img id='require-icon' src={require_icon} alt="" /></div>
                                        <Form.Control
                                            id="create-post-title"
                                            type="text"
                                            placeholder="Nhân viên bán hàng"
                                            name="title"
                                            value={formInputEmp.title}
                                        />
                                    </div>
                                    <div className="create-post-info-job">
                                        <div className="create-post-info-job-left">
                                            <div className="create-post-title">Ngành nghề đăng tuyển<img id='require-icon' src={require_icon} alt="" /></div>
                                            <Form.Select aria-label="Default select example"
                                                id="create-post-select"
                                                name="typename"
                                                required
                                            >
                                                <option id='home-tiltle' style={{ display: "none", color: "#444" }}>Các ngành nghề</option>
                                                {listcate && listcate.length > 0 &&
                                                    listcate.map((item1, index1) => {
                                                        return (
                                                            item1.id == formInputEmp.typename ? (
                                                                <option selected value={item1.id}>
                                                                    {item1.name}
                                                                </option>
                                                            ) : (
                                                                <option value={item1.id}>
                                                                    {item1.name}
                                                                </option>
                                                            )
                                                        )
                                                    })}
                                            </Form.Select>
                                            <div className="create-post-title">Loại công việc<img id='require-icon' src={require_icon} alt="" /></div>
                                            <Form.Select aria-label="Default select example"
                                                id="create-post-select"
                                                name="jobTypeId"
                                                required
                                            >
                                                <option id='home-tiltle' style={{ display: "none", color: "#444" }}>Loại công việc</option>
                                                {listjobType && listjobType.length > 0 &&
                                                    listjobType.map((item1, index1) => {
                                                        return (
                                                            item1.id === formInputEmp.jobTypeId ? (
                                                                <option selected value={item1.id}>
                                                                    {item1.nameType}
                                                                </option>
                                                            ) : (
                                                                <option value={item1.id}>
                                                                    {item1.nameType}
                                                                </option>
                                                            )

                                                        )
                                                    })}
                                            </Form.Select>
                                            <div className="create-post-choose-role">
                                                <div className="create-post-title">Mức lương<img id='require-icon' src={require_icon} alt="" /></div>
                                                <div className="create-post-role">
                                                    <div className="create-post-role-radio"><input type="text" name="salary" 
                                                        placeholder=""
                                                        value={formInputEmp.salary}
                                                    />
                                                        <div className="create-post-role">
                                                            <div className="create-post-role-radio"><input type="radio"
                                                                name="typeSalary"                                                                
                                                                checked={formInputEmp.typeSalary === "Giờ"}
                                                                value="Giờ"
                                                            />Giờ</div>
                                                            <div className="create-post-role-radio"><input type="radio"
                                                                name="typeSalary"
                                                                checked={formInputEmp.typeSalary === "Ngày"}
                                                                value="Ngày"
                                                            />Ngày</div>
                                                            <div className="create-post-role-radio"><input type="radio"
                                                                name="typeSalary"
                                                                checked={formInputEmp.typeSalary === "Tháng"}
                                                                value="Tháng"
                                                            />Tháng</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="create-post-title">Tỉnh/Thành phố<img id='require-icon' src={require_icon} alt="" /></div>
                                                <Form.Select aria-label="Default select example" id="create-post-select"
                                                    name="city"
                                                    value={NameCity}
                                                    required
                                                >
                                                    <option style={{ display: "none" }}>Chọn Tỉnh/Thành Phố</option>
                                                    {city && city.length > 0 &&
                                                        city.map((item1, index1) => {
                                                            return (
                                                                item1.name === NameCity ? (
                                                                    <option selected value={item1.name}>
                                                                        {item1.name}
                                                                    </option>
                                                                ) : (
                                                                    <option value={item1.name}>
                                                                        {item1.name}
                                                                    </option>
                                                                )
                                                            )
                                                        })}
                                                </Form.Select>
                                                <div className="create-post-title">Quận/Huyện<img id='require-icon' src={require_icon} alt="" /></div>
                                                <Form.Select aria-label="Default select example" id="create-post-select"
                                                    name="district"
                                                    value={NameDistrict}
                                                    required
                                                >
                                                    <option style={{ display: "none" }}>Chọn Quận/Huyện</option>
                                                    {distric && distric.length > 0 &&
                                                        distric.map((item1, index1) => {
                                                            return (
                                                                item1.name === NameDistrict ? (
                                                                    <option value={item1.name}>
                                                                        {item1.name}
                                                                    </option>
                                                                ) : (
                                                                    <option value={item1.name}>
                                                                        {item1.name}
                                                                    </option>
                                                                )

                                                            )
                                                        })}
                                                </Form.Select>
                                            </div>
                                        </div>
                                        <div className="create-post-info-job-right">
                                            <div>
                                                <div className="create-post-title">Số lượng<img id='require-icon' src={require_icon} alt="" /></div>
                                                <Form.Control
                                                    id="create-post-title"
                                                    type="number"
                                                    name="numberApply"
                                                    value={formInputEmp.numberApply}
                                                    placeholder="Nhập số lượng tuyển dụng"
                                                />
                                            </div>

                                            <div className="create-post-choose-role">
                                                <div className="create-post-title">Loại hình công việc<img id='require-icon' src={require_icon} alt="" /></div>
                                                <div className="create-post-role">
                                                    <div className="create-post-role-radio"><input type="radio"
                                                        name="typeJob"
                                                        value={0} checked={formInputEmp.typeJob === 0}
                                                    /> Trong ngày</div>
                                                    <div className="create-post-role-radio"><input type="radio"
                                                        name="typeJob"
                                                        value={1} checked={formInputEmp.typeJob === 1}
                                                    />Ngắn hạn(Trong 1 tuần-1 tháng)</div>
                                                    <div className="create-post-role-radio"><input type="radio"
                                                        name="typeJob"
                                                        checked={formInputEmp.typeJob === 2}
                                                        value={2}
                                                    />Dài hạn(Trên 1 tháng)</div>
                                                </div>
                                            </div>
                                            {formInputEmp.typeJob === 0 ? (
                                                <div className="create-post-choose-role">
                                                    <div className="create-post-title">Ngày làm<img id='require-icon' src={require_icon} alt="" /></div>
                                                    <Form.Control
                                                        placeholder="yyyy/MM/dd"
                                                        id="datemain"
                                                        type="date"
                                                        name="daywork"
                                                        min={currentDate}
                                                        value={formInputEmp.daywork.includes(",") ? '' : format(new Date(formInputEmp.daywork), 'yyyy-MM-dd')}
                                                        required
                                                    />
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="create-post-title">Ngày làm việc trong tuần<img id='require-icon' src={require_icon} alt="" /></div>
                                                    <div className="create-post-role">
                                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(day => (
                                                            <div key={day} className="create-post-role-radio">
                                                                <input
                                                                    type="checkbox"
                                                                    name="daywork"
                                                                    value={day}
                                                                    checked={selectedDays.includes(day.toString())}
                                                                />
                                                                {day === 1 ? 'Tất cả' : day === 8 ? 'Chủ nhất' : `Thứ ${day}`}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="create-post-title">Ngày bắt đầu làm<img id='require-icon' src={require_icon} alt="" /></div>
                                                    <Form.Control
                                                        placeholder="dd/MM/YYYY"
                                                        id="datemain"
                                                        type="date"
                                                        name="startdate"
                                                        min={currentDate}
                                                        value={format(new Date(formInputEmp.startdate), 'yyyy-MM-dd')}
                                                        required
                                                    />
                                                    <div className="create-post-title">Ngày kết thúc làm<img id='require-icon' src={require_icon} alt="" /></div>
                                                    <Form.Control
                                                        placeholder="dd/MM/YYYY"
                                                        id="datemain"
                                                        type="date"
                                                        name="enddate"
                                                        min={currentDate}
                                                        value={format(new Date(formInputEmp.enddate), 'yyyy-MM-dd')}
                                                        required
                                                    />
                                                </div>
                                            )}
                                            <div className="create-post-choose-role">
                                                <div className="create-post-title">Nhập thời gian làm việc trong ngày: 6h-9h<img id='require-icon' src={require_icon} alt="" /></div>
                                                <div className="create-post-role">
                                                    <Form.Control
                                                        id="create-post-title"
                                                        type="text"
                                                        placeholder="7h-10h và 14h-17"
                                                        name="jobTime"
                                                        value={formInputEmp.jobTime}
                                                    />
                                                </div>
                                            </div>

                                            <div className="create-post-choose-role">
                                                <div className="create-post-title">Thời hạn đăng tuyển<img id='require-icon' src={require_icon} alt="" /></div>
                                                <Form.Control
                                                    placeholder="yyyy/MM/dd"
                                                    id="datemain"
                                                    type="date"
                                                    name="deadline"
                                                    min={currentDate}
                                                    value={format(new Date(formInputEmp.deadline), 'yyyy-MM-dd')}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>

                                        <div className="create-post-title">Địa chỉ cụ thể<img id='require-icon' src={require_icon} alt="" /></div>
                                        <Form.Control
                                            id="create-post-des"
                                            type="text"
                                            name="location"
                                            value={formInputEmp.location}
                                            placeholder="Số 10 Phạm Hùng"
                                        />
                                    </div>
                                </div>

                                <div className="create-post-info">
                                    <div className="create-post-title">Ghi chú <img id='require-icon' src={require_icon} alt="" /></div>
                                    <Form.Control
                                        id="create-post-title"
                                        type="text"
                                        name="note"
                                        value={formInputEmp.note}
                                        placeholder="Ghi chú"
                                    />

                                    <div className="create-post-title">Mô tả công việc <img id='require-icon' src={require_icon} alt="" /></div>
                                    <Form.Control
                                        id="create-post-des"
                                        type="text"
                                        value={formInputEmp.description}
                                        name="description"
                                        placeholder="Mô tả công việc"
                                    />
                                </div>
                                <div className="create-post-gender">
                                    <div className="create-post-info-job">
                                        <div className="create-post-info-job-left">
                                            <div className="create-post-choose-role">
                                                <div className="create-post-title">Giới tính <span>(Để trống nếu không yêu cầu)</span></div>
                                                <div className="create-post-role">
                                                    <div className="create-post-role-radio"><input type="radio"
                                                        name="gender"
                                                        checked={formInputEmp.gender === "Nam"}
                                                        value="Nam"
                                                    />Nam</div>
                                                    <div className="create-post-role-radio"><input type="radio"
                                                        name="gender"
                                                        checked={formInputEmp.gender === "Nữ"}
                                                        value="Nữ"
                                                    />Nữ</div>
                                                    <div className="create-post-role-radio"><input type="radio"
                                                        name="gender"
                                                        checked={formInputEmp.gender === "Bất kỳ"}
                                                        value="Bất kỳ"
                                                    />Không yêu cầu</div>
                                                </div>
                                            </div>

                                            <div className="create-post-title">Trình độ học vấn <span>(Để trống nếu không yêu cầu)</span></div>
                                            <Form.Select aria-label="Default select example"
                                                id="create-post-select"
                                                name="levellearn"
                                                value={formInputEmp.levellearn}>
                                                <option style={{ display: "none" }}>Chọn trình để học vấn</option>
                                                <option value="Chưa tốt nghiệp THPT">Chưa tốt nghiệp THPT</option>
                                                <option value="Tốt nghiệp THPT">Tốt nghiệp THPT</option>
                                                <option value="Tốt nghiệp Trung Cấp">Tốt nghiệp Trung Cấp</option>
                                                <option value="Tốt nghiệp Cao Đẳng">Tốt nghiệp Cao Đẳng</option>
                                                <option value="Tốt nghiệp Đại học">Tốt nghiệp Đại học</option>
                                                <option value="Trên Đại học">Trên Đại học</option>
                                            </Form.Select>
                                        </div>

                                        <div className="create-post-info-job-right">
                                            <div className="create-post-choose-role">
                                                <div className="create-post-title">Độ tuổi <span>(Để trống nếu không yêu cầu)</span></div>
                                                <div className="create-post-role">
                                                    <div className="create-post-role-radio">
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Text htmlFor="toage" id="basic-addon1">Từ</InputGroup.Text>
                                                            <Form.Control
                                                                id="toage"
                                                                type="number"
                                                                name="toage"
                                                                value={formInputEmp.toage}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                    <div className="create-post-role-radio">
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Text htmlFor="fromage" id="basic-addon1">Đến</InputGroup.Text>
                                                            <Form.Control
                                                                id="fromage"
                                                                type="number"
                                                                name="fromage"
                                                                value={formInputEmp.fromage}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="create-post-choose-role">
                                                <div className="create-post-title">Kinh nghiệm <span>(Để trống nếu không yêu cầu)</span></div>
                                                <div className="create-post-experient">
                                                    <div className="create-post-experient-right">
                                                        <Form.Select aria-label="Default select example"
                                                            id="create-post-select"
                                                            name="experient"
                                                            value={formInputEmp.experient}
                                                        >
                                                            <option value="Không yêu cầu" style={{ display: "none" }}>Chọn yêu cầu kinh nghiệm</option>
                                                            <option value="Có kinh nghiệm">Có kinh nghiệm</option>
                                                            <option value="Có kinh nghiệm trên 6 tháng">Có kinh nghiệm trên 6 tháng</option>
                                                            <option value="Có kinh nghiệm trên 1 năm">Có kinh nghiệm trên 1 năm</option>
                                                            <option value="Có kinh nghiệm trên 2 năm">Có kinh nghiệm trên 2 năm</option>
                                                            <option value="Đã từng làm">Đã từng làm</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="create-post-title">Phúc lợi</div>
                                    <Form.Control
                                        id="create-post-title"
                                        type="text"
                                        name="welfare"
                                        value={formInputEmp.welfare}
                                        placeholder="Ghi chú"
                                    />
                                    <div className="create-post-title">Yêu cầu thêm</div>
                                    <Form.Control
                                        id="create-post-des"
                                        type="text"
                                        value={formInputEmp.moredesciption}
                                        placeholder="Mô tả công việc"
                                    />

                                </div>
                            </div>

                            <div>
                                <Button style={{ translate: 735 }} id="create-post-btn" href="/post?to=3" variant="info">Quay lại</Button>
                                <ToastContainer />
                            </div>
                        </div>

                    </form>
                )
            })}
        </>
    )
}

export default EditPost;