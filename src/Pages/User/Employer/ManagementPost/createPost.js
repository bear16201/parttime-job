import Header from "../../Themes/Header/header";
import require_icon from '../../../../Assets/require.png'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useEffect } from "react";
import { createPost, createPosttinhanp } from '../../../../Service/employService'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import HeaderEmployer from "../../Themes/Header/headerEmployer";
import { getCity } from '../../../../Service/candidateService';
import { GetAllCate, GetAllJobType, GetAllJobTypeByCate } from '../../../../Service/searchService';
import { eachDayOfInterval } from 'date-fns';
function formatCurrency(value){
    console.log("value",value);
    return value.toLocaleString('vi-VN');

  };
function CreatePost() {
    const [empid, setEid] = useState(sessionStorage.getItem('employerId'));
    const [isAccepted, setIsAccepted] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isFormValidNhap, setIsFormValidNhap] = useState(false);
    const currentDate = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDate1, setSelectedDate1] = useState(new Date());
    const navigate = useNavigate();
    const [listjobType, setListjobType] = useState([]);
    const [city, setCity] = useState([]);
    const [distric, setDistric] = useState([]);
    const [RegisterRequest, setRegisterRequest] = useState({ city: '', district: '' });
    const [listcate, setlistcate] = useState([]);
    const [loading, Setloading] = useState();
    const [dayNumbers, setdayNumbers] = useState([]);
    // const [isInitialDay1, setisInitialDay1] = useState(false);
    const formatCurrency = (value) => {
        return value.toLocaleString('vi-VN');
    };
    const [validInput, setValidInput] = useState(true);
    const [fieldErrors, setFieldErrors] = useState({});
    const tokenE = localStorage.getItem("tokenE");
    console.log("localStorage.getItem", tokenE);
    const [formInputEmp, setFormInput] = useState({
        // "title": "job 4",
        title: "",
        employerId: empid,
        description: "",
        salary: "",
        location: "",
        deadline: "2023-12-28T16:03:01.812Z",
        createdAt: "2023-12-28T16:03:01.812Z",
        jobTime: "",
        status: 0,
        jobTypeId: 1,
        experient: "Không yêu cầu",
        numberApply: 0,
        typeJob: 0,
        daywork: "2023-12-28T16:03:01.812Z",
        note: "",
        toage: 0,
        levellearn: "Không yêu cầu",
        fromage: 0,
        welfare: "",
        moredesciption: "",
        typename: 0,
        company: "",
        typeSalary: "",
        startdate: "2023-12-28T16:03:01.812Z",
        gender: "",
        enddate: "2023-12-28T16:03:01.812Z",
    });

    useEffect(() => {
        // const employid = sessionStorage.getItem("employId");
        console.log("empid", empid);
    }, []);

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
    }, [loading]);
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

    const handleChange1 = async (e) => {
        const { name, value } = e.target;
        await setRegisterRequest({ ...RegisterRequest, [name]: value });
        const selectedCity = city.find((item) => item.name === value);
        if (selectedCity) {
            setDistric(selectedCity.districts);
        }
        console.log("Updated districts", distric);
    };

    // useEffect(() => {
    //     if (formInputEmp.company.length > 5) {
    //       setError('Văn bản vượt quá giới hạn ký tự.');
    //     } else {
    //       setError('');
    //     }
    //   }, [formInputEmp, error]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        await setRegisterRequest({ ...RegisterRequest, [name]: value });
    };
    // const handleEmployInput = (name, value) => {
    //     setFormInput({ ...formInputEmp, [name]: value });
    // };

    // const dayNumbers = null;
    const handleEmployInput = (name, value) => {
        const updatedFormInputEmp = {
            ...formInputEmp,
            [name]: value
        };
        let updatedFieldErrors = { ...fieldErrors };

        if (name === 'enddate') {
            const startDate = new Date(formInputEmp.startdate);
            const endDate = new Date(value);
            const daysInRange1 = eachDayOfInterval({ start: startDate, end: endDate });
            setdayNumbers(daysInRange1.map(day => day.getDay() === 0 ? 7 : day.getDay())); // Chuyển 0 (Chủ nhật) thành 7
            console.log("setdayNumbers", dayNumbers);
        }
        if (name === 'startdate') {
            if (formInputEmp.typeJob === 2) {
                const currentDate = new Date(value);
                currentDate.setMonth(currentDate.getMonth() + 1);
                const maxDate = currentDate.toISOString().split('T')[0];
                // const newDate = addMonths(startDate, 1);
                setSelectedDate(maxDate);
            } else if (formInputEmp.typeJob === 1) {
                // const newDate = addDays(startDate, 1);
                // const newDate1 = addMonths(startDate, 1);
                const currentDate = new Date(value);
                const currentDate1 = new Date(value);
                currentDate.setMonth(currentDate.getMonth() + 1);
                currentDate1.setDate(currentDate1.getDate() + 1);
                const maxDate = currentDate.toISOString().split('T')[0];
                const maxDate1 = currentDate1.toISOString().split('T')[0];
                setSelectedDate(maxDate);
                setSelectedDate1(maxDate1);
                console.log("setSelectedDate", maxDate);
                console.log("setSelectedDate1", maxDate1);
            }
        }
        if (name === 'typeJob') {
            if (value === 2) {
                const currentDate = new Date(formInputEmp.startdate);
                currentDate.setMonth(currentDate.getMonth() + 1);
                const maxDate = currentDate.toISOString().split('T')[0];
                // const newDate = addMonths(startDate, 1);
                setSelectedDate(maxDate);
            } else if (value === 1) {
                // const newDate = addDays(startDate, 1);
                // const newDate1 = addMonths(startDate, 1);
                const currentDate = new Date(formInputEmp.startdate);
                const currentDate1 = new Date(formInputEmp.startdate);
                currentDate.setMonth(currentDate.getMonth() + 1);
                currentDate1.setDate(currentDate1.getDate() + 1);
                const maxDate = currentDate.toISOString().split('T')[0];
                const maxDate1 = currentDate1.toISOString().split('T')[0];
                setSelectedDate(maxDate);
                setSelectedDate1(maxDate1);
                console.log("setSelectedDate", maxDate);
                console.log("setSelectedDate1", maxDate1);
            }
        }
        if ((name === 'description' || name === 'moredesciption') && value.length > 500) {
            updatedFieldErrors[name] = 'Văn bản vượt quá giới hạn ký tự.';
            setValidInput(false);
        } else if ((name === 'title' || name === "note" || name === 'location' || name === 'jobTime'
            || name === 'company' || name === 'welfare') && value.length > 80) {
            updatedFieldErrors[name] = 'Văn bản vượt quá giới hạn ký tự.';
            setValidInput(false);
        }
        else if ((name === '' || name === "" || name === '' || name === ''
            || name === '' || name === '')) {
            updatedFieldErrors[name] = 'Không thế để trống';
            setValidInput(false);
        }
        else if (name === 'fromage' && (parseInt(value) <= parseInt(formInputEmp.toage))) {
            updatedFieldErrors[name] = 'Giá trị "Đến" phải lớn hơn giá trị "Từ".';
            setValidInput(false);
        } else if (name === "salary" && value.length > 9) {
            updatedFieldErrors[name] = 'Văn bản vượt quá giới hạn ký tự.';
            setValidInput(false);
        } else if (name === "numberApply" && value.length > 3) {
            updatedFieldErrors[name] = 'Văn bản vượt quá giới hạn ký tự.';
            setValidInput(false);
        }
        else if ((name === "fromage" || name === "toage") && value.length > 2) {
            updatedFieldErrors[name] = 'Tuổi vượt quá giới hạn ký tự.';
            setValidInput(false);
        } else if ((name === "fromage" || name === "toage") && value < 15) {
            updatedFieldErrors[name] = 'Độ tuổi tối thiểu là 15 tuổi.';
            setValidInput(false);
        }
        else {
            setValidInput(true);
            delete updatedFieldErrors[name];
        }
        console.log("updatedFieldErrors", updatedFieldErrors);
        setFieldErrors(updatedFieldErrors);

        if (name === 'fromage') {
            setFormInput(updatedFormInputEmp);
        }
        if (name === 'toage') {
            setFormInput(updatedFormInputEmp);
        }
        if (Object.keys(updatedFieldErrors).length === 0 && validInput) {
            setFormInput(updatedFormInputEmp);
        }

    };
    const handleEmployInput1 = (name, value) => {
        // Cập nhật giá trị vào đối tượng formInputEmp
        setFormInput((prevFormInputEmp) => ({
            ...prevFormInputEmp,
            [name]: value,
        }));
        console.log("Cate", value);

        getJobtype1(value);
    };
    useEffect(() => {
        const isFormValid =
            formInputEmp.title !== "" &&
            formInputEmp.description !== "" &&
            formInputEmp.welfare !== "" &&
            formInputEmp.employerId !== null &&
            formInputEmp.salary !== "" &&
            formInputEmp.location !== "" &&
            formInputEmp.deadline !== null &&
            formInputEmp.createdAt !== "" &&
            formInputEmp.jobTime !== "" &&
            formInputEmp.status !== null &&
            formInputEmp.jobTypeId !== null &&
            formInputEmp.numberApply !== 0 &&
            formInputEmp.daywork !== "" &&
            formInputEmp.note !== "" &&
            formInputEmp.toage !== null &&
            formInputEmp.fromage !== null &&
            formInputEmp.typename !== null &&
            formInputEmp.company !== "" &&
            formInputEmp.typeSalary !== "" &&
            formInputEmp.startdate !== null &&
            formInputEmp.enddate !== null;

        setIsFormValid(isFormValid);

        const isFormValid1 =
            formInputEmp.title !== "";

        setIsFormValidNhap(isFormValid1);

        if (formInputEmp.typeJob !== 0) {
            formInputEmp.daywork = getSelectedDaysString();
        }
        console.log("formInputEmp.daywork", formInputEmp.daywork);
        console.log("formInputEmp", formInputEmp);

    }, [formInputEmp]);

    const handleSubmitinnhap = async (event) => {
        if (!isFormValidNhap) {
            console.log("Invalid form");
            // navigate("/add-post");
            toast.error("Tin nháp phải có tên tiêu đề");
            return;
        }
        formInputEmp.status = 4;
        event.preventDefault();
        try {
            if (formInputEmp.location && formInputEmp.location.length > 0) {
                formInputEmp.location = formInputEmp.location + "," + RegisterRequest.district + "," + RegisterRequest.city
                console.log("formInputEmp.location", formInputEmp.location);
            }
            else {
                formInputEmp.location = RegisterRequest.district + "," + RegisterRequest.city
            }
            console.log("formInputEmp", formInputEmp);
            const creatPostNew = await createPosttinhanp(formInputEmp, tokenE);
            console.log("newpostnhap", creatPostNew);

            if (creatPostNew) {
                setFormInput(formInputEmp);
                //toast.success("Tạo công việc thành công!");
                navigate("/post?tinnhap=1");
            } else {
                console.log("API call failed");
                toast.error("Đã xảy ra lỗi trong quá trình tạo công việc!");
            }
        } catch (error) {
            console.log("API call error:", error);
            toast.error("Đã xảy ra lỗi trong quá trình tạo công việc!");
        }
    }
    const isValidJobTime = (jobtime) => {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng
        const regex = /^(0[0-9]|1[0-9]|2[0-3])h-(0[0-9]|1[0-9]|2[0-3])h$/;
        return regex.test(jobtime);
    };
    const handleSubmit = async (event) => {

        event.preventDefault();
        if (isValidJobTime(isFormValid.jobTime)) {
            console.log("Invalid form");
            navigate("/add-post");
            toast.error("Vui lòng nhập đúng định dạng thời gian làm việc");
            return;
        }
        if (!isFormValid) {
            console.log("Invalid form");
            // navigate("/add-post");
            toast.error("Vui lòng điền đầy đủ thông tin!");
            return;
        } else {
            try {
                if (formInputEmp.location && formInputEmp.location.length > 0) {
                    formInputEmp.location = formInputEmp.location + "," + RegisterRequest.district + "," + RegisterRequest.city
                    console.log("formInputEmp.location", formInputEmp.location);
                }
                else {
                    formInputEmp.location = RegisterRequest.district + "," + RegisterRequest.city
                }
                console.log("formInputEmp", formInputEmp);
                const creatPostNew = await createPost(formInputEmp, tokenE);
                console.log("creatPostNew", creatPostNew);

                if (creatPostNew) {
                    setFormInput(creatPostNew);
                    //toast.success("Tạo công việc thành công!");

                    navigate("/post?toast=1");
                } else {
                    console.log("API call failed");
                    toast.error("Đã xảy ra lỗi trong quá trình tạo công việc!");
                }
            } catch (error) {
                console.log("API call error:", error);
                toast.error("Đã xảy ra lỗi trong quá trình tạo công việc!");
            }
        }
    };

    const [selectedDays, setSelectedDays] = useState([]);

    const handleEmployInputx = (name, value) => {
        const updatedDays = selectedDays.includes(value)
            ? selectedDays.filter(day => day !== value)
            : [...selectedDays, value];

        setSelectedDays(updatedDays);
    };

    const getSelectedDaysString = () => {
        return selectedDays.join(',');
    };

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }
    );

    console.log("VN", VND.format("200454"))
    // Tạo mảng chứa các ngày trong khoảng thời gian từ startDate đến endDate

    return (
        <>
            <HeaderEmployer />
            <div className="employer-page">
                <div className="create-post-content">
                    <div className="create-post-info">
                        <div className="create-post-top">Tạo bài đăng</div>
                        {/* <div className="create-post-choose-role"> */}
                        <div className="create-post-title">Tên cửa hàng/Công ty<img id='require-icon' src={require_icon} alt="" /></div>

                        <Form.Control
                            id="create-post-title"
                            type="text"
                            maxLength={50}
                            placeholder="Bơ Bán Bò"
                            name="company"
                            onChange={({ target }) => {
                                handleEmployInput(target.name, target.value);
                            }}
                            value={formInputEmp.company}
                        />
                        {fieldErrors.company && <p style={{ color: 'red' }}>{fieldErrors.company}*</p>}
                        {/* </div> */}
                    </div>
                    <div className="create-post-info">
                        <div>
                            <div className="create-post-title">Tiêu đề tin tuyển dụng<img id='require-icon' src={require_icon} alt="" /></div>
                            <Form.Control
                                id="create-post-title"
                                type="text"
                                placeholder="Nhân viên bán hàng"
                                name="title"
                                onChange={({ target }) => {
                                    handleEmployInput(target.name, target.value);
                                }}
                                value={formInputEmp.title}

                            />
                            {fieldErrors.title && <p style={{ color: 'red' }}>{fieldErrors.title}*</p>}
                        </div>
                        <div className="create-post-info-job">
                            <div className="create-post-info-job-left">
                                <div className="create-post-title">Ngành nghề đăng tuyển<img id='require-icon' src={require_icon} alt="" /></div>
                                <Form.Select aria-label="Default select example"
                                    id="create-post-select"
                                    name="typename"
                                    onChange={({ target }) => {
                                        handleEmployInput1(target.name, target.value);
                                    }}
                                    required
                                >
                                    <option id='home-tiltle' style={{ display: "none", color: "#444" }}>Các ngành nghề</option>
                                    {listcate && listcate.length > 0 &&
                                        listcate.map((item1, index1) => {
                                            return (
                                                <option value={item1.id}>
                                                    {item1.name}
                                                </option>
                                            )
                                        })}
                                </Form.Select>
                                <div className="create-post-title">Loại công việc<img id='require-icon' src={require_icon} alt="" /></div>
                                <Form.Select aria-label="Default select example"
                                    id="create-post-select"
                                    name="jobTypeId"
                                    onChange={({ target }) => {
                                        handleEmployInput(target.name, target.value);
                                    }}
                                    required
                                >
                                    <option id='home-tiltle' style={{ display: "none", color: "#444" }}>Loại công việc</option>
                                    {listjobType && listjobType.length > 0 &&
                                        listjobType.map((item1, index1) => {
                                            return (
                                                <option value={item1.id}>
                                                    {item1.nameType}
                                                </option>
                                            )
                                        })}
                                </Form.Select>
                                <div className="create-post-choose-role">
                                    <div className="create-post-title">Mức lương<img id='require-icon' src={require_icon} alt="" /></div>
                                    <div className="create-post-role">
                                        <div className="create-post-role-radio">
                                            <input type="number" name="salary"
                                                onKeyPress={(event) => {
                                                    const keyCode = event.which || event.keyCode;
                                                    const invalidCharacters = /[^0-9]/;

                                                    if (keyCode !== 8 && keyCode !== 0 && invalidCharacters.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                onChange={({ target }) => {
                                                    let value = target.value;
                                                    // Loại bỏ số 0 ban đầu nếu có
                                                    if (value.length > 0 && value[0] === '0') {
                                                        value = value.slice(1);
                                                    }

                                                    // Kiểm tra và không cho phép giá trị âm
                                                    if (value < 0) {
                                                        value = '';
                                                    }
                                                    handleEmployInput(target.name, value);
                                                }}
                                                placeholder=""
                                                value={formatCurrency(formInputEmp.salary)}
                                            />
                                            {fieldErrors.salary && <p style={{ color: 'red' }}>{fieldErrors.salary}*</p>}
                                            <div className="create-post-role">
                                                <div className="create-post-role-radio"><input type="radio"
                                                    name="typeSalary"
                                                    onChange={({ target }) => {
                                                        handleEmployInput(target.name, target.value);
                                                    }}
                                                    checked={formInputEmp.typeSalary === "Giờ"}
                                                    value="Giờ"
                                                />Giờ</div>
                                                <div className="create-post-role-radio"><input type="radio"
                                                    name="typeSalary"
                                                    onChange={({ target }) => {
                                                        handleEmployInput(target.name, target.value);
                                                    }}
                                                    checked={formInputEmp.typeSalary === "Ngày"}
                                                    value="Ngày"
                                                />Ngày</div>
                                                <div className="create-post-role-radio"><input type="radio"
                                                    name="typeSalary"
                                                    onChange={({ target }) => {
                                                        handleEmployInput(target.name, target.value);
                                                    }}
                                                    disabled={formInputEmp.typeJob === 2 ? false : true}
                                                    checked={formInputEmp.typeSalary === "Tháng"}
                                                    value="Tháng"
                                                />Tháng</div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="create-post-title">Tỉnh/Thành phố<img id='require-icon' src={require_icon} alt="" /></div>
                                    <Form.Select aria-label="Default select example"
                                        id="create-post-select"
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
                                    <div className="create-post-title">Quận/Huyện<img id='require-icon' src={require_icon} alt="" /></div>
                                    <Form.Select aria-label="Default select example"
                                        id="create-post-select"
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
                            </div>
                            <div className="create-post-info-job-right">
                                <div>
                                    <div className="create-post-title">Số lượng người tuyển<img id='require-icon' src={require_icon} alt="" /></div>
                                    <Form.Control
                                        id="create-post-title"
                                        type="number"
                                        name="numberApply"
                                        onKeyPress={(event) => {
                                            const keyCode = event.which || event.keyCode;
                                            const invalidCharacters = /[^0-9]/;

                                            if (keyCode !== 8 && keyCode !== 0 && invalidCharacters.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        onChange={({ target }) => {
                                            let value = target.value;

                                            // Loại bỏ số 0 ban đầu nếu có
                                            if (value.length > 0 && value[0] === '0') {
                                                value = value.slice(1);
                                            }

                                            // Kiểm tra và không cho phép giá trị âm
                                            if (value < 0) {
                                                value = '';
                                            }
                                            handleEmployInput(target.name, value);
                                        }}
                                        value={formInputEmp.numberApply}
                                        placeholder="Nhập số lượng tuyển dụng"
                                    />
                                </div>

                                <div className="create-post-choose-role">
                                    <div className="create-post-title">Loại hình công việc<img id='require-icon' src={require_icon} alt="" /></div>
                                    <div className="create-post-role">
                                        <div className="create-post-role-radio"><input type="radio"
                                            name="typeJob"
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, parseInt(target.value));
                                            }}
                                            value={0} checked={formInputEmp.typeJob === 0}
                                        /> Trong ngày</div>
                                        <div className="create-post-role-radio"><input type="radio"
                                            name="typeJob"
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, parseInt(target.value));
                                            }}
                                            value={1} checked={formInputEmp.typeJob === 1}
                                        />Ngắn hạn(Trong 1 tuần-1 tháng)</div>
                                        <div className="create-post-role-radio"><input type="radio"
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, parseInt(target.value));
                                            }}
                                            name="typeJob"
                                            checked={formInputEmp.typeJob === 2}
                                            value={2}
                                        />Dài hạn(Trên 1 tháng)</div>
                                    </div>
                                </div>
                                {formInputEmp.typeJob === 0 ? (
                                    <div className="create-post-choose-role">
                                        <div className="create-post-title">Ngày làm <img id='require-icon' src={require_icon} alt="" /></div>
                                        <Form.Control
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, target.value);
                                            }}
                                            placeholder="dd/MM/YYYY"
                                            id="datemain"
                                            type="date"
                                            name="daywork"
                                            min={currentDate}
                                            value={formInputEmp.daywork}
                                            required
                                        />
                                        <div className="create-post-choose-role">
                                            <div className="create-post-title">Hạn đăng tuyển<img id='require-icon' src={require_icon} alt="" /></div>
                                            <Form.Control
                                                onChange={({ target }) => {
                                                    handleEmployInput(target.name, target.value);
                                                }}
                                                placeholder="dd/MM/YYYY"
                                                id="datemain"
                                                type="date"
                                                name="deadline"
                                                min={currentDate}
                                                max={formInputEmp.daywork}
                                                value={formInputEmp.deadline}
                                                required
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="create-post-title">Ngày làm việc trong tuần<img id='require-icon' src={require_icon} alt="" /></div>
                                        <div className="create-post-role">
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(day => {
                                                // const currentDay = new Date(`2023-12-${day}`);
                                                let isInitialDay1 = false;
                                                if (dayNumbers.length > 0) {
                                                    isInitialDay1 = dayNumbers.includes(parseInt(day - 1));
                                                    if (dayNumbers.length >= 7) {
                                                        isInitialDay1 = true;
                                                    }
                                                }

                                                return (
                                                    <div key={day} className="create-post-role-radio">
                                                        {/* <p>{isInitialDay1 ? (<div>true{dayNumbers[0]}</div>) : (<div>false{dayNumbers[0]}</div>)}</p> */}
                                                        <input
                                                            type="checkbox"
                                                            name="daywork"
                                                            value={day}
                                                            onChange={({ target }) => {
                                                                handleEmployInputx(target.name, target.value);
                                                            }}
                                                            checked={selectedDays.includes(day.toString())}
                                                            disabled={!isInitialDay1}
                                                        />
                                                        {day === 1 ? 'Tất cả' : day === 8 ? 'Chủ nhật' : `Thứ ${day}`}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="create-post-title">Ngày bắt đầu làm<img id='require-icon' src={require_icon} alt="" /></div>
                                        <Form.Control
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, target.value);
                                            }}
                                            placeholder="dd/MM/YYYY"
                                            id="datemain"
                                            type="date"
                                            name="startdate"
                                            min={currentDate}
                                            value={formInputEmp.startdate}
                                            required
                                        />
                                        {formInputEmp.typeJob === 2 ? (
                                            <div>
                                                <div className="create-post-title">Ngày kết thúc làm<img id='require-icon' src={require_icon} alt="" /></div>
                                                <Form.Control
                                                    onChange={({ target }) => {
                                                        handleEmployInput(target.name, target.value);
                                                    }}
                                                    placeholder="dd/MM/YYYY"
                                                    id="datemain"
                                                    type="date"
                                                    name="enddate"
                                                    min={selectedDate}
                                                    value={formInputEmp.enddate}
                                                    required
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="create-post-title">Ngày kết thúc làm<img id='require-icon' src={require_icon} alt="" /></div>
                                                <Form.Control
                                                    onChange={({ target }) => {
                                                        handleEmployInput(target.name, target.value);
                                                    }}
                                                    placeholder="dd/MM/YYYY"
                                                    id="datemain"
                                                    type="date"
                                                    name="enddate"
                                                    min={selectedDate1}
                                                    max={selectedDate}
                                                    value={formInputEmp.enddate}
                                                    required
                                                />
                                            </div>
                                        )}
                                        <div className="create-post-choose-role">
                                            <div className="create-post-title">Hạn đăng tuyển<img id='require-icon' src={require_icon} alt="" /></div>
                                            <Form.Control
                                                onChange={({ target }) => {
                                                    handleEmployInput(target.name, target.value);
                                                }}
                                                placeholder="dd/MM/YYYY"
                                                id="datemain"
                                                type="date"
                                                name="deadline"
                                                min={currentDate}
                                                max={formInputEmp.startdate}
                                                value={formInputEmp.deadline}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="create-post-choose-role">
                                    <div className="create-post-title">Nhập thời gian làm việc trong ngày: 06h-09h<img id='require-icon' src={require_icon} alt="" /></div>
                                    <div className="create-post-role">
                                        <Form.Control
                                            id="create-post-title"
                                            type="text"
                                            placeholder="07h-10h và 14h-17"
                                            name="jobTime"
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, target.value);
                                            }}
                                            value={formInputEmp.jobTime}
                                        />
                                        {fieldErrors.jobTime && <p style={{ color: 'red' }}>{fieldErrors.jobTime}*</p>}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div>
                            <div className="create-post-title">Địa chỉ cụ thể<img id='require-icon' src={require_icon} alt="" /></div>
                            <Form.Control
                                id="create-post-des"
                                type="text"
                                name="location"
                                onChange={({ target }) => {
                                    handleEmployInput(target.name, target.value);
                                }}
                                value={formInputEmp.location}
                                placeholder="Số 10 Phạm Hùng"
                            />
                            {fieldErrors.location && <p style={{ color: 'red' }}>{fieldErrors.location}*</p>}
                        </div>
                    </div>



                    <div className="create-post-time">
                        <div className="create-post-choose-role">
                            <div className="create-post-title">Ghi chú <img id='require-icon' src={require_icon} alt="" /></div>
                            <Form.Control
                                id="create-post-title"
                                type="text"
                                name="note"
                                onChange={({ target }) => {
                                    handleEmployInput(target.name, target.value);
                                }}
                                value={formInputEmp.note}
                                placeholder="Ghi chú"
                            />

                            <div className="create-post-title">Mô tả công việc <img id='require-icon' src={require_icon} alt="" /></div>
                            <Form.Control
                                id="create-post-des"
                                type="text"
                                onChange={({ target }) => {
                                    handleEmployInput(target.name, target.value);
                                }}
                                value={formInputEmp.description}
                                name="description"
                                placeholder="Mô tả công việc"
                            />
                            {fieldErrors.description && <p style={{ color: 'red' }}>{fieldErrors.description}*</p>}
                        </div>
                    </div>

                    <div className="create-post-gender">
                        <div className="create-post-info-job">
                            <div className="create-post-info-job-left">
                                <div className="create-post-choose-role">
                                    <div className="create-post-title">Giới tính <img id='require-icon' src={require_icon} alt="" /><span></span></div>
                                    <div className="create-post-role">
                                        <div className="create-post-role-radio"><input type="radio"
                                            name="gender"
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, target.value);
                                            }}
                                            checked={formInputEmp.gender === "Nam"}
                                            value="Nam"
                                        />Nam</div>
                                        <div className="create-post-role-radio"><input type="radio"
                                            name="gender"
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, target.value);
                                            }}
                                            checked={formInputEmp.gender === "Nữ"}
                                            value="Nữ"
                                        />Nữ</div>
                                        <div className="create-post-role-radio"><input type="radio"
                                            name="gender"
                                            onChange={({ target }) => {
                                                handleEmployInput(target.name, target.value);
                                            }}
                                            checked={formInputEmp.gender === "Bất kỳ"}
                                            value="Bất kỳ"
                                        />Không yêu cầu</div>
                                    </div>
                                </div>

                                <div className="create-post-title">Trình độ học vấn <span>(Để trống nếu không yêu cầu)</span></div>
                                <Form.Select aria-label="Default select example"
                                    id="create-post-select"
                                    name="levellearn"
                                    onChange={({ target }) => {
                                        handleEmployInput(target.name, target.value);
                                    }}>
                                    <option value="không yêu cầu" style={{ display: "none" }}>Chọn trình để học vấn</option>
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
                                    <div className="create-post-title">Độ tuổi <img id='require-icon' src={require_icon} alt="" /></div>
                                    <div className="create-post-role">
                                        <div className="create-post-role-radio">
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text htmlFor="toage" id="basic-addon1">Từ</InputGroup.Text>
                                                <Form.Control
                                                    id="toage"
                                                    type="number"
                                                    name="toage"
                                                    onKeyPress={(event) => {
                                                        const keyCode = event.which || event.keyCode;
                                                        const invalidCharacters = /[^0-9]/;

                                                        if (keyCode !== 8 && keyCode !== 0 && invalidCharacters.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    onChange={({ target }) => {
                                                        let value = target.value;

                                                        // Loại bỏ số 0 ban đầu nếu có
                                                        if (value.length > 0 && value[0] === '0') {
                                                            value = value.slice(1);
                                                        }

                                                        // Kiểm tra và không cho phép giá trị âm
                                                        if (value < 0) {
                                                            value = '';
                                                        }
                                                        handleEmployInput(target.name, value);
                                                    }}
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
                                                    onKeyPress={(event) => {
                                                        const keyCode = event.which || event.keyCode;
                                                        const invalidCharacters = /[^0-9]/;

                                                        if (keyCode !== 8 && keyCode !== 0 && invalidCharacters.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    onChange={({ target }) => {
                                                        let value = target.value;

                                                        // Loại bỏ số 0 ban đầu nếu có
                                                        if (value.length > 0 && value[0] === '0') {
                                                            value = value.slice(1);
                                                        }

                                                        // Kiểm tra và không cho phép giá trị âm
                                                        if (value < 0) {
                                                            value = '';
                                                        }
                                                        handleEmployInput(target.name, value);

                                                    }}
                                                    value={formInputEmp.fromage}
                                                />
                                            </InputGroup>
                                        </div>

                                    </div>
                                    {fieldErrors.fromage && <p style={{ color: 'red' }}>{fieldErrors.fromage}</p>}
                                    {fieldErrors.toage && <p style={{ color: 'red' }}>{fieldErrors.toage}</p>}
                                </div>
                                <div className="create-post-choose-role">
                                    <div className="create-post-title">Kinh nghiệm <span>(Để trống nếu không yêu cầu)</span></div>
                                    <div className="create-post-experient">
                                        <div className="create-post-experient-right">
                                            <Form.Select aria-label="Default select example"
                                                id="create-post-select"
                                                name="experient"
                                                onChange={({ target }) => {
                                                    handleEmployInput(target.name, target.value);
                                                }}
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

                        <div className="create-post-title">Phúc lợi <img id='require-icon' src={require_icon} alt="" /></div>
                        <Form.Control
                            id="create-post-title"
                            type="text"
                            name="welfare"
                            onChange={({ target }) => {
                                handleEmployInput(target.name, target.value);
                            }}
                            value={formInputEmp.welfare}
                            placeholder="Ghi chú"
                        />
                        {fieldErrors.welfare && <p style={{ color: 'red' }}>{fieldErrors.welfare}*</p>}
                        <div className="create-post-title">Yêu cầu thêm</div>
                        <Form.Control
                            id="create-post-des"
                            type="text"
                            name="moredesciption" onChange={({ target }) => {
                                handleEmployInput(target.name, target.value);
                            }}
                            value={formInputEmp.moredesciption}
                            placeholder="Mô tả công việc"
                        />
                        {fieldErrors.moredesciption && <p style={{ color: 'red' }}>{fieldErrors.moredesciption}*</p>}

                    </div>

                    <div>
                        <Button id="create-post-btn" onClick={handleSubmit} variant="info">Đăng bài</Button>
                        <Button id="create-post-btn" onClick={handleSubmitinnhap} variant="info">Lưu nháp</Button>
                        <ToastContainer />
                    </div>
                </div>
            </div>

        </>

    )
}

export default CreatePost;